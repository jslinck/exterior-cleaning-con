import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { updateTicketTypeAction } from "@/lib/admin/actions";

const inputClasses =
  "w-full rounded-lg border border-bone/20 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30 transition-colors";
const labelClasses = "text-xs font-semibold uppercase tracking-[0.2em] text-bone/60";

export default async function AdminTicketTypesPage() {
  const ticketTypes = await db.ticketTypeConfig.findMany({ orderBy: { price: "asc" } });

  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl text-bone sm:text-5xl">Ticket Types</h1>
      <p className="mt-2 max-w-2xl text-sm text-bone/60">
        Pricing and capacity here are for display/reporting in this app. Ticket Tailor remains the
        source of truth for actual checkout availability — map each type to its Ticket Tailor
        ticket type ID once your Ticket Tailor event is set up.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {ticketTypes.map((ticket) => {
          const action = updateTicketTypeAction.bind(null, ticket.id);
          return (
            <form
              key={ticket.id}
              action={action}
              className="flex flex-col gap-4 rounded-2xl border border-bone/10 bg-charcoal/40 p-6"
            >
              <h2 className="font-display text-2xl text-bone">{ticket.name}</h2>

              <div className="flex flex-col gap-2">
                <label className={labelClasses}>Price ($)</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={ticket.price.toString()}
                  required
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClasses}>
                  Capacity <span className="normal-case tracking-normal text-bone/30">(blank = unlimited)</span>
                </label>
                <input
                  name="capacity"
                  type="number"
                  min="0"
                  defaultValue={ticket.capacity ?? ""}
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClasses}>Ticket Tailor Ticket Type ID</label>
                <input
                  name="ticketTailorTicketTypeId"
                  defaultValue={ticket.ticketTailorTicketTypeId ?? ""}
                  placeholder="Not yet mapped"
                  className={inputClasses}
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-bone/70">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked={ticket.active}
                  className="h-4 w-4 rounded border-bone/30 bg-ink accent-ember"
                />
                Active
              </label>

              <Button type="submit" size="md" variant="secondary" className="w-full">
                Save
              </Button>
            </form>
          );
        })}
      </div>
    </Container>
  );
}
