import "server-only";
import { db } from "@/lib/db";

// Always takes a creatorId resolved server-side from the caller's own
// verified session (see requireCreator() in src/lib/auth/dal.ts) — never
// a caller-supplied id. This is what makes "a creator can never see
// another creator's data" an actual guarantee, not just hidden UI: there
// is no code path anywhere that lets a creatorId be forged.
export async function getCreatorDashboardData(creatorId: string) {
  const creator = await db.creator.findUniqueOrThrow({ where: { id: creatorId } });

  const [registrationCount, ticketGroups, ticketTypeConfigs, commissionRecord, reward, commissionTiers] =
    await Promise.all([
      db.lead.count({ where: { creatorId } }),
      db.ticket.groupBy({
        by: ["ticketTypeConfigId"],
        where: { status: "ISSUED", order: { creatorId } },
        _count: { _all: true },
      }),
      db.ticketTypeConfig.findMany(),
      db.commissionRecord.findUnique({ where: { creatorId } }),
      db.creatorReward.findUnique({ where: { creatorId } }),
      db.commissionTier.findMany({ orderBy: { minTickets: "asc" } }),
    ]);

  const ticketsByType: Record<string, number> = {};
  for (const group of ticketGroups) {
    const config = ticketTypeConfigs.find((c) => c.id === group.ticketTypeConfigId);
    if (config) ticketsByType[config.key] = group._count._all;
  }

  // Total across ALL issued tickets, not just ones mapped to a known
  // TicketTypeConfig — a ticket can be ISSUED and fully counted toward
  // revenue/commission before its Ticket Tailor ticket-type id has been
  // mapped in /admin/ticket-types (ticketsByType is best-effort for the
  // per-type breakdown only; it must never gate the headline total).
  const ticketsSold = ticketGroups.reduce((sum, group) => sum + group._count._all, 0);

  return {
    creator,
    registrationCount,
    ticketsSold,
    ticketsByType,
    revenue: commissionRecord ? Number(commissionRecord.attributableRevenue) : 0,
    commissionTierPercentage: commissionRecord ? Number(commissionRecord.tierPercentage) : 0,
    commissionStatus: commissionRecord?.status ?? "PENDING",
    estimatedCommission: commissionRecord ? Number(commissionRecord.commissionAmount) : 0,
    paidAmount: commissionRecord ? Number(commissionRecord.paidAmount) : 0,
    rewardTier: reward?.unlockedTier ?? "NONE",
    rewardStatus: reward?.status ?? "UNCLAIMED",
    // Only tiers above the baseline (minTickets > 1) are real milestones —
    // the first tier applies from ticket one, so there's nothing to
    // "unlock" about it.
    commissionTierMilestones: commissionTiers
      .filter((t) => t.minTickets > 1)
      .map((t) => ({ minTickets: t.minTickets, percentage: Number(t.percentage) })),
  };
}

// Visible to any logged-in creator — ranking by ticket count only, never
// dollar amounts, so creators can't see each other's revenue/commission.
export async function getCreatorLeaderboard() {
  const creators = await db.creator.findMany({
    where: { status: "ACTIVE" },
    include: { commissionRecord: { select: { ticketsCounted: true } } },
  });

  return creators
    .map((c) => ({ name: c.name, ticketsCounted: c.commissionRecord?.ticketsCounted ?? 0 }))
    .sort((a, b) => b.ticketsCounted - a.ticketsCounted)
    .map((c, i) => ({ rank: i + 1, name: c.name, value: `${c.ticketsCounted} tickets` }));
}
