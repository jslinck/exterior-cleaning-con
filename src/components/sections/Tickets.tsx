import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { elite, vip, ticketsOnSale } from "@/data/event";
import { tickets } from "@/data/tickets";
import { getCheckoutUrl } from "@/lib/tickettailor/checkoutLink";

export async function Tickets() {
  const checkoutUrl = ticketsOnSale ? await getCheckoutUrl() : null;

  return (
    <section id="tickets" className="relative bg-charcoal/30 py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Tickets</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-bone sm:text-5xl md:text-6xl">
            Three ways in. One unmistakable ladder.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bone/70">
            {vip.description}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 font-display text-2xl text-bone/50 sm:text-3xl">
          <span className="text-bone">$497</span>
          <span className="text-ember">→</span>
          <span className="text-bone">$997</span>
          <span className="text-ember">→</span>
          <span className="text-bone">$2,997</span>
        </div>

        {!ticketsOnSale && (
          <p className="mt-8 max-w-2xl rounded-xl border border-ember/30 bg-ember/10 px-5 py-4 text-sm font-medium text-bone/80">
            Tickets are not yet on sale. Pricing below reflects planned founding
            pricing — join the founding list for first access before doors
            open to the public.
          </p>
        )}

        {/* VIP + Elite narrative */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-2xl border border-bone/10 bg-ink p-8">
            <Eyebrow>{vip.eyebrow}</Eyebrow>
            <h3 className="font-display text-2xl text-bone sm:text-3xl">
              {vip.headline}
            </h3>
            <ul className="flex flex-col gap-2">
              {vip.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-bone/70">
                  <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-bone/20 bg-gradient-to-b from-charcoal-light to-ink p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ember/20 blur-[80px] animate-glow"
            />
            <Eyebrow>{elite.eyebrow}</Eyebrow>
            <h3 className="font-display text-2xl text-bone sm:text-3xl">
              {elite.headline}
            </h3>
            <p className="text-sm leading-relaxed text-bone/70">
              {elite.description}
            </p>
            <span className="w-fit rounded-full border border-bone/30 bg-bone/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-bone">
              {elite.availability}
            </span>
            <ul className="mt-2 flex flex-col gap-2">
              {elite.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-bone/70">
                  <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`relative flex flex-col gap-8 rounded-2xl border p-8 md:p-10 ${
                ticket.highlight === "recommended"
                  ? "border-ember bg-gradient-to-b from-charcoal-light to-ink shadow-[0_0_60px_-15px_rgba(255,106,12,0.5)]"
                  : ticket.highlight === "elite"
                    ? "border-bone/30 bg-gradient-to-b from-charcoal to-ink shadow-[0_0_60px_-15px_rgba(247,244,237,0.15)]"
                    : "border-bone/10 bg-ink"
              }`}
            >
              {ticket.badge && (
                <span
                  className={`absolute -top-3 left-8 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                    ticket.highlight === "recommended"
                      ? "bg-ember text-ink"
                      : "bg-bone text-ink"
                  }`}
                >
                  {ticket.badge}
                </span>
              )}

              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-3xl text-bone sm:text-4xl">
                  {ticket.name.toUpperCase()}
                </h3>
                <span className="font-display text-4xl text-ember sm:text-5xl">
                  {ticket.priceLabel}
                </span>
              </div>

              <p className="text-sm text-bone/60">{ticket.tagline}</p>

              <ul className="flex flex-1 flex-col gap-3">
                {ticket.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-bone/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                href={checkoutUrl ?? "#founding-list"}
                variant={ticket.highlight ? "primary" : "secondary"}
                size="lg"
                className="w-full"
              >
                {checkoutUrl ? ticket.ctaLabel : "Join the Founding List"}
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-bone/40">
          Three ticket types. No hidden tiers. Ever.
        </p>
      </Container>
    </section>
  );
}
