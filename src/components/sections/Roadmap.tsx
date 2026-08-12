import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { roadmap } from "@/data/event";

export function Roadmap() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 rounded-full bg-ember/10 blur-[160px]" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block w-fit rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ember">
            Sunday — Dominate
          </span>
          <Eyebrow>{roadmap.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-bone sm:text-5xl md:text-6xl">
            {roadmap.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bone/70">
            {roadmap.intro}
          </p>
        </div>

        <div className="mt-16 flex flex-col">
          {roadmap.milestones.map((milestone, i) => (
            <div key={milestone.revenue} className="relative flex gap-6 pb-10 last:pb-0">
              <div className="relative flex shrink-0 flex-col items-center">
                <span
                  aria-hidden="true"
                  className="flex h-4 w-4 shrink-0 rounded-full bg-ember ring-4 ring-ember/20"
                />
                {i < roadmap.milestones.length - 1 && (
                  <span aria-hidden="true" className="mt-1 w-px flex-1 bg-bone/15" />
                )}
              </div>

              <div className="flex-1 pb-2 sm:flex sm:items-baseline sm:gap-8">
                <span className="font-display text-3xl leading-none text-bone sm:w-36 sm:shrink-0 sm:text-4xl">
                  {milestone.revenue}
                </span>
                <div className="mt-2 sm:mt-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ember">
                    {milestone.category}
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-bone/70 sm:text-base">
                    {milestone.change}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-bone/40">
          {roadmap.disclaimer}
        </p>
      </Container>
    </section>
  );
}
