import { createHmac, timingSafeEqual } from "crypto";

// Per Ticket Tailor's documented webhook security scheme
// (developers.tickettailor.com/docs/webhook/security):
//
//   Header: "Tickettailor-Webhook-Signature"
//   Format: "t=<unix timestamp>,s=<hex hmac signature>"
//   Signed payload: `${timestamp}.${rawBody}`
//   Algorithm: HMAC-SHA256 keyed with the webhook's shared secret
//   Compare: constant-time
//   Reject: timestamps older than 5 minutes (replay protection)

const SIGNATURE_HEADER = "tickettailor-webhook-signature";
const MAX_TIMESTAMP_AGE_SECONDS = 5 * 60;

export type SignatureVerification =
  | { valid: true }
  | { valid: false; reason: string };

export function verifyTicketTailorSignature(
  rawBody: string,
  headerValue: string | null,
  secret: string,
): SignatureVerification {
  if (!headerValue) {
    return { valid: false, reason: `Missing ${SIGNATURE_HEADER} header.` };
  }

  const parts = Object.fromEntries(
    headerValue.split(",").map((part) => {
      const [key, value] = part.split("=");
      return [key?.trim(), value?.trim()];
    }),
  );

  const timestamp = parts["t"];
  const signature = parts["s"];

  if (!timestamp || !signature) {
    return { valid: false, reason: "Malformed signature header." };
  }

  const timestampSeconds = Number(timestamp);
  if (!Number.isFinite(timestampSeconds)) {
    return { valid: false, reason: "Invalid timestamp in signature header." };
  }

  const ageSeconds = Math.abs(Date.now() / 1000 - timestampSeconds);
  if (ageSeconds > MAX_TIMESTAMP_AGE_SECONDS) {
    return { valid: false, reason: "Signature timestamp is too old (possible replay)." };
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  const actualBuffer = Buffer.from(signature, "hex");

  if (expectedBuffer.length !== actualBuffer.length || !timingSafeEqual(expectedBuffer, actualBuffer)) {
    return { valid: false, reason: "Signature mismatch." };
  }

  return { valid: true };
}

export { SIGNATURE_HEADER };
