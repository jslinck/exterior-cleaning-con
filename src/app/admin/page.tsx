import { Container } from "@/components/ui/Container";
import { StatTile } from "@/components/dashboard/StatTile";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { getAdminOverview } from "@/lib/admin/stats";

function formatCurrency(value: number) {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default async function AdminOverviewPage() {
  const data = await getAdminOverview();

  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl text-bone sm:text-5xl">Overview</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatTile
          label="Founding-List Registrations"
          value={String(data.totalLeads)}
          sublabel={`${data.creatorLeads} creator-attributed · ${data.directLeads} direct`}
        />
        <StatTile
          label="Tickets Sold"
          value={String(data.totalTicketsSold)}
          sublabel={`${data.byType.ga ?? 0} GA · ${data.byType.vip ?? 0} VIP · ${data.byType.elite ?? 0} Elite`}
        />
        <StatTile
          label="Total Revenue"
          value={formatCurrency(data.totalRevenue)}
          sublabel={`${formatCurrency(data.creatorRevenue)} creator-attributed · ${formatCurrency(data.directRevenue)} direct`}
        />
        <StatTile label="Estimated Commissions" value={formatCurrency(data.totalEstimated)} />
        <StatTile label="Earned Commissions" value={formatCurrency(data.totalEarned)} />
        <StatTile label="Paid Commissions" value={formatCurrency(data.totalPaid)} />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Leaderboard title="Top Creators — Registrations" entries={data.leaderboardByRegistrations} />
        <Leaderboard title="Top Creators — Tickets Sold" entries={data.leaderboardByTickets} />
        <Leaderboard title="Top Creators — Revenue" entries={data.leaderboardByRevenue} />
      </div>
    </Container>
  );
}
