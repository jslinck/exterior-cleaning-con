import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Logo";
import { brand, event } from "@/data/event";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink py-10">
      <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Mark className="h-16 w-auto" />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">
            {brand.tagline}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-bone/40">
            {event.location} · {event.dateRange}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <a
            href="/affiliates"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50 hover:text-ember"
          >
            Creator Program
          </a>
          <p className="text-xs text-bone/30">
            © {new Date().getFullYear()} {event.shortName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
