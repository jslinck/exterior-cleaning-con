"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/dal";
import { hashPassword } from "@/lib/auth/password";
import { recomputeCreatorStats } from "@/lib/commission/recompute";
import { validateTierLadder } from "@/lib/commission/tiers";

// Every mutation in this module calls requireAdmin() first — the DB-backed
// "secure" check, not just the optimistic redirect in proxy.ts. See the
// plan doc for why both layers matter.

// ---------- Creators ----------

export async function createCreatorAction(formData: FormData) {
  const admin = await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const instagram = String(formData.get("instagram") || "").trim() || null;
  const referralCode = String(formData.get("referralCode") || "").trim().toUpperCase();
  const password = String(formData.get("password") || "");

  if (!name || !email || !referralCode || !password) {
    throw new Error("Name, email, referral code, and password are required.");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const creator = await db.creator.create({
    data: { name, email, instagram, referralCode },
  });

  const passwordHash = await hashPassword(password);
  await db.user.create({
    data: { email, passwordHash, role: "CREATOR", creatorId: creator.id },
  });

  await db.auditLog.create({
    data: {
      type: "CREATOR_CREATED",
      actorUserId: admin.id,
      creatorId: creator.id,
      newValue: { name, email, referralCode },
    },
  });

  revalidatePath("/admin/creators");
  redirect("/admin/creators");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function updateCreatorAction(creatorId: string, formData: FormData) {
  const admin = await requireAdmin();
  const before = await db.creator.findUniqueOrThrow({ where: { id: creatorId } });

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const instagram = String(formData.get("instagram") || "").trim() || null;
  const status = String(formData.get("status") || "ACTIVE") as "ACTIVE" | "DISABLED";
  const participationConfirmed = formData.get("participationConfirmed") === "on";

  if (!EMAIL_RE.test(email)) {
    throw new Error("Enter a valid email address.");
  }

  // Creator.email and the linked User.email (their login) are separate
  // fields that start out equal but aren't kept in sync automatically —
  // update both together here, or the creator's login would silently
  // keep working with the old address after an admin "changes" it.
  try {
    await db.$transaction([
      db.creator.update({
        where: { id: creatorId },
        data: { name, email, instagram, status, participationConfirmed },
      }),
      db.user.update({ where: { creatorId }, data: { email } }),
    ]);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      throw new Error("That email is already in use by another creator or admin.");
    }
    throw err;
  }

  await db.auditLog.create({
    data: {
      type: "CREATOR_UPDATED",
      actorUserId: admin.id,
      creatorId,
      previousValue: {
        name: before.name,
        email: before.email,
        instagram: before.instagram,
        status: before.status,
        participationConfirmed: before.participationConfirmed,
      },
      newValue: { name, email, instagram, status, participationConfirmed },
    },
  });

  await recomputeCreatorStats(creatorId);

  revalidatePath(`/admin/creators/${creatorId}`);
  revalidatePath("/admin/creators");
}

export async function resetCreatorPasswordAction(creatorId: string, formData: FormData) {
  await requireAdmin();
  const password = String(formData.get("password") || "");
  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }
  const passwordHash = await hashPassword(password);
  await db.user.update({ where: { creatorId }, data: { passwordHash } });
  revalidatePath(`/admin/creators/${creatorId}`);
}

// ---------- Ticket types ----------

export async function updateTicketTypeAction(id: string, formData: FormData) {
  await requireAdmin();

  const price = Number(formData.get("price"));
  const capacityRaw = String(formData.get("capacity") || "").trim();
  const capacity = capacityRaw ? Number(capacityRaw) : null;
  const ticketTailorTicketTypeId =
    String(formData.get("ticketTailorTicketTypeId") || "").trim() || null;
  const active = formData.get("active") === "on";

  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Invalid price.");
  }

  await db.ticketTypeConfig.update({
    where: { id },
    data: { price, capacity, ticketTailorTicketTypeId, active },
  });

  revalidatePath("/admin/ticket-types");
}

// ---------- Commission tiers ----------

export async function updateCommissionTiersAction(formData: FormData) {
  await requireAdmin();

  const tiers = await db.commissionTier.findMany({ orderBy: { minTickets: "asc" } });

  const updates = tiers.map((tier) => {
    const maxTicketsRaw = String(formData.get(`maxTickets_${tier.id}`) || "").trim();
    return {
      id: tier.id,
      minTickets: Number(formData.get(`minTickets_${tier.id}`)),
      maxTickets: maxTicketsRaw ? Number(maxTicketsRaw) : null,
      percentage: Number(formData.get(`percentage_${tier.id}`)),
    };
  });

  const ladderError = validateTierLadder(updates);
  if (ladderError) {
    throw new Error(ladderError);
  }

  for (const u of updates) {
    await db.commissionTier.update({
      where: { id: u.id },
      data: { minTickets: u.minTickets, maxTickets: u.maxTickets, percentage: u.percentage },
    });
  }

  // Tiers changed — every creator's commission needs re-evaluation.
  const creators = await db.creator.findMany({ select: { id: true } });
  for (const c of creators) {
    await recomputeCreatorStats(c.id);
  }

  revalidatePath("/admin/commission-tiers");
}

