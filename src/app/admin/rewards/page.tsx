import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/dashboard/Badge";
import { updateRewardStatusAction } from "@/lib/admin/actions";

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
    </Container>
  );
}
