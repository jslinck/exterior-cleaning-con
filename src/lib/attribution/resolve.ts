import "server-only";
import { db } from "@/lib/db";
import { getVisitorId } from "@/lib/attribution/visitor";

export type ResolvedAttribution = {
  creatorId: string;
  referralCode: string;
} | null;

// The authoritative attribution lookup — reads the durable, first-touch
// VisitorAttribution row for the current visitor. Used by the
// founding-list route and by the outbound Ticket Tailor checkout link
// builder. Never trust a client-posted creatorId instead of this.
export async function resolveVisitorAttribution(): Promise<ResolvedAttribution> {
  const visitorId = await getVisitorId();
  if (!visitorId) return null;

  const attribution = await db.visitorAttribution.findUnique({ where: { visitorId } });

  if (!attribution || !attribution.creatorId) return null;
  if (attribution.expiresAt.getTime() < Date.now()) return null;

  return { creatorId: attribution.creatorId, referralCode: attribution.referralCode };
}
