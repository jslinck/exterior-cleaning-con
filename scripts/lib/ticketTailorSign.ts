import { createHmac } from "crypto";

// Mirrors src/lib/webhooks/verifySignature.ts exactly — this is what lets
// these scripts stand in for a real Ticket Tailor webhook delivery during
// local testing.
export function signPayload(rawBody: string, secret: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");
  return `t=${timestamp},s=${signature}`;
}

export async function sendWebhook(envelope: unknown) {
  const secret = process.env.TICKET_TAILOR_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("TICKET_TAILOR_WEBHOOK_SECRET is not set in the environment.");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100";
  const url = `${siteUrl.replace(/\/$/, "")}/api/webhooks/ticket-tailor`;

  const rawBody = JSON.stringify(envelope);
  const signatureHeader = signPayload(rawBody, secret);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "tickettailor-webhook-signature": signatureHeader,
    },
    body: rawBody,
  });

  const text = await response.text();
  console.log(`[${response.status}] ${url}`);
  console.log(text);

  return response;
}
