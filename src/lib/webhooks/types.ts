// Ticket Tailor webhook payload shapes.
//
// CONFIRMED against Ticket Tailor's public docs: the outer envelope
// ({ id, created_at, event, resource_url, payload }) and the signature
// scheme (see verifySignature.ts).
//
// NOT independently confirmed (their API reference pages are a JS-rendered
// SPA that couldn't be fetched as static docs from this sandbox): the
// exact field names inside `payload` for an order/issued-ticket resource.
// The shapes below are a reasonable best guess based on common REST
// ticketing-API conventions. TREAT AS A MAPPING LAYER TO ADJUST, not as
// verified fact — before going live, trigger one real test webhook from
// the Ticket Tailor dashboard (Webhooks settings has a "send test event"
// action) and confirm/adjust the field paths read in
// src/lib/webhooks/handlers/order.ts and issuedTicket.ts against the
// actual payload received.

export type WebhookEnvelope = {
  id: string;
  created_at: string;
  event: string;
  resource_url: string;
  payload: unknown;
};

export type TicketTailorOrderPayload = {
  id: string;
  status?: string; // e.g. "confirmed" | "cancelled" | "refunded" | "part_refunded"
  total_price?: number | string;
  currency?: string;
  buyer_details?: {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  };
  metadata?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
  issued_tickets?: TicketTailorIssuedTicketPayload[];
};

export type TicketTailorIssuedTicketPayload = {
  id: string;
  order_id?: string;
  ticket_type_id?: string;
  price?: number | string;
  status?: string; // e.g. "issued" | "voided" | "refunded"
  holder_details?: {
    name?: string;
    email?: string;
  };
  issued_at?: string;
};
