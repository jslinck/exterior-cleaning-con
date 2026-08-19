import { requireCreator } from "@/lib/auth/dal";
import { getCreatorDashboardData, getCreatorLeaderboard } from "@/lib/creator/stats";
import { getFoundingListGoalProgress } from "@/lib/foundingListGoal";
import { Container } from "@/components/ui/Container";
import { StatTile } from "@/components/dashboard/StatTile";
import { MilestoneProgress } from "@/components/dashboard/MilestoneProgress";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { CopyReferralLink } from "@/components/dashboard/CopyReferralLink";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Badge } from "@/components/dashboard/Badge";

function formatCurrency(value: number) {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function CreatorDashboardPage() {
  const user = await requireCreator();
  const creatorId = user.creator!.id;
  const [data, leaderboard, goalProgress] = await Promise.all([
    getCreatorDashboardData(creatorId),
    getCreatorLeaderboard(),
    getFoundingListGoalProgress(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exteriorcon.com";
  const referralLink = `${siteUrl}/?ref=${data.creator.referralCode}`;

  // GA/VIP reflect the actual unlocked reward tier — which can come from
  // real ticket sales OR an admin's manual grant — not raw ticket count.
  // Otherwise a manually-granted reward never shows as earned here even
  // though it genuinely is. Commission-tier milestones are unaffected —
  // those are never manually granted, so ticket count is still correct.
  const rewardRank = data.rewardTier === "VIP" ? 2 : data.rewardTier === "GA" ? 1 : 0;

  const milestones = [
    { threshold: 5, label: "5 tickets — GA reward unlocked", achieved: rewardRank >= 1 },
    { threshold: 15, label: "15 tickets — VIP reward unlocked", achieved: rewardRank >= 2 },
    ...data.commissionTierMilestones.map((t) => ({
      threshold: t.minTickets,
      label: `${t.minTickets}+ tickets — ${t.percentage}% commission tier`,
      achieved: data.ticketsSold >= t.minTickets,
    })),
  ].sort((a, b) => a.threshold - b.threshold);

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

        <div className="mb-8 rounded-2xl border border-bone/10 bg-charcoal/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
            Founding List Goal
          </p>
          <p className="mt-2 font-display text-2xl text-bone sm:text-3xl">
            {goalProgress.registered.toLocaleString()} / {goalProgress.goal.toLocaleString()}{" "}
            founding members
          </p>
          <div
            className="mt-4 h-3 w-full overflow-hidden rounded-full bg-ink"
            role="progressbar"
            aria-valuenow={goalProgress.registered}
            aria-valuemin={0}
            aria-valuemax={goalProgress.goal}
            aria-label={`${goalProgress.registered} of ${goalProgress.goal} founding list signups`}
          >
            <div
              className="h-full rounded-full bg-ember transition-[width]"
              style={{ width: `${goalProgress.percent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-bone/40">
            {goalProgress.goal - goalProgress.registered > 0
              ? `${(goalProgress.goal - goalProgress.registered).toLocaleString()} spots to go — across every creator`
              : "Goal reached — across every creator"}
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

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <MilestoneProgress items={milestones} />
          <Leaderboard title="Ticket Leaderboard" entries={leaderboard} />
        </div>
      </Container>
    </>
  );
}
