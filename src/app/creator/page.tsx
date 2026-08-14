import { requireCreator } from "@/lib/auth/dal";
import { getCreatorDashboardData } from "@/lib/creator/stats";
import { Container } from "@/components/ui/Container";
import { StatTile } from "@/components/dashboard/StatTile";
import { MilestoneProgress } from "@/components/dashboard/MilestoneProgress";
import { CopyReferralLink } from "@/components/dashboard/CopyReferralLink";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Badge } from "@/components/dashboard/Badge";

function formatCurrency(value: number) {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function CreatorDashboardPage() {
  const user = await requireCreator();
  const creatorId = user.creator!.id;
  const data = await getCreatorDashboardData(creatorId);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exteriorcon.com";
  const referralLink = `${siteUrl}/?ref=${data.creator.referralCode}`;

  const milestones = [
    { label: "5 tickets — GA reward unlocked", achieved: data.ticketsSold >= 5 },
    { label: "15 tickets — VIP reward unlocked", achieved: data.ticketsSold >= 15 },
    { label: "21 tickets — 25% commission tier", achieved: data.ticketsSold >= 21 },
  ];

  return (
    <>
      <DashboardHeader title="Founding Creator" />
      <Container className="py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">
              EXTERIOR CON
            </p>
            <h1 className="mt-2 font-display text-4xl text-bone sm:text-5xl">Founding Creator</h1>
            <p className="mt-1 text-bone/60">Welcome back, {data.creator.name}.</p>
          </div>
          <Badge tone={data.creator.status === "ACTIVE" ? "success" : "danger"}>
            {data.creator.status}
          </Badge>
        </div>

        <div className="mb-8 rounded-2xl border border-bone/10 bg-charcoal/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
            Your Referral Link
          </p>
          <div className="mt-3">
            <CopyReferralLink link={referralLink} />
          </div>
          <p className="mt-2 text-xs text-bone/40">
            Referral code: <span className="text-bone/70">{data.creator.referralCode}</span>
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            label="Founding List"
            value={String(data.registrationCount)}
            sublabel="registrations"
          />
          <StatTile label="Tickets" value={String(data.ticketsSold)} sublabel="sold" />
          <StatTile label="Revenue" value={formatCurrency(data.revenue)} />
          <StatTile label="Commission Tier" value={`${data.commissionTierPercentage}%`} />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <StatTile
            label="Estimated Commission"
            value={formatCurrency(data.estimatedCommission)}
            sublabel={`Status: ${data.commissionStatus}${
              data.paidAmount > 0 ? ` · Paid: ${formatCurrency(data.paidAmount)}` : ""
            }`}
          />
          <StatTile
            label="Ticket Breakdown"
            value={`${data.ticketsByType.ga ?? 0} GA · ${data.ticketsByType.vip ?? 0} VIP · ${
              data.ticketsByType.elite ?? 0
            } Elite`}
          />
        </div>

        <div className="mt-4">
          <MilestoneProgress items={milestones} />
        </div>
      </Container>
    </>
  );
}
