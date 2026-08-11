import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { saturdayNight } from "@/data/event";

export function SaturdayNight() {
  return (
    <section className="relative overflow-hidden bg-ink py-32 md:py-48">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,_rgba(255,106,12,0.22)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(247,244,237,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(247,244,237,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="grain" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <Eyebrow className="justify-center">{saturdayNight.eyebrow}</Eyebrow>
        <h2 className="mt-8 font-display text-5xl leading-[0.95] text-bone sm:text-7xl md:text-8xl lg:text-9xl">
          THE SUMMIT
          <br />
          ENDS WITH A
          <br />
          <span className="text-ember">LIVE CONCERT</span>
        </h2>
        <p className="mt-8 max-w-xl text-base text-bone/60 md:text-lg">
          {saturdayNight.body}
        </p>
      </Container>
    </section>
  );
}
