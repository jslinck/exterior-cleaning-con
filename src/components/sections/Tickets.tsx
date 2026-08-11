import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { vip } from "@/data/event";
import { tickets } from "@/data/tickets";

export function Tickets() {
  return (
    <section id="tickets" className="relative bg-charcoal/30 py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{vip.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-bone sm:text-5xl md:text-6xl">
            {vip.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bone/70">
            {vip.description}
          </p>
        </div>

        <p className="mt-10 max-w-2xl rounded-xl border border-ember/30 bg-ember/10 px-5 py-4 text-sm font-medium text-bone/80">
          Tickets are not yet on sale. Pricing below reflects planned founding
          pricing — join the founding list for first access before doors
          open to the public.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`relative flex flex-col gap-8 rounded-2xl border p-8 md:p-10 ${
                ticket.featured
                  ? "border-ember bg-gradient-to-b from-charcoal-light to-ink shadow-[0_0_60px_-15px_rgba(255,106,12,0.5)]"
                  : "border-bone/10 bg-ink"
              }`}
            >
              {ticket.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-ember px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                  Most Exclusive
                </span>
              )}

              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-3xl text-bone sm:text-4xl">
                  {ticket.name}
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
                href="#founding-list"
                variant={ticket.featured ? "primary" : "secondary"}
                size="lg"
                className="w-full"
              >
                Join the Founding List
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-bone/40">
          Two ticket types. No hidden tiers. Ever.
        </p>
      </Container>
    </section>
  );
}
