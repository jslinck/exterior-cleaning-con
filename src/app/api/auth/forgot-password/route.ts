import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createResetToken } from "@/lib/auth/resetToken";
import { sendEmail, passwordLinkEmailHtml } from "@/lib/email/resend";
import { normalizeEmail } from "@/lib/normalize";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = normalizeEmail(String(body.email || ""));

  // Always return the same response whether or not the email exists —
  // otherwise this endpoint becomes a way to enumerate valid accounts.
  if (email) {
    const user = await db.user.findUnique({ where: { email } });
    if (user) {
      const token = await createResetToken(user.id);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exteriorcon.com";
      const resetUrl = `${siteUrl}/reset-password?token=${token}`;

      await sendEmail({
        to: user.email,
        subject: "Reset your EXTERIOR CON dashboard password",
        html: passwordLinkEmailHtml({
          heading: "Reset your password",
          body: "Someone (hopefully you) requested a password reset for your EXTERIOR CON dashboard. Click below to set a new password.",
          url: resetUrl,
          ctaLabel: "Reset Password",
        }),
      });
    }
  }

  return NextResponse.json({ ok: true });
}
