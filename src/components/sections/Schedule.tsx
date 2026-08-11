import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { schedule } from "@/data/event";

export function Schedule() {
  return (
    <section id="schedule" className="relative bg-charcoal/30 py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>The Progression</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-bone sm:text-5xl md:text-6xl">
            Get customers. Build the machine. Scale.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {schedule.map((day, i) => (
            <div
              key={day.day}
              className="relative flex flex-col gap-6 rounded-2xl border border-bone/10 bg-ink p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-bone/50">
                  Day {i + 1} — {day.day}
                </span>
                <span className="font-display text-3xl text-ember/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-display text-3xl leading-none text-bone sm:text-4xl">
                {day.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {day.tracks.map((track) => (
                  <span
                    key={track}
                    className="rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ember"
                  >
                    {track}
                  </span>
                ))}
              </div>

              <p className="text-sm leading-relaxed text-bone/60">
                {day.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
