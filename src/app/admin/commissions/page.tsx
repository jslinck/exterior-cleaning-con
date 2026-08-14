import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/dashboard/Badge";
import { updateCommissionStatusAction } from "@/lib/admin/actions";

const inputClasses =
  "w-full rounded-lg border border-bone/20 bg-ink px-3 py-2 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30 transition-colors";

const STATUS_TONE: Record<string, "neutral" | "ember" | "success" | "warning" | "danger"> = {
  PENDING: "neutral",
  EARNED: "ember",
  APPROVED: "warning",
  PAID: "success",
  FORFEITED: "danger",
};

export default async function AdminCommissionsPage() {
  const creators = await db.creator.findMany({
    include: { commissionRecord: true },
    orderBy: { name: "asc" },
  });

  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl text-bone sm:text-5xl">Commissions</h1>
      <p className="mt-2 max-w-2xl text-sm text-bone/60">
        Commission is only ever calculated from confirmed, non-refunded ticket revenue. Once a
        record is Approved, Paid, or Forfeited, later refunds no longer silently change the
        amount — they flag a drift in the audit log for manual review instead.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {creators.map((creator) => {
          const record = creator.commissionRecord;
          const action = updateCommissionStatusAction.bind(null, creator.id);

          return (
            <div
              key={creator.id}
              className="grid gap-4 rounded-2xl border border-bone/10 bg-charcoal/40 p-6 lg:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl text-bone">{creator.name}</h2>
                  <Badge tone={STATUS_TONE[record?.status ?? "PENDING"]}>
                    {record?.status ?? "PENDING"}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-bone/60">
                  {record?.ticketsCounted ?? 0} tickets · $
                  {Number(record?.attributableRevenue ?? 0).toLocaleString()} revenue ·{" "}
                  {Number(record?.tierPercentage ?? 0)}% tier
                </p>
                <p className="mt-1 font-display text-3xl text-ember">
                  ${Number(record?.commissionAmount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                {Number(record?.paidAmount ?? 0) > 0 && (
                  <p className="mt-1 text-xs text-bone/40">
                    Paid: ${Number(record?.paidAmount ?? 0).toLocaleString()}
                    {record?.paidAt ? ` on ${record.paidAt.toLocaleDateString()}` : ""}
                  </p>
                )}
              </div>

              <form action={action} className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold uppercase tracking-wide text-bone/40">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={record?.status ?? "PENDING"}
                    className={`${inputClasses} appearance-none`}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="EARNED">Earned</option>
                    <option value="APPROVED">Approved</option>
                    <option value="PAID">Paid</option>
                    <option value="FORFEITED">Forfeited</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold uppercase tracking-wide text-bone/40">
                    Paid Amount
                  </label>
                  <input
                    name="paidAmount"
                    type="number"
                    step="0.01"
                    defaultValue={record?.paidAmount.toString() ?? "0"}
                    className={inputClasses}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold uppercase tracking-wide text-bone/40">
                    Note
                  </label>
                  <input
                    name="paidNote"
                    defaultValue={record?.paidNote ?? ""}
                    className={inputClasses}
                  />
                </div>
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
