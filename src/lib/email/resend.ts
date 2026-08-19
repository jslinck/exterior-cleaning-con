import "server-only";

const RESEND_API_URL = "https://api.resend.com/emails";

// Raw fetch against Resend's REST API rather than their SDK — the surface
// we need (send one transactional email) is a single POST request, not
// worth a dependency for.
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error("[email] RESEND_API_KEY or RESEND_FROM_EMAIL not configured — email not sent.");
    return { ok: false, error: "Email is not configured." };
  }

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[email] Resend API error:", res.status, body);
    return { ok: false, error: "Failed to send email." };
  }

  return { ok: true };
}

export function passwordLinkEmailHtml({
  heading,
  body,
  url,
  ctaLabel,
}: {
  heading: string;
  body: string;
  url: string;
  ctaLabel: string;
}) {
  return `
<div style="font-family: -apple-system, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #0d0d0d;">
  <p style="font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #ff6a0c; font-weight: bold; margin: 0 0 16px;">EXTERIOR CON</p>
  <h1 style="font-size: 22px; color: #f7f4ed; margin: 0 0 16px;">${heading}</h1>
  <p style="font-size: 14px; color: #a8a29a; line-height: 1.6; margin: 0 0 24px;">${body}</p>
  <a href="${url}" style="display: inline-block; padding: 14px 28px; background: #ff6a0c; color: #0d0d0d; text-decoration: none; border-radius: 999px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">${ctaLabel}</a>
  <p style="font-size: 12px; color: #6b6660; margin-top: 32px;">This link expires in 2 days. If you didn't request this, you can safely ignore this email.</p>
</div>
`.trim();
}
