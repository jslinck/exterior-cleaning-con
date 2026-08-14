import "server-only";
import { db } from "@/lib/db";
import { findMatchingTier } from "@/lib/commission/tiers";
import { event } from "@/data/event";

const LOCKED_STATUSES = ["APPROVED", "PAID", "FORFEITED"] as const;

function rewardRank(tier: "NONE" | "GA" | "VIP") {
  return tier === "VIP" ? 2 : tier === "GA" ? 1 : 0;
}

// The single source of truth for a creator's numbers. Call this after any
// mutation that could change them: a webhook that touches one of the
// creator's tickets, a refund/void, a CommissionTier edit, or a
// participationConfirmed toggle. Always a pure recalculation from current
// DB state — never an increment — so replaying the same data any number
// of times converges to the same result (this is what makes repeated
// webhook delivery safe).
export async function recomputeCreatorStats(creatorId: string) {
  const creator = await db.creator.findUnique({ where: { id: creatorId } });
  if (!creator) return;

  const issuedTickets = await db.ticket.findMany({
    where: { status: "ISSUED", order: { creatorId } },
    select: { price: true },
  });

  const ticketsCounted = issuedTickets.length;
  const attributableRevenue = issuedTickets.reduce((sum, t) => sum + Number(t.price), 0);

  const tier = await findMatchingTier(ticketsCounted);
  const tierPercentage = tier ? Number(tier.percentage) : 0;
  const commissionAmount = attributableRevenue * (tierPercentage / 100);

  // Reward tier — a single upserted row is what makes VIP replace GA
  // rather than stacking two reward records. Only ever moves forward
  // automatically; an admin can still manually adjust the claim status.
  const unlockedTier = ticketsCounted >= 15 ? "VIP" : ticketsCounted >= 5 ? "GA" : "NONE";
  const existingReward = await db.creatorReward.findUnique({ where: { creatorId } });
  if (!existingReward) {
    await db.creatorReward.create({ data: { creatorId, unlockedTier } });
  } else if (rewardRank(unlockedTier) > rewardRank(existingReward.unlockedTier)) {
    await db.creatorReward.update({ where: { creatorId }, data: { unlockedTier } });
  }

  const eventHasEnded = Date.now() > new Date(event.endISO).getTime();
  const shouldBeEarned = creator.participationConfirmed && eventHasEnded;

  const existingRecord = await db.commissionRecord.findUnique({ where: { creatorId } });

  if (!existingRecord) {
    await db.commissionRecord.create({
      data: {
        creatorId,
        ticketsCounted,
        attributableRevenue,
        tierPercentage,
        matchedTierId: tier?.id ?? null,
        commissionAmount,
        status: shouldBeEarned ? "EARNED" : "PENDING",
      },
    });
    return;
  }

  const isLocked = (LOCKED_STATUSES as readonly string[]).includes(existingRecord.status);

  if (isLocked) {
    // Money already promised, paid, or deliberately forfeited — never
    // silently overwritten by a later recompute. Detect and flag drift
    // instead, so an admin decides what to do.
    const amountsDiffer =
      Number(existingRecord.commissionAmount) !== commissionAmount ||
      existingRecord.ticketsCounted !== ticketsCounted;

    if (amountsDiffer) {
      await db.auditLog.create({
        data: {
          type: "COMMISSION_AMOUNT_DRIFT_DETECTED",
          creatorId,
          previousValue: {
            ticketsCounted: existingRecord.ticketsCounted,
            attributableRevenue: existingRecord.attributableRevenue.toString(),
            commissionAmount: existingRecord.commissionAmount.toString(),
            status: existingRecord.status,
          },
          newValue: {
            ticketsCounted,
            attributableRevenue: attributableRevenue.toFixed(2),
            commissionAmount: commissionAmount.toFixed(2),
          },
          reason:
            "Recalculation differs from an already-approved/paid/forfeited commission record — likely a refund or order change since that decision. Review manually.",
        },
      });
    }

    await db.commissionRecord.update({
      where: { creatorId },
      data: { lastRecalculatedAt: new Date() },
    });
    return;
  }

  // status is PENDING or EARNED — freely recompute.
  await db.commissionRecord.update({
    where: { creatorId },
    data: {
      ticketsCounted,
      attributableRevenue,
      tierPercentage,
      matchedTierId: tier?.id ?? null,
      commissionAmount,
      status: shouldBeEarned ? "EARNED" : "PENDING",
      lastRecalculatedAt: new Date(),
    },
  });
}
