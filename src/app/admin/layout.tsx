import { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/dal";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/creators", label: "Creators" },
  { href: "/admin/commissions", label: "Commissions" },
  { href: "/admin/rewards", label: "Rewards" },
  { href: "/admin/ticket-types", label: "Ticket Types" },
  { href: "/admin/commission-tiers", label: "Commission Tiers" },
  { href: "/admin/attribution", label: "Attribution" },
  { href: "/admin/audit-log", label: "Audit Log" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-ink">
      <DashboardHeader title="Admin" />
      <nav className="border-b border-bone/10 bg-charcoal/20">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 md:px-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-bone/60 transition-colors hover:text-ember"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
      {children}
    </div>
  );
}
