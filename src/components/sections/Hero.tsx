import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Skyline } from "@/components/ui/Skyline";
import { ctas, event } from "@/data/event";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink pt-16 md:pt-20"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[-10%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-ember/25 blur-[140px] animate-glow" />
        <div className="absolute right-[-10%] bottom-[10%] h-[40vh] w-[40vh] rounded-full bg-ember/10 blur-[120px]" />
        <div className="grain" />
      </div>

      <Skyline className="pointer-events-none absolute inset-x-0 bottom-0 h-40 text-charcoal/60 md:h-64" />

      <Container className="relative z-10">
        <div className="flex max-w-4xl flex-col gap-8 animate-fade-up">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-bone/70">
            <span className="rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-ember">
              {event.location}
            </span>
            <span className="rounded-full border border-bone/20 px-4 py-1.5">
              {event.dateRange}
            </span>
          </div>

          <div>
            <h1 className="font-display leading-[0.9] text-6xl tracking-wide text-bone sm:text-7xl md:text-8xl lg:text-[9rem]">
              EXTERIOR
            </h1>
            <h1 className="font-display leading-[0.9] text-6xl tracking-[0.15em] text-stroke sm:text-7xl md:text-8xl lg:text-[9rem]">
              CON
            </h1>
          </div>

          <p className="max-w-2xl text-lg font-medium text-bone sm:text-xl md:text-2xl">
            {event.headline}
          </p>

          <p className="max-w-2xl text-base text-bone/70 md:text-lg">
            {event.subheadline}
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Button href="#founding-list" size="lg">
              {ctas.primary}
            </Button>
            <Button href="#experience" size="lg" variant="secondary">
              {ctas.secondary}
            </Button>
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-bone/40">
            Registered interest only — tickets are not yet on sale.
          </p>
        </div>
      </Container>
    </section>
  );
}
