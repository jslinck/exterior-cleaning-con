import "server-only";
import { db } from "@/lib/db";

// Always takes a creatorId resolved server-side from the caller's own
// verified session (see requireCreator() in src/lib/auth/dal.ts) — never
// a caller-supplied id. This is what makes "a creator can never see
// another creator's data" an actual guarantee, not just hidden UI: there
// is no code path anywhere that lets a creatorId be forged.
export async function getCreatorDashboardData(creatorId: string) {
  const creator = await db.creator.findUniqueOrThrow({ where: { id: creatorId } });

  const [registrationCount, ticketGroups, ticketTypeConfigs, commissionRecord, reward] =
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
  };
}
