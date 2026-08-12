import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { schedule } from "@/data/event";

export function Schedule() {
  return (
    <section id="schedule" className="relative bg-charcoal/30 py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Education</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-bone sm:text-5xl md:text-6xl">
            Every session maps to Build, Scale, or Dominate.
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
                  {day.day}
                </span>
                <span className="font-display text-3xl text-ember/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl leading-none text-bone sm:text-4xl">
                  {day.title.toUpperCase()}
                </h3>
                <p className="mt-2 font-display text-lg tracking-wide text-ember">
                  {day.coreIdea}
                </p>
              </div>

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

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bone/40">
                  Sample Sessions
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {day.sessions.map((session) => (
                    <li
                      key={session}
                      className="flex items-start gap-2 text-sm text-bone/70"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ember"
                      />
                      {session}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto border-l-2 border-ember/40 pl-4">
                <p className="text-sm italic leading-relaxed text-bone/70">
                  &ldquo;{day.outcome}&rdquo;
                </p>
              </div>

              {"note" in day && day.note && (
                <p className="text-xs leading-relaxed text-bone/40">
                  {day.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
