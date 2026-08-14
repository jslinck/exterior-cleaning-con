import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCreatorDashboardData } from "@/lib/creator/stats";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StatTile } from "@/components/dashboard/StatTile";
import {
  updateCreatorAction,
  resetCreatorPasswordAction,
  sendPasswordSetupEmailAction,
} from "@/lib/admin/actions";

const inputClasses =
  "w-full rounded-lg border border-bone/20 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30 transition-colors";
const labelClasses = "text-xs font-semibold uppercase tracking-[0.2em] text-bone/60";

export default async function AdminCreatorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const creator = await db.creator.findUnique({ where: { id } });
  if (!creator) notFound();

  const data = await getCreatorDashboardData(id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exteriorcon.com";
  const referralLink = `${siteUrl}/?ref=${creator.referralCode}`;

  const updateAction = updateCreatorAction.bind(null, id);
  const resetPasswordAction = resetCreatorPasswordAction.bind(null, id);
  const sendSetupEmailAction = sendPasswordSetupEmailAction.bind(null, id);

  return (
    <Container className="py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/40">
        {creator.referralCode} · {referralLink}
      </p>
      <h1 className="mt-2 font-display text-4xl text-bone sm:text-5xl">{creator.name}</h1>
      <p className="mt-1 text-sm text-bone/60">
        {creator.email}
        {creator.phone && <> · {creator.phone}</>}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Registrations" value={String(data.registrationCount)} />
        <StatTile label="Tickets Sold" value={String(data.ticketsSold)} />
        <StatTile
          label="Revenue"
          value={`$${data.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
        />
        <StatTile
          label="Commission"
          value={`$${data.estimatedCommission.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          sublabel={`${data.commissionTierPercentage}% · ${data.commissionStatus}`}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-bone/10 bg-charcoal/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
            Edit Creator
          </p>
          <form action={updateAction} className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={labelClasses}>
                Name
              </label>
              <input
                id="name"
                name="name"
                defaultValue={creator.name}
                required
                className={inputClasses}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={creator.email}
                required
                className={inputClasses}
              />
              <p className="text-xs text-bone/40">
                Also updates their login email — they&apos;ll need to use the new address next
                time they sign in.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className={labelClasses}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={creator.phone ?? ""}
                className={inputClasses}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="instagram" className={labelClasses}>
                Instagram
              </label>
              <input
                id="instagram"
                name="instagram"
                defaultValue={creator.instagram ?? ""}
                className={inputClasses}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="status" className={labelClasses}>
                Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={creator.status}
                className={`${inputClasses} appearance-none`}
              >
                <option value="ACTIVE">Active</option>
                <option value="DISABLED">Disabled</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-bone/70">
              <input
                type="checkbox"
                name="participationConfirmed"
                defaultChecked={creator.participationConfirmed}
                className="h-4 w-4 rounded border-bone/30 bg-ink accent-ember"
              />
              Event participation requirement fulfilled
            </label>
            <Button type="submit" size="md" className="w-full">
              Save Changes
            </Button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-bone/10 bg-charcoal/40 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
              Password Setup / Reset Email
            </p>
            <p className="mt-2 text-xs text-bone/40">
              Emails the creator a link to set their own password, instead of you choosing one and
              sharing it directly.
            </p>
            <form action={sendSetupEmailAction} className="mt-4">
              <Button type="submit" size="md" variant="secondary" className="w-full">
                Send Setup Email
              </Button>
            </form>
          </div>

          <div className="rounded-2xl border border-bone/10 bg-charcoal/40 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
              Reset Password Manually
            </p>
            <form action={resetPasswordAction} className="mt-4 flex flex-col gap-4">
              <input
                name="password"
                type="text"
                required
                minLength={8}
                className={inputClasses}
                placeholder="New password (min 8 characters)"
              />
              <Button type="submit" size="md" variant="secondary" className="w-full">
                Reset Password
              </Button>
            </form>
          </div>

          <div className="rounded-2xl border border-bone/10 bg-charcoal/40 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
              Ticket Breakdown
            </p>
            <p className="mt-3 text-sm text-bone/70">
              {data.ticketsByType.ga ?? 0} GA · {data.ticketsByType.vip ?? 0} VIP ·{" "}
              {data.ticketsByType.elite ?? 0} Elite
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
              Reward
            </p>
            <p className="mt-1 text-sm text-bone/70">
              {data.rewardTier} — {data.rewardStatus}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
