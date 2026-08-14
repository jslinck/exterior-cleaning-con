import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/dashboard/Badge";
import { updateRewardStatusAction, grantRewardTierAction } from "@/lib/admin/actions";

const STATUS_TONE: Record<string, "neutral" | "ember" | "success"> = {
  UNCLAIMED: "neutral",
  CLAIMED: "ember",
  ISSUED: "success",
};

export default async function AdminRewardsPage() {
  const creators = await db.creator.findMany({
    include: { reward: true },
    orderBy: { name: "asc" },
  });

  const withRewards = creators.filter((c) => c.reward && c.reward.unlockedTier !== "NONE");

  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl text-bone sm:text-5xl">Milestone Rewards</h1>
      <p className="mt-2 max-w-2xl text-sm text-bone/60">
        5 tickets unlocks a free GA ticket, 15 unlocks a free VIP ticket — VIP replaces GA rather
        than stacking. Tickets are never auto-issued; use this page to track claim/issuance
        status manually.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {withRewards.length === 0 && (
          <p className="text-sm text-bone/40">No rewards unlocked yet.</p>
        )}

        {withRewards.map((creator) => {
          const reward = creator.reward!;
          const action = updateRewardStatusAction.bind(null, creator.id);

          return (
            <div
              key={creator.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-bone/10 bg-charcoal/40 p-6"
            >
              <div>
                <h2 className="font-display text-2xl text-bone">{creator.name}</h2>
                <p className="mt-1 text-sm text-bone/60">
                  {reward.unlockedTier === "VIP" ? "VIP REWARD UNLOCKED" : "GA REWARD UNLOCKED"}
                </p>
              </div>

              <form action={action} className="flex items-center gap-3">
                <Badge tone={STATUS_TONE[reward.status]}>{reward.status}</Badge>
                <select
                  name="status"
                  defaultValue={reward.status}
                  className="rounded-lg border border-bone/20 bg-ink px-3 py-2 text-sm text-bone focus:border-ember focus:outline-none"
                >
                  <option value="UNCLAIMED">Unclaimed</option>
                  <option value="CLAIMED">Claimed</option>
                  <option value="ISSUED">Issued</option>
                </select>
                <Button type="submit" size="md" variant="secondary">
                  Update
                </Button>
              </form>
            </div>
          );
        })}
      </div>

      <h2 className="mt-12 font-display text-2xl text-bone">Manually Grant a Tier</h2>
      <p className="mt-2 max-w-2xl text-sm text-bone/60">
        Force-unlock GA or VIP for a creator regardless of their real ticket count — e.g. giving
        someone a GA ticket from day one. This never gets silently overwritten: a later webhook
        can only upgrade it further (to VIP, if they earn it for real), never downgrade it.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {creators.map((creator) => {
          const action = grantRewardTierAction.bind(null, creator.id);
          const currentTier = creator.reward?.unlockedTier ?? "NONE";

          return (
            <form
              key={creator.id}
              action={action}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-bone/10 bg-charcoal/40 p-6"
            >
              <div>
                <h3 className="font-display text-xl text-bone">{creator.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bone/40">
                  Currently: {currentTier}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  name="tier"
                  defaultValue={currentTier}
                  className="rounded-lg border border-bone/20 bg-ink px-3 py-2 text-sm text-bone focus:border-ember focus:outline-none"
                >
                  <option value="NONE">None</option>
                  <option value="GA">GA</option>
                  <option value="VIP">VIP</option>
                </select>
                <Button type="submit" size="md" variant="secondary">
                  Set Tier
                </Button>
              </div>
            </form>
          );
        })}
        {creators.length === 0 && <p className="text-sm text-bone/40">No creators yet.</p>}
      </div>
    </Container>
  );
}
