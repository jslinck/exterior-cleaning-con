// Sign and POST a fixture webhook payload to the local ticket-tailor
// webhook endpoint, exactly as Ticket Tailor itself would deliver it.
//
// Usage:
//   npm run webhook:send -- prisma/fixtures/order-created-direct.json
//   npm run webhook:send -- prisma/fixtures/order-created-direct.json --new-event
//   npm run webhook:send -- prisma/fixtures/order-created-direct.json --new-order
//
// No flags: sends the fixture byte-for-byte, including its envelope id —
// running the same command twice in a row is a real duplicate-delivery
// test (should be a no-op the second time).
//
// --new-event: keeps the same order/ticket ids but assigns a fresh
// envelope id — simulates a second, legitimately distinct webhook about
// the same order (e.g. ORDER.UPDATED after ORDER.CREATED).
//
// --new-order: assigns fresh envelope, order, and ticket ids throughout —
// simulates a brand new, unrelated order. Use this to generate many
// distinct orders for the same creator (commission tier boundary testing).
import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { sendWebhook } from "./lib/ticketTailorSign";

type Envelope = {
  id: string;
  created_at: string;
  event: string;
  resource_url: string;
  payload: {
    id: string;
    order_id?: string;
    issued_tickets?: { id: string; order_id?: string }[];
  };
};

function main() {
  const [fixturePath, ...flags] = process.argv.slice(2);
  if (!fixturePath) {
    console.error("Usage: tsx scripts/send-webhook.ts <fixture-path> [--new-event | --new-order]");
    process.exit(1);
  }

  const envelope: Envelope = JSON.parse(readFileSync(fixturePath, "utf-8"));

  if (flags.includes("--new-event") || flags.includes("--new-order")) {
    envelope.id = randomUUID();
    envelope.created_at = new Date().toISOString();
  }

  if (flags.includes("--new-order")) {
    const newOrderId = randomUUID();
    envelope.payload.id = newOrderId;
    if (envelope.payload.order_id) envelope.payload.order_id = newOrderId;
    for (const ticket of envelope.payload.issued_tickets ?? []) {
      ticket.id = randomUUID();
      if (ticket.order_id) ticket.order_id = newOrderId;
    }
  }

  sendWebhook(envelope).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

main();
