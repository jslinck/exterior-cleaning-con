import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { SIGNATURE_HEADER, verifyTicketTailorSignature } from "@/lib/webhooks/verifySignature";
import { handleOrderEvent } from "@/lib/webhooks/handlers/order";
import { handleIssuedTicketEvent } from "@/lib/webhooks/handlers/issuedTicket";
import type { WebhookEnvelope, TicketTailorOrderPayload, TicketTailorIssuedTicketPayload } from "@/lib/webhooks/types";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const secret = process.env.TICKET_TAILOR_WEBHOOK_SECRET;

  if (!secret) {
    console.error("[ticket-tailor webhook] TICKET_TAILOR_WEBHOOK_SECRET is not configured.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signatureHeader = request.headers.get(SIGNATURE_HEADER);
  const verification = verifyTicketTailorSignature(rawBody, signatureHeader, secret);

  if (!verification.valid) {
    console.warn("[ticket-tailor webhook] rejected:", verification.reason);
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let envelope: WebhookEnvelope;
  try {
    envelope = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!envelope.id || !envelope.event) {
    return NextResponse.json({ error: "Malformed webhook envelope." }, { status: 400 });
  }

  // Idempotency gate: a true duplicate delivery is detected and
  // short-circuited here, before touching any other table.
  let webhookEvent;
  try {
    webhookEvent = await db.webhookEvent.create({
      data: {
        ticketTailorEventId: envelope.id,
        eventType: envelope.event,
        payload: envelope.payload as Prisma.InputJsonValue,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const existing = await db.webhookEvent.findUnique({
        where: { ticketTailorEventId: envelope.id },
      });
      if (existing?.processedAt) {
        // Already fully processed — true duplicate, no-op.
        return NextResponse.json({ ok: true, duplicate: true });
      }
      webhookEvent = existing!;
    } else {
      throw err;
    }
  }

  try {
    const eventType = envelope.event.toUpperCase();

    if (eventType === "ORDER.CREATED" || eventType === "ORDER.UPDATED") {
      await handleOrderEvent(envelope.payload as TicketTailorOrderPayload);
    } else if (eventType === "ISSUED_TICKET.CREATED" || eventType === "ISSUED_TICKET.UPDATED") {
      await handleIssuedTicketEvent(envelope.payload as TicketTailorIssuedTicketPayload);
    } else {
      console.warn(`[ticket-tailor webhook] unhandled event type: ${envelope.event}`);
    }

    await db.webhookEvent.update({
      where: { id: webhookEvent.id },
      data: { processedAt: new Date() },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error.";
    await db.webhookEvent.update({
      where: { id: webhookEvent.id },
      data: { processingError: message },
    });
    console.error("[ticket-tailor webhook] processing failed:", message);
    return NextResponse.json({ error: "Processing failed." }, { status: 500 });
  }
}
