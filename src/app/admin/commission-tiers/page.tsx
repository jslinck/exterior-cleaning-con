import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { updateCommissionTiersAction } from "@/lib/admin/actions";

const inputClasses =
  "w-full rounded-lg border border-bone/20 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30 transition-colors";
const labelClasses = "text-xs font-semibold uppercase tracking-[0.2em] text-bone/60";

export default async function AdminCommissionTiersPage() {
  const tiers = await db.commissionTier.findMany({ orderBy: { minTickets: "asc" } });

  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl text-bone sm:text-5xl">Commission Tiers</h1>
      <p className="mt-2 max-w-2xl text-sm text-bone/60">
        Retroactive — a creator&apos;s tier percentage applies to <em>all</em> of their qualifying
        ticket revenue, not just the portion above the tier threshold. Tiers must form a
        contiguous ladder starting at 1 ticket, with the last tier left open-ended.
      </p>

      <form
        action={updateCommissionTiersAction}
        className="mt-8 flex flex-col gap-6 rounded-2xl border border-bone/10 bg-charcoal/40 p-6"
      >
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
          <p className={labelClasses}>Min Tickets</p>
          <p className={labelClasses}>Max Tickets</p>
          <p className={labelClasses}>Percentage</p>
          <p className={labelClasses}>Label</p>
        </div>

        {tiers.map((tier) => (
          <div key={tier.id} className="grid gap-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center">
            <input
              name={`minTickets_${tier.id}`}
              type="number"
              min="1"
              defaultValue={tier.minTickets}
              required
              className={inputClasses}
            />
            <input
              name={`maxTickets_${tier.id}`}
              type="number"
              min="1"
              defaultValue={tier.maxTickets ?? ""}
              placeholder="Unbounded"
              className={inputClasses}
            />
            <input
              name={`percentage_${tier.id}`}
              type="number"
              min="0"
              max="100"
              step="0.1"
              defaultValue={tier.percentage.toString()}
              required
              className={inputClasses}
            />
            <p className="text-sm text-bone/50">{tier.label}</p>
          </div>
        ))}

        <Button type="submit" size="lg" className="w-full sm:w-fit">
          Save Tiers
        </Button>
      </form>
    </Container>
  );
}
