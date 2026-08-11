import { Container } from "@/components/ui/Container";
import { event } from "@/data/event";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink py-10">
      <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg tracking-wide text-bone">
            {event.shortName}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bone/40">
            {event.location} · {event.dateRange}
          </p>
        </div>
        <p className="text-xs text-bone/30">
          © {new Date().getFullYear()} {event.shortName}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
