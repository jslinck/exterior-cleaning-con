import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getOptimisticSession } from "@/lib/auth/session";

// Data Access Layer — the real (DB-backed) authorization checks. Every
// Server Component, Server Action, and Route Handler that touches
// creator/admin data must call one of these, not just rely on proxy.ts's
// optimistic redirect. This is what lets a disabled creator/admin be cut
// off immediately even though their signed session cookie is technically
// still valid until it expires.

export const getVerifiedSession = cache(async () => {
  const optimistic = await getOptimisticSession();
  if (!optimistic) return null;

  const user = await db.user.findUnique({
    where: { id: optimistic.userId },
    include: { creator: true },
  });

  if (!user) return null;
  if (user.role === "CREATOR" && user.creator?.status !== "ACTIVE") return null;

  return user;
});

export async function requireAdmin() {
  const user = await getVerifiedSession();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }
  return user;
}

export async function requireCreator() {
  const user = await getVerifiedSession();
  if (!user || user.role !== "CREATOR" || !user.creator) {
    redirect("/login");
  }
  return user;
}
