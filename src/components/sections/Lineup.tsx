import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getInitials } from "@/lib/initials";
import { lineupSection } from "@/data/event";
import { speakers } from "@/data/speakers";

export function Lineup() {
  return (
    <section id="lineup" className="relative bg-ink py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{lineupSection.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-bone sm:text-5xl md:text-6xl">
            {lineupSection.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bone/70">
            {lineupSection.body}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => {
            const isPlaceholder = !speaker.handle;
            return (
            <div
              key={speaker.id}
              className="flex flex-col gap-5 rounded-2xl border border-bone/10 bg-charcoal/50 p-6"
            >
              <div className="flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className={
                    isPlaceholder
                      ? "flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-dashed border-bone/25 font-display text-xl text-bone/30"
                      : "flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ember to-ember-light font-display text-xl text-ink"
                  }
                >
                  {isPlaceholder ? "?" : getInitials(speaker.name)}
                </div>
                <div>
                  <h3 className="font-display text-xl text-bone">{speaker.name}</h3>
                  {!isPlaceholder && (
                    <p className="text-sm text-bone/50">{speaker.handle}</p>
                  )}
                </div>
              </div>

              <span className="w-fit rounded-full border border-steel/40 bg-steel/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-steel">
                {speaker.confirmed ? "Confirmed" : "Target Lineup — Not Confirmed"}
              </span>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember/80">
                {speaker.focus}
              </p>

              <p className="text-sm leading-relaxed text-bone/60">{speaker.bio}</p>
            </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-bone/40">
          {lineupSection.disclaimer}
        </p>
      </Container>
    </section>
  );
}
