import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { experiences } from "@/data/event";

export function Experience() {
  return (
    <section id="experience" className="relative bg-ink py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>The Experience</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-bone sm:text-5xl md:text-6xl">
            Three days. One summit. Zero downtime.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((item, i) => (
            <div
              key={item.title}
              className="group relative flex min-h-[220px] flex-col justify-between bg-charcoal p-6 transition-colors duration-300 hover:bg-charcoal-light md:p-8"
            >
              <span className="font-display text-sm text-ember/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl text-bone sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bone/60">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
