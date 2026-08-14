import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/dashboard/Table";
import { Badge } from "@/components/dashboard/Badge";

export default async function AdminAuditLogPage() {
  const entries = await db.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { creator: { select: { name: true } } },
  });

  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl text-bone sm:text-5xl">Audit Log</h1>
      <p className="mt-2 max-w-2xl text-sm text-bone/60">
        Every manual attribution override and commission/reward status change, plus automatic
        drift-detection flags when a refund changes numbers behind an already-approved or paid
        commission.
      </p>

      <div className="mt-8">
        <Table>
          <Thead>
            <Tr>
              <Th>When</Th>
              <Th>Type</Th>
              <Th>Creator</Th>
              <Th>Reason</Th>
              <Th>Change</Th>
            </Tr>
          </Thead>
          <Tbody>
            {entries.map((entry) => (
              <Tr key={entry.id}>
                <Td className="whitespace-nowrap text-xs text-bone/50">
                  {entry.createdAt.toLocaleString()}
                </Td>
                <Td>
                  <Badge tone="neutral">{entry.type.replace(/_/g, " ")}</Badge>
                </Td>
                <Td>{entry.creator?.name ?? "—"}</Td>
                <Td className="max-w-xs">{entry.reason ?? "—"}</Td>
                <Td className="max-w-md">
                  <code className="text-[11px] text-bone/50">
                    {entry.previousValue ? JSON.stringify(entry.previousValue) : "—"} →{" "}
                    {entry.newValue ? JSON.stringify(entry.newValue) : "—"}
                  </code>
                </Td>
              </Tr>
            ))}
            {entries.length === 0 && (
              <Tr>
                <Td colSpan={5} className="text-bone/40">
                  No audit events yet.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>
    </Container>
  );
}
