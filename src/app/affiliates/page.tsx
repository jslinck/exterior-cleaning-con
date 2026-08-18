import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Mark } from "@/components/ui/Logo";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Creator Program | EXTERIOR CON",
  description:
    "Earn commissions referring exterior-service operators to EXTERIOR CON, plus free tickets at referral milestones.",
};

const tiers = [
  { range: "1–10 tickets", percentage: "15%" },
  { range: "11–20 tickets", percentage: "20%" },
  { range: "21+ tickets", percentage: "25%" },
];

const milestones = [
  { threshold: "5 tickets", reward: "Free General Admission ticket" },
  { threshold: "15 tickets", reward: "Free VIP ticket (upgrades your GA reward)" },
];

export default function AffiliatesPage() {
  return (
    <>
      <header className="border-b border-bone/10 bg-ink">
        <Container className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" aria-label="EXTERIOR CON — home">
            <Mark className="h-10 w-auto md:h-12" priority />
          </Link>
          <Button href="/login" size="md">
            Log In
          </Button>
        </Container>
      </header>

      <main className="bg-ink">
        <section className="relative overflow-hidden py-24 md:py-32">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/3 rounded-full bg-ember/20 blur-[130px]" />
          </div>

          <Container className="relative z-10">
            <div className="max-w-2xl">
              <Eyebrow>Creator Program</Eyebrow>
              <h1 className="mt-6 font-display text-4xl leading-[1.02] text-bone sm:text-5xl md:text-6xl">
                Refer operators. Earn commission. Get free tickets.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-bone/70">
                Every EXTERIOR CON creator gets a personal referral link, a private dashboard to
                track exactly what it&apos;s driving, and a commission on every ticket sold
                through it — paid out post-event.
              </p>
              <div className="mt-8">
                <Button href="/login" size="lg">
                  Log In to Your Dashboard
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-bone/10 py-20 md:py-24">
          <Container>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-bone/10 bg-charcoal/40 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">Step 1</p>
                <h3 className="mt-3 font-display text-2xl text-bone">Get your link</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/60">
                  Log into your dashboard for a unique referral link tied to you, permanently.
                </p>
              </div>
              <div className="rounded-2xl border border-bone/10 bg-charcoal/40 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">Step 2</p>
                <h3 className="mt-3 font-display text-2xl text-bone">Share it</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/60">
                  Anyone who signs up or buys a ticket through your link — on any device — gets
                  credited to you.
                </p>
              </div>
              <div className="rounded-2xl border border-bone/10 bg-charcoal/40 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">Step 3</p>
                <h3 className="mt-3 font-display text-2xl text-bone">Earn</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/60">
                  Track registrations, ticket sales, and commission live — all from one dashboard.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-bone/10 py-20 md:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <Eyebrow>Commission Tiers</Eyebrow>
                <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
                  The more you refer, the more you earn per ticket.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-bone/60">
                  Retroactive, not blended — hit a new tier and it applies to every ticket
                  you&apos;ve driven, not just the ones after.
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {tiers.map((tier) => (
                    <li
                      key={tier.range}
                      className="flex items-center justify-between rounded-xl border border-bone/10 bg-charcoal/40 px-5 py-4"
                    >
                      <span className="text-sm text-bone/70">{tier.range}</span>
                      <span className="font-display text-2xl text-ember">{tier.percentage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Eyebrow>Milestone Rewards</Eyebrow>
                <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
                  Hit a milestone, unlock a free ticket.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-bone/60">
                  On top of commission — tickets are never auto-issued, your event team confirms
                  and issues them.
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {milestones.map((m) => (
                    <li
                      key={m.threshold}
                      className="rounded-xl border border-bone/10 bg-charcoal/40 px-5 py-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
                        {m.threshold}
                      </p>
                      <p className="mt-1 text-sm text-bone/70">{m.reward}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-bone/10 py-20 md:py-24">
          <Container className="flex flex-col items-center text-center">
            <h2 className="max-w-xl font-display text-3xl text-bone sm:text-4xl">
              Already a creator?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/60">
              Log in to get your referral link and see your live numbers.
            </p>
            <div className="mt-8">
              <Button href="/login" size="lg">
                Log In to Your Dashboard
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
