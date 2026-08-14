"use client";

import { useRouter } from "next/navigation";
import { Mark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function DashboardHeader({ title }: { title: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-bone/10 bg-charcoal/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-4">
          <Mark className="h-8 w-auto" />
          <span className="font-display text-lg text-bone">{title}</span>
        </div>
        <Button type="button" variant="ghost" size="md" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </header>
  );
}
