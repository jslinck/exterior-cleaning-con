// Generates and sends N distinct single-ticket orders, all metadata-
// attributed to one referral code — used to drive a creator's ticket count
// across the commission tier boundaries (10→11 at 15%→20%, 20→21 at
// 20%→25%) for task #44's retroactive-tier test.
//
// Usage: npm run webhook:bulk -- --code=TESTCODE --count=21 --price=497
import { randomUUID } from "crypto";
import { sendWebhook } from "./lib/ticketTailorSign";

function arg(name: string, fallback: string) {
  const match = process.argv.find((a) => a.startsWith(`--${name}=`));
  return match ? match.split("=")[1] : fallback;
}

async function main() {
  const referralCode = arg("code", "TESTCODE");
  const count = Number(arg("count", "1"));
  const price = Number(arg("price", "497"));

  for (let i = 0; i < count; i++) {
    const orderId = randomUUID();
    const ticketId = randomUUID();
    const now = new Date().toISOString();

    const envelope = {
      id: randomUUID(),
      created_at: now,
      event: "order.created",
      resource_url: `https://api.tickettailor.com/v1/orders/${orderId}`,
      payload: {
        id: orderId,
        status: "confirmed",
        total_price: price,
        currency: "USD",
        buyer_details: {
          email: `bulk-buyer-${i}-${Date.now()}@example.com`,
          first_name: "Bulk",
          last_name: `Buyer${i}`,
        },
        metadata: { meta_ref_code: referralCode },
        created_at: now,
        updated_at: now,
        issued_tickets: [
          {
            id: ticketId,
            order_id: orderId,
            price,
            status: "issued",
            issued_at: now,
            holder_details: { name: `Bulk Buyer ${i}`, email: `bulk-buyer-${i}@example.com` },
          },
        ],
      },
    };

    await sendWebhook(envelope);
  }

  console.log(`Sent ${count} order(s) attributed to referral code ${referralCode}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
