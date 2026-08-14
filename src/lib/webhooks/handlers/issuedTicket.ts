import "server-only";
import { db } from "@/lib/db";
import { recomputeCreatorStats } from "@/lib/commission/recompute";
import type { TicketTailorIssuedTicketPayload } from "@/lib/webhooks/types";

const TICKET_STATUS_MAP: Record<string, "ISSUED" | "VOIDED" | "REFUNDED"> = {
  issued: "ISSUED",
  active: "ISSUED",
  voided: "VOIDED",
  void: "VOIDED",
  cancelled: "VOIDED",
  refunded: "REFUNDED",
};

// Shared by both the ISSUED_TICKET.* webhook path and any tickets that
// arrive inline on an order payload. Upserts by ticketTailorTicketId so
// repeated delivery never creates duplicates.
export async function upsertIssuedTicket(
  orderId: string,
  payload: TicketTailorIssuedTicketPayload,
) {
  let ticketTypeConfigId: string | null = null;
  if (payload.ticket_type_id) {
    const config = await db.ticketTypeConfig.findUnique({
      where: { ticketTailorTicketTypeId: payload.ticket_type_id },
    });
    ticketTypeConfigId = config?.id ?? null;
  }

  const status = TICKET_STATUS_MAP[payload.status?.toLowerCase() ?? ""] ?? "ISSUED";

  await db.ticket.upsert({
    where: { ticketTailorTicketId: payload.id },
    update: {
      status,
      holderName: payload.holder_details?.name || null,
      holderEmail: payload.holder_details?.email || null,
      price: payload.price ? Number(payload.price) : 0,
    },
    create: {
      ticketTailorTicketId: payload.id,
      orderId,
      ticketTypeConfigId,
      ticketTailorTicketTypeId: payload.ticket_type_id ?? "unknown",
      holderName: payload.holder_details?.name || null,
      holderEmail: payload.holder_details?.email || null,
      price: payload.price ? Number(payload.price) : 0,
      status,
      issuedAt: payload.issued_at ? new Date(payload.issued_at) : new Date(),
    },
  });
}

export async function handleIssuedTicketEvent(payload: TicketTailorIssuedTicketPayload) {
  if (!payload.order_id) return;

  let order = await db.order.findUnique({ where: { ticketTailorOrderId: payload.order_id } });

  // Out-of-order delivery guard: a ticket webhook can arrive before the
  // order webhook. Create a minimal placeholder so the Ticket's required
  // FK is satisfiable — the eventual ORDER.CREATED/UPDATED webhook fills
  // in the real buyer details via upsert (it matches by
  // ticketTailorOrderId, so this becomes an update, not a duplicate).
  if (!order) {
    order = await db.order.create({
      data: {
        ticketTailorOrderId: payload.order_id,
        buyerEmail: "",
        buyerEmailNormalized: "",
        buyerName: "Pending order details",
        attributionSource: "DIRECT",
        ticketRevenue: 0,
        purchaseTimestamp: payload.issued_at ? new Date(payload.issued_at) : new Date(),
        ticketTailorUpdatedAt: new Date(0), // older than any real update, so a later real order webhook always wins
      },
    });
  }

  await upsertIssuedTicket(order.id, payload);

  if (order.creatorId) {
    await recomputeCreatorStats(order.creatorId);
  }
}
