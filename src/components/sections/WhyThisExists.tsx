import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { whyThisExists } from "@/data/event";

export function WhyThisExists() {
  return (
    <section className="relative bg-ink py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <Eyebrow>{whyThisExists.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] text-bone sm:text-5xl md:text-6xl">
              {whyThisExists.headline}
            </h2>
          </div>
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-bone/70 md:pt-2">
            {whyThisExists.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
