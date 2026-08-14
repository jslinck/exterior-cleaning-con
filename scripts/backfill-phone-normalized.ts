// One-time backfill: computes phoneNormalized for every existing Lead row
// created before phone-matching existed. Safe to run more than once —
// it's idempotent (recomputes the same value every time).
//
// Usage: npm run backfill:phone
import { PrismaClient } from "@prisma/client";
import { normalizePhone } from "../src/lib/normalize";

const db = new PrismaClient();

async function main() {
  const leads = await db.lead.findMany({ select: { id: true, phone: true } });
  let updated = 0;

  for (const lead of leads) {
    const phoneNormalized = lead.phone ? normalizePhone(lead.phone) || null : null;
    await db.lead.update({ where: { id: lead.id }, data: { phoneNormalized } });
    updated++;
  }

  console.log(`Backfilled phoneNormalized on ${updated} lead(s).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
