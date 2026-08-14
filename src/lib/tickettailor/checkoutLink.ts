import "server-only";
import { resolveVisitorAttribution } from "@/lib/attribution/resolve";

// Ticket Tailor has no server-to-server way for us to learn which referral
// code a buyer arrived with — checkout happens on their domain. Their
// documented metadata-prefill mechanism (`preset_data` + `p[meta_*]` hash
// params) lets us stamp the resolved referral code onto the outbound link;
// their webhook echoes it back on the order, which is what
// `handleOrderEvent` reads as the first-priority attribution match.
const REF_METADATA_KEY = "meta_ref_code";

// Resolves the current visitor's attribution server-side and returns the
// Ticket Tailor checkout URL to send them to, with the referral code
// stamped on as prefill metadata when one is known. Never trust a
// client-supplied referral code for this — always re-resolve from the
// authoritative VisitorAttribution row.
export async function getCheckoutUrl(): Promise<string | null> {
  const baseUrl = process.env.TICKET_TAILOR_CHECKOUT_BASE_URL;
  if (!baseUrl) return null;

  const attribution = await resolveVisitorAttribution();
  if (!attribution) return baseUrl;

  const separator = baseUrl.includes("#") ? "&" : "#";
  return `${baseUrl}${separator}p[${REF_METADATA_KEY}]=${encodeURIComponent(attribution.referralCode)}&preset_data=1`;
}