// ---------- Commission status ----------

export async function updateCommissionStatusAction(creatorId: string, formData: FormData) {
  const admin = await requireAdmin();

  const status = String(formData.get("status") || "") as
    | "PENDING"
    | "EARNED"
    | "APPROVED"
    | "PAID"
    | "FORFEITED";
  const paidAmountRaw = String(formData.get("paidAmount") || "").trim();
  const paidNote = String(formData.get("paidNote") || "").trim() || null;

  const before = await db.commissionRecord.findUniqueOrThrow({ where: { creatorId } });

  await db.commissionRecord.update({
    where: { creatorId },
    data: {
      status,
      paidAmount: paidAmountRaw ? Number(paidAmountRaw) : before.paidAmount,
      paidAt: status === "PAID" ? new Date() : before.paidAt,
      paidNote,
    },
  });

  await db.auditLog.create({
    data: {
      type: "COMMISSION_STATUS_CHANGED",
      actorUserId: admin.id,
      creatorId,
      previousValue: { status: before.status, paidAmount: before.paidAmount.toString() },
      newValue: { status, paidAmount: paidAmountRaw || before.paidAmount.toString() },
    },
  });

  revalidatePath("/admin/commissions");
}

// ---------- Rewards ----------

export async function updateRewardStatusAction(creatorId: string, formData: FormData) {
  const admin = await requireAdmin();
  const status = String(formData.get("status") || "") as "UNCLAIMED" | "CLAIMED" | "ISSUED";

  const before = await db.creatorReward.findUniqueOrThrow({ where: { creatorId } });

  await db.creatorReward.update({ where: { creatorId }, data: { status } });

  await db.auditLog.create({
    data: {
      type: "REWARD_STATUS_CHANGED",
      actorUserId: admin.id,
      creatorId,
      previousValue: { status: before.status },
      newValue: { status },
    },
  });

  revalidatePath("/admin/rewards");
}

// ---------- Manual attribution overrides (always logged) ----------

export async function overrideLeadAttributionAction(leadId: string, formData: FormData) {
  const admin = await requireAdmin();
  const newCreatorId = String(formData.get("creatorId") || "").trim() || null;
  const reason = String(formData.get("reason") || "").trim();

  if (!reason) {
    throw new Error("A reason is required for manual attribution overrides.");
  }

  const before = await db.lead.findUniqueOrThrow({ where: { id: leadId } });

  await db.lead.update({
    where: { id: leadId },
    data: {
      creatorId: newCreatorId,
      source: newCreatorId ? "CREATOR" : "DIRECT",
      attributionOverriddenAt: new Date(),
      attributionOverriddenBy: admin.id,
    },
  });

  await db.auditLog.create({
    data: {
      type: "LEAD_ATTRIBUTION_OVERRIDDEN",
      actorUserId: admin.id,
      leadId,
      creatorId: newCreatorId,
      previousValue: { creatorId: before.creatorId, source: before.source },
      newValue: { creatorId: newCreatorId, source: newCreatorId ? "CREATOR" : "DIRECT" },
      reason,
    },
  });

  revalidatePath("/admin/attribution");
}

export async function overrideOrderAttributionAction(orderId: string, formData: FormData) {
  const admin = await requireAdmin();
  const newCreatorId = String(formData.get("creatorId") || "").trim() || null;
  const reason = String(formData.get("reason") || "").trim();

  if (!reason) {
    throw new Error("A reason is required for manual attribution overrides.");
  }

  const before = await db.order.findUniqueOrThrow({ where: { id: orderId } });

  await db.order.update({
    where: { id: orderId },
    data: { creatorId: newCreatorId },
  });

  await db.auditLog.create({
    data: {
      type: "ORDER_ATTRIBUTION_OVERRIDDEN",
      actorUserId: admin.id,
      orderId,
      creatorId: newCreatorId,
      previousValue: { creatorId: before.creatorId },
      newValue: { creatorId: newCreatorId },
      reason,
    },
  });

  if (before.creatorId) await recomputeCreatorStats(before.creatorId);
  if (newCreatorId) await recomputeCreatorStats(newCreatorId);

  revalidatePath("/admin/attribution");
}
