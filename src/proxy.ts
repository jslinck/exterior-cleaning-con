import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Cheap, DB-free checks only — this is the "optimistic" layer. Every
// Server Component/Action/Route Handler that actually touches creator or
// admin data must additionally call requireAdmin()/requireCreator() from
// src/lib/auth/dal.ts, which does a live DB check. See the plan doc for
// why: a stateless JWT can't be force-revoked before it expires, so a
// disabled account needs the DB-backed check to actually take effect.

const SESSION_COOKIE = "ec_session";
const VISITOR_COOKIE = "ec_vid";
const REF_PENDING_COOKIE = "ec_ref_pending";

const YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
const REF_PENDING_TTL_SECONDS = 60 * 5;

function getSecretKey() {
  return new TextEncoder().encode(process.env.SESSION_SECRET);
}

async function getRoleFromCookie(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return (payload.role as string) ?? null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  let response: NextResponse;

  if (pathname.startsWith("/admin") || pathname.startsWith("/creator")) {
    const role = await getRoleFromCookie(request);

    if (!role) {
      response = NextResponse.redirect(new URL("/login", request.url));
    } else if (pathname.startsWith("/admin") && role !== "ADMIN") {
      response = NextResponse.redirect(new URL("/creator", request.url));
    } else if (pathname.startsWith("/creator") && role !== "CREATOR") {
      response = NextResponse.redirect(new URL("/admin", request.url));
    } else {
      response = NextResponse.next();
    }
  } else {
    response = NextResponse.next();
  }

  // Durable anonymous visitor id — the key VisitorAttribution rows are
  // looked up by. httpOnly: attribution resolution only ever happens
  // server-side.
  if (!request.cookies.get(VISITOR_COOKIE)) {
    response.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: YEAR_IN_SECONDS,
      path: "/",
    });
  }

  // Mirror ?ref= into a short-lived, client-readable cookie so the
  // AttributionCapture component can pick it up and POST it to
  // /api/attribution, which does the actual (first-touch-guarded) DB write.
  const ref = searchParams.get("ref");
  if (ref) {
    response.cookies.set(REF_PENDING_COOKIE, ref, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: REF_PENDING_TTL_SECONDS,
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon.svg|logos/).*)"],
};
