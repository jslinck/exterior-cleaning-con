import { Container } from "@/components/ui/Container";
import { Lockup } from "@/components/ui/Logo";
import { event } from "@/data/event";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink py-10">
      <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Lockup
            markClassName="h-9 w-9 text-lg"
            wordmarkClassName="text-base"
          />
          <p className="text-xs uppercase tracking-[0.2em] text-bone/40">
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
