import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { identity } from "@/data/event";

export function Identity() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[60vh] w-[90vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-ember/10 blur-[160px]" />
        <div className="grain" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{identity.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-5xl leading-[1.02] text-bone sm:text-6xl md:text-7xl">
            {identity.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bone/70">
            {identity.intro}
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-6">
          {identity.steps.map((step, i) => (
            <div key={step.word} className="relative flex flex-col items-center gap-5 text-center">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-8 left-1/2 hidden -translate-x-1/2 text-2xl text-ember/50 md:top-1/4 md:-left-3 md:block md:-translate-x-0 md:-translate-y-1/2"
                >
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              )}
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-bone/40">
                {step.day}
              </span>
              <span className="font-display text-6xl leading-none text-bone sm:text-7xl md:text-8xl">
                {step.word.toUpperCase()}
              </span>
              <span aria-hidden="true" className="h-1 w-16 bg-ember" />
              <p className="max-w-xs text-sm leading-relaxed text-bone/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
