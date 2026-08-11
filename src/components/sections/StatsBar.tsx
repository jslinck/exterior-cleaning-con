import { Container } from "@/components/ui/Container";
import { stats } from "@/data/event";

export function StatsBar() {
  return (
    <section className="relative border-y border-bone/10 bg-charcoal/40 py-10">
      <Container>
        <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <li key={stat.label} className="flex flex-col items-center text-center">
              <span className="font-display text-4xl text-ember sm:text-5xl">
                {stat.value}
                {stat.suffix}
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-bone/60">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
