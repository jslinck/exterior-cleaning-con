// Seeds the fixtures used by the manual test checklist (task #44): one
// active test creator and one lead already attributed to them (for the
// LEAD_EMAIL_MATCH fallback scenario). Safe to run repeatedly — upserts by
// unique keys, never duplicates.
//
// Usage: npm run test:seed
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const TEST_CREATOR = {
  name: "Test Creator",
  email: "test-creator@example.com",
  referralCode: "TESTCODE",
};

export const TEST_LEAD_EMAIL_MATCH = "lead-match@example.com";

async function main() {
  const creator = await db.creator.upsert({
    where: { email: TEST_CREATOR.email },
    update: { referralCode: TEST_CREATOR.referralCode, status: "ACTIVE" },
    create: {
      name: TEST_CREATOR.name,
      email: TEST_CREATOR.email,
      referralCode: TEST_CREATOR.referralCode,
      status: "ACTIVE",
    },
  });

  await db.lead.upsert({
    where: { emailNormalized: TEST_LEAD_EMAIL_MATCH },
    update: { creatorId: creator.id, source: "CREATOR", referralCodeCaptured: creator.referralCode },
    create: {
      firstName: "Lead",
      lastName: "Match",
      email: TEST_LEAD_EMAIL_MATCH,
      emailNormalized: TEST_LEAD_EMAIL_MATCH,
      phone: "555-0100",
      company: "Test Co",
      instagram: "@leadmatch",
      creatorId: creator.id,
      source: "CREATOR",
      referralCodeCaptured: creator.referralCode,
    },
  });

  console.log(`Test creator ready: ${creator.name} (${creator.referralCode}), id=${creator.id}`);
  console.log(`Test lead ready: ${TEST_LEAD_EMAIL_MATCH} → attributed to ${creator.referralCode}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
