"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Logo";
import { ctas } from "@/data/event";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#schedule", label: "Schedule" },
  { href: "#lineup", label: "Lineup" },
  { href: "#tickets", label: "Tickets" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-bone/10" : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a href="#top" aria-label="EXTERIOR CON — home">
          <Mark className="h-12 w-auto md:h-14" priority />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/70 transition-colors hover:text-ember"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <span className="hidden items-center gap-3 md:inline-flex">
          <Button href="/affiliates" size="md" variant="secondary">
            Creators
          </Button>
          <Button href="#founding-list" size="md">
            {ctas.primary}
          </Button>
        </span>
        <span className="flex items-center gap-2 md:hidden">
          <Button href="/affiliates" size="md" variant="secondary">
            Creators
          </Button>
          <Button href="#founding-list" size="md" variant="secondary">
            Join
          </Button>
        </span>
      </Container>
    </header>
  );
}
