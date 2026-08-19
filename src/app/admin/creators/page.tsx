import Link from "next/link";
import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/dashboard/Badge";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/dashboard/Table";
import { createCreatorAction } from "@/lib/admin/actions";

const inputClasses =
  "w-full rounded-lg border border-bone/20 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30 transition-colors";
const labelClasses = "text-xs font-semibold uppercase tracking-[0.2em] text-bone/60";

export default async function AdminCreatorsPage() {
  const creators = await db.creator.findMany({
    include: { leads: true, commissionRecord: true, user: { select: { lastLoginAt: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Container className="py-12">
      <h1 className="font-display text-4xl text-bone sm:text-5xl">Creators</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <Table>
          <Thead>
            <Tr>
              <Th className="sticky left-0 z-10 bg-charcoal">Name</Th>
              <Th>Email</Th>
              <Th>Referral Code</Th>
              <Th>Status</Th>
              <Th>Registrations</Th>
              <Th>Revenue</Th>
              <Th>Last Login</Th>
            </Tr>
          </Thead>
          <Tbody>
            {creators.map((creator) => (
              <Tr key={creator.id}>
                <Td className="sticky left-0 z-10 bg-ink font-medium">
                  <Link
                    href={`/admin/creators/${creator.id}`}
                    className="text-bone hover:text-ember hover:underline"
                  >
                    {creator.name}
                  </Link>
                </Td>
                <Td className="text-bone/70">{creator.email}</Td>
                <Td>{creator.referralCode}</Td>
                <Td>
                  <Badge tone={creator.status === "ACTIVE" ? "success" : "danger"}>
                    {creator.status}
                  </Badge>
                </Td>
                <Td>{creator.leads.length}</Td>
                <Td>
                  ${Number(creator.commissionRecord?.attributableRevenue ?? 0).toLocaleString()}
                </Td>
                <Td>
                  {creator.user?.lastLoginAt ? (
                    <span className="text-bone/70">
                      {creator.user.lastLoginAt.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  ) : (
                    <Badge tone="warning">Never</Badge>
                  )}
                </Td>
              </Tr>
            ))}
            {creators.length === 0 && (
              <Tr>
                <Td className="text-bone/40" colSpan={7}>
                  No creators yet.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>

        <div className="h-fit rounded-2xl border border-bone/10 bg-charcoal/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
            Add Creator
          </p>
          <form action={createCreatorAction} className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={labelClasses}>
                Name
              </label>
              <input id="name" name="name" required className={inputClasses} placeholder="Bailey" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClasses}
                placeholder="bailey@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className={labelClasses}>
                Phone <span className="normal-case tracking-normal text-bone/30">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={inputClasses}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="instagram" className={labelClasses}>
                Instagram <span className="normal-case tracking-normal text-bone/30">(optional)</span>
              </label>
              <input id="instagram" name="instagram" className={inputClasses} placeholder="@baileyysells" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="referralCode" className={labelClasses}>
                Referral Code
              </label>
              <input
                id="referralCode"
                name="referralCode"
                required
                className={inputClasses}
                placeholder="BAILEY"
              />
            </div>
            <p className="text-[11px] text-bone/40">
              They&apos;ll get an email with a link to set their own password — nothing to share
              manually.
            </p>
            <Button type="submit" size="md" className="w-full">
              Create Creator &amp; Send Setup Email
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}
