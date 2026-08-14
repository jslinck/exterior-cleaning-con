import "server-only";
import { db } from "@/lib/db";

export async function findMatchingTier(ticketsCounted: number) {
  const tiers = await db.commissionTier.findMany({ orderBy: { minTickets: "asc" } });
  return (
    tiers.find(
      (tier) =>
        ticketsCounted >= tier.minTickets &&
        (tier.maxTickets === null || ticketsCounted <= tier.maxTickets),
    ) ?? null
  );
}

// Validates that a set of tiers forms a contiguous, non-overlapping ladder
// starting at 1 ticket with an open-ended final tier. Used by the admin
// tier editor before saving changes.
export function validateTierLadder(
  tiers: { minTickets: number; maxTickets: number | null }[],
): string | null {
  const sorted = [...tiers].sort((a, b) => a.minTickets - b.minTickets);
  if (sorted.length === 0) return "At least one tier is required.";
  if (sorted[0].minTickets !== 1) return "The first tier must start at 1 ticket.";

  for (let i = 0; i < sorted.length; i++) {
    const tier = sorted[i];
    const next = sorted[i + 1];

    if (tier.maxTickets !== null && tier.maxTickets < tier.minTickets) {
      return `Tier starting at ${tier.minTickets} has an invalid range.`;
    }

    if (next) {
      if (tier.maxTickets === null) {
        return `Tier starting at ${tier.minTickets} must have an upper bound before the next tier.`;
      }
      if (next.minTickets !== tier.maxTickets + 1) {
        return `Gap or overlap between the tier ending at ${tier.maxTickets} and the tier starting at ${next.minTickets}.`;
      }
    } else if (tier.maxTickets !== null) {
      return "The last tier must be open-ended (no upper bound).";
    }
  }

  return null;
}
