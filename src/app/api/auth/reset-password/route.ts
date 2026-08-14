import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyResetToken, consumeResetToken } from "@/lib/auth/resetToken";
import { hashPassword } from "@/lib/auth/password";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const token = String(body.token || "");
  const password = String(body.password || "");

  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const user = await verifyResetToken(token);
  if (!user) {
    return NextResponse.json(
      { error: "This link is invalid or has expired. Request a new one." },
      { status: 400 },
    );
  }

  const passwordHash = await hashPassword(password);
  await db.user.update({ where: { id: user.id }, data: { passwordHash } });
  await consumeResetToken(user.id);

  return NextResponse.json({ ok: true });
}
