import { ReactNode } from "react";
import { requireCreator } from "@/lib/auth/dal";

export default async function CreatorLayout({ children }: { children: ReactNode }) {
  await requireCreator();
  return <div className="min-h-screen bg-ink">{children}</div>;
}
