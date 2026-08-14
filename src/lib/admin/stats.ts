import "server-only";
import { db } from "@/lib/db";

export async function getAdminOverview() {
  const [totalLeads, creatorLeads, directLeads] = await Promise.all([
    db.lead.count(),
    db.lead.count({ where: { source: "CREATOR" } }),
    db.lead.count({ where: { source: "DIRECT" } }),
  ]);

  const [issuedTickets, ticketTypeConfigs, commissionRecords, creators] = await Promise.all([
    db.ticket.findMany({
      where: { status: "ISSUED" },
      select: { price: true, ticketTypeConfigId: true, order: { select: { creatorId: true } } },
    }),
    db.ticketTypeConfig.findMany(),
    db.commissionRecord.findMany(),
    db.creator.findMany({ include: { leads: true, commissionRecord: true } }),
  ]);

  const totalTicketsSold = issuedTickets.length;
  const byType: Record<string, number> = {};
  for (const t of issuedTickets) {
    const config = ticketTypeConfigs.find((c) => c.id === t.ticketTypeConfigId);
    if (config) byType[config.key] = (byType[config.key] ?? 0) + 1;
  }

  const totalRevenue = issuedTickets.reduce((sum, t) => sum + Number(t.price), 0);
  const creatorRevenue = issuedTickets
    .filter((t) => t.order.creatorId)
    .reduce((sum, t) => sum + Number(t.price), 0);
  const directRevenue = totalRevenue - creatorRevenue;

  const totalEstimated = commissionRecords.reduce((sum, c) => sum + Number(c.commissionAmount), 0);
  const totalEarned = commissionRecords
    .filter((c) => c.status === "EARNED" || c.status === "APPROVED" || c.status === "PAID")
    .reduce((sum, c) => sum + Number(c.commissionAmount), 0);
  const totalPaid = commissionRecords.reduce((sum, c) => sum + Number(c.paidAmount), 0);

  const ticketCountByCreator = new Map<string, number>();
  for (const t of issuedTickets) {
    if (t.order.creatorId) {
      ticketCountByCreator.set(t.order.creatorId, (ticketCountByCreator.get(t.order.creatorId) ?? 0) + 1);
    }
  }

  const leaderboardByRegistrations = [...creators]
    .sort((a, b) => b.leads.length - a.leads.length)
    .slice(0, 10)
    .map((c, i) => ({ rank: i + 1, name: c.name, value: `${c.leads.length} registrations` }));

  const leaderboardByTickets = [...creators]
    .sort((a, b) => (ticketCountByCreator.get(b.id) ?? 0) - (ticketCountByCreator.get(a.id) ?? 0))
    .slice(0, 10)
    .map((c, i) => ({ rank: i + 1, name: c.name, value: `${ticketCountByCreator.get(c.id) ?? 0} tickets` }));

  const leaderboardByRevenue = [...creators]
    .sort(
      (a, b) =>
        Number(b.commissionRecord?.attributableRevenue ?? 0) -
        Number(a.commissionRecord?.attributableRevenue ?? 0),
    )
    .slice(0, 10)
    .map((c, i) => ({
      rank: i + 1,
      name: c.name,
      value: `$${Number(c.commissionRecord?.attributableRevenue ?? 0).toLocaleString()}`,
    }));

  return {
    totalLeads,
    creatorLeads,
    directLeads,
    totalTicketsSold,
    byType,
    totalRevenue,
    creatorRevenue,
    directRevenue,
    totalEstimated,
    totalEarned,
    totalPaid,
    leaderboardByRegistrations,
    leaderboardByTickets,
    leaderboardByRevenue,
  };
}
