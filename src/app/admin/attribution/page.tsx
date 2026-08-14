import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/dashboard/Table";
import {
  overrideLeadAttributionAction,
  overrideOrderAttributionAction,
} from "@/lib/admin/actions";

const selectClasses =
  "rounded-lg border border-bone/20 bg-ink px-2 py-1.5 text-xs text-bone focus:border-ember focus:outline-none";
const inputClasses =
  "rounded-lg border border-bone/20 bg-ink px-2 py-1.5 text-xs text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none";

export default async function AdminAttributionPage() {
  const [leads, orders, creators] = await Promise.all([
    db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { creator: { select: { name: true } } },
    }),
    db.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { creator: { select: { name: true } } },
    }),
    db.creator.findMany({ where: { status: "ACTIVE" }, orderBy: { name: "asc" } }),
  ]);

  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl text-bone sm:text-5xl">Manual Attribution</h1>
      <p className="mt-2 max-w-2xl text-sm text-bone/60">
        Every override here is permanently logged to the audit trail with the reason given —
        first-touch attribution is otherwise permanent, so use this only to correct a genuine
        mistake.
      </p>

      <h2 className="mt-10 font-display text-2xl text-bone">Founding-List Leads</h2>
      <div className="mt-4">
        <Table>
          <Thead>
            <Tr>
              <Th>Lead</Th>
              <Th>Current Attribution</Th>
              <Th>Reassign To</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leads.map((lead) => {
              const action = overrideLeadAttributionAction.bind(null, lead.id);
              return (
                <Tr key={lead.id}>
                  <Td>
                    <div className="text-bone">
                      {lead.firstName} {lead.lastName}
                    </div>
                    <div className="text-xs text-bone/40">{lead.email}</div>
                  </Td>
                  <Td>{lead.creator?.name ?? "Direct"}</Td>
                  <Td>
                    <form action={action} className="flex flex-wrap items-center gap-2">
                      <select name="creatorId" defaultValue={lead.creatorId ?? ""} className={selectClasses}>
                        <option value="">Direct (no creator)</option>
                        {creators.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <input
                        name="reason"
                        placeholder="Reason (required)"
                        required
                        className={inputClasses}
                      />
                      <Button type="submit" size="md" variant="secondary">
                        Update
                      </Button>
                    </form>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>

      <h2 className="mt-10 font-display text-2xl text-bone">Ticket Orders</h2>
      <div className="mt-4">
        <Table>
          <Thead>
            <Tr>
              <Th>Order</Th>
              <Th>Current Attribution</Th>
              <Th>Reassign To</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => {
              const action = overrideOrderAttributionAction.bind(null, order.id);
              return (
                <Tr key={order.id}>
                  <Td>
                    <div className="text-bone">{order.buyerName || "Unknown"}</div>
                    <div className="text-xs text-bone/40">{order.buyerEmail}</div>
                  </Td>
                  <Td>{order.creator?.name ?? "Direct"}</Td>
                  <Td>
                    <form action={action} className="flex flex-wrap items-center gap-2">
                      <select
                        name="creatorId"
                        defaultValue={order.creatorId ?? ""}
                        className={selectClasses}
                      >
                        <option value="">Direct (no creator)</option>
                        {creators.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <input
                        name="reason"
                        placeholder="Reason (required)"
                        required
                        className={inputClasses}
                      />
                      <Button type="submit" size="md" variant="secondary">
                        Update
                      </Button>
                    </form>
                  </Td>
                </Tr>
              );
            })}
            {orders.length === 0 && (
              <Tr>
                <Td colSpan={3} className="text-bone/40">
                  No orders yet.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>
    </Container>
  );
}
