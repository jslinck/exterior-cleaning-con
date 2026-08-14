import "server-only";
import { db } from "@/lib/db";
import { recomputeCreatorStats } from "@/lib/commission/recompute";
import { upsertIssuedTicket } from "@/lib/webhooks/handlers/issuedTicket";
import { normalizeEmail, normalizePhone } from "@/lib/normalize";
import type { TicketTailorOrderPayload } from "@/lib/webhooks/types";

const ORDER_STATUS_MAP: Record<string, "CONFIRMED" | "CANCELLED" | "REFUNDED" | "PARTIALLY_REFUNDED"> = {
  confirmed: "CONFIRMED",
  cancelled: "CANCELLED",
  canceled: "CANCELLED",
  refunded: "REFUNDED",
  part_refunded: "PARTIALLY_REFUNDED",
  partially_refunded: "PARTIALLY_REFUNDED",
};

function sumTicketPrices(payload: TicketTailorOrderPayload): number {
  if (payload.issued_tickets?.length) {
    return payload.issued_tickets.reduce((sum, t) => sum + (t.price ? Number(t.price) : 0), 0);
  }
  return payload.total_price ? Number(payload.total_price) : 0;
}

export async function handleOrderEvent(payload: TicketTailorOrderPayload) {
  const buyerEmail = payload.buyer_details?.email?.trim() ?? "";
  const buyerEmailNormalized = normalizeEmail(buyerEmail);
  const buyerName =
    [payload.buyer_details?.first_name, payload.buyer_details?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim() || "Unknown";

  const status = ORDER_STATUS_MAP[payload.status?.toLowerCase() ?? ""] ?? "CONFIRMED";
  const purchaseTimestamp = payload.created_at ? new Date(payload.created_at) : new Date();
  const ticketTailorUpdatedAt = payload.updated_at
    ? new Date(payload.updated_at)
    : purchaseTimestamp;

  const existingOrder = await db.order.findUnique({
    where: { ticketTailorOrderId: payload.id },
  });

  // Guard against out-of-order webhook delivery regressing state.
  if (existingOrder && existingOrder.ticketTailorUpdatedAt > ticketTailorUpdatedAt) {
    return;
  }

  let creatorId = existingOrder?.creatorId ?? null;
  let attributionSource = existingOrder?.attributionSource ?? "DIRECT";
  let attributionCodeCaptured = existingOrder?.attributionCodeCaptured ?? null;

  // Attribution is resolved once, at first creation — an ORDER.UPDATED
  // webhook (e.g. a refund) must not re-run this and potentially flip
  // creatorId out from under an already-attributed sale.
  if (!existingOrder) {
    const metadata = payload.metadata ?? {};
    const metaRefCode = metadata["meta_ref_code"]?.trim().toUpperCase();

    if (metaRefCode) {
      const creator = await db.creator.findFirst({
        where: { referralCode: metaRefCode, status: "ACTIVE" },
      });
      if (creator) {
        creatorId = creator.id;
        attributionSource = "CHECKOUT_METADATA_MATCH";
        attributionCodeCaptured = metaRefCode;
      }
    }

    if (!creatorId && buyerEmailNormalized) {
      const lead = await db.lead.findUnique({ where: { emailNormalized: buyerEmailNormalized } });
      if (lead?.creatorId) {
        creatorId = lead.creatorId;
        attributionSource = "LEAD_EMAIL_MATCH";
      }
    }

    // Fallback for a buyer who signed up under one email (or one their
    // creator captured) but checks out with a different one — e.g. a
    // checkout link sent through a nurture sequence. Only trusted when
    // every matching lead with a phone match agrees on the same creator;
    // a phone shared across conflicting leads is left unattributed rather
    // than guessed, same policy as everywhere else in this system.
    if (!creatorId && payload.buyer_details?.phone) {
      const buyerPhoneNormalized = normalizePhone(payload.buyer_details.phone);
      if (buyerPhoneNormalized) {
        const leads = await db.lead.findMany({
          where: { phoneNormalized: buyerPhoneNormalized, creatorId: { not: null } },
        });
        const distinctCreatorIds = new Set(leads.map((l) => l.creatorId));
        if (distinctCreatorIds.size === 1) {
          creatorId = leads[0].creatorId;
          attributionSource = "LEAD_PHONE_MATCH";
        }
      }
    }
  }

  const order = await db.order.upsert({
    where: { ticketTailorOrderId: payload.id },
    update: {
      buyerEmail,
      buyerEmailNormalized,
      buyerName,
      buyerPhone: payload.buyer_details?.phone?.trim() || null,
      currency: payload.currency ?? "USD",
      ticketRevenue: sumTicketPrices(payload),
      status,
      ticketTailorUpdatedAt,
    },
    create: {
      ticketTailorOrderId: payload.id,
      buyerEmail,
      buyerEmailNormalized,
      buyerName,
      buyerPhone: payload.buyer_details?.phone?.trim() || null,
      creatorId,
      attributionSource,
      attributionCodeCaptured,
      currency: payload.currency ?? "USD",
      ticketRevenue: sumTicketPrices(payload),
      status,
      purchaseTimestamp,
      ticketTailorUpdatedAt,
    },
  });

  if (payload.issued_tickets?.length) {
    for (const ticket of payload.issued_tickets) {
      await upsertIssuedTicket(order.id, ticket);
    }
  }

  if (order.creatorId) {
    await recomputeCreatorStats(order.creatorId);
  }
}
