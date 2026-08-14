import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import {
  ATTRIBUTION_WINDOW_DAYS,
  REF_COOKIE,
  VISITOR_COOKIE,
} from "@/lib/attribution/constants";

export async function POST(request: NextRequest) {
  let body: { referralCode?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const referralCodeRaw = body.referralCode?.trim();
  if (!referralCodeRaw) {
    return NextResponse.json({ error: "referralCode is required." }, { status: 400 });
  }
  const referralCode = referralCodeRaw.toUpperCase();

  const cookieStore = await cookies();
  const visitorId = cookieStore.get(VISITOR_COOKIE)?.value;
  if (!visitorId) {
    return NextResponse.json({ error: "Missing visitor id." }, { status: 400 });
  }

  // First-touch is permanent: if this visitor already has an attribution
  // row, this call is a no-op regardless of what code was just captured.
  const existing = await db.visitorAttribution.findUnique({ where: { visitorId } });
  if (existing) {
    return NextResponse.json({ ok: true, referralCode: existing.referralCode, firstTouch: false });
  }

  const creator = await db.creator.findFirst({
    where: { referralCode, status: "ACTIVE" },
  });

  const expiresAt = new Date(Date.now() + ATTRIBUTION_WINDOW_DAYS * 24 * 60 * 60 * 1000);

  try {
    await db.visitorAttribution.create({
      data: {
        visitorId,
        creatorId: creator?.id ?? null,
        referralCode,
        expiresAt,
      },
    });
  } catch {
    // Unique-constraint race from two near-simultaneous first-touch
    // requests — a row now exists either way, safe to proceed.
  }

  const response = NextResponse.json({ ok: true, referralCode, firstTouch: true });
  response.cookies.set(REF_COOKIE, referralCode, {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ATTRIBUTION_WINDOW_DAYS * 24 * 60 * 60,
    path: "/",
  });
  return response;
}
