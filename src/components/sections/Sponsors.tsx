import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { sponsors } from "@/data/event";

export function Sponsors() {
  return (
    <section className="relative border-y border-bone/10 bg-charcoal/30 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">{sponsors.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-bone sm:text-5xl">
            {sponsors.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bone/70">
            {sponsors.body}
          </p>
        </div>
      </Container>
    </section>
  );
}
