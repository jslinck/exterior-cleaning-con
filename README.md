# EXTERIOR CON — Landing Page

Founding-interest landing page for **EXTERIOR CON**, a premium business
summit for exterior-cleaning entrepreneurs. Phoenix / Scottsdale, Arizona —
February 26–28, 2027.

Built with [Next.js](https://nextjs.org) (App Router, TypeScript) and
[Tailwind CSS](https://tailwindcss.com).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/data/event.ts` — all event copy, dates, stats, and section content.
  Edit this file to change headlines, taglines, or the schedule.
- `src/data/tickets.ts` — GA / VIP pricing and what's included in each tier.
- `src/data/speakers.ts` — Founding Creator Lineup. Each entry has a
  `confirmed: boolean` — flip it to `true` only once someone has actually
  signed, and the UI will update its badge automatically.
- `src/components/sections/*` — one component per landing-page section.
- `src/app/api/founding-list/route.ts` — the founding-interest form submit
  handler. Currently logs submissions server-side; swap the `TODO` in that
  file for a real CRM/ESP integration when ready.

## Notes

- The ticket structure is intentionally two tiers (GA, VIP) — do not add a
  third without also updating the VIP messaging in `src/data/event.ts`.
- No speaker, sponsor, or artist is confirmed. Copy throughout the site is
  written to reflect that — keep it that way until a name is actually
  locked in, then update `confirmed` in `src/data/speakers.ts`.
