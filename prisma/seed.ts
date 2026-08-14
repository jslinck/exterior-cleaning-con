import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth/password";
import { tickets } from "../src/data/tickets";

const db = new PrismaClient();

async function main() {
  console.log("Seeding ticket types...");
  for (const ticket of tickets) {
    await db.ticketTypeConfig.upsert({
      where: { key: ticket.id },
      update: {
        name: ticket.name,
        price: ticket.price,
        capacity: ticket.capacity ? Number(ticket.capacity) : null,
      },
      create: {
        key: ticket.id,
        name: ticket.name,
        price: ticket.price,
        capacity: ticket.capacity ? Number(ticket.capacity) : null,
      },
    });
  }

  console.log("Seeding commission tiers...");
  const tiers = [
    { minTickets: 1, maxTickets: 10, percentage: 15, label: "1–10 tickets" },
    { minTickets: 11, maxTickets: 20, percentage: 20, label: "11–20 tickets" },
    { minTickets: 21, maxTickets: null, percentage: 25, label: "21+ tickets" },
  ];
  for (const tier of tiers) {
    await db.commissionTier.upsert({
      where: { minTickets: tier.minTickets },
      update: { maxTickets: tier.maxTickets, percentage: tier.percentage, label: tier.label },
      create: tier,
    });
  }

  const adminEmail = process.env.ADMIN_BOOTSTRAP_EMAIL;
  const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;

  if (adminEmail && adminPassword) {
    console.log(`Seeding bootstrap admin (${adminEmail})...`);
    const passwordHash = await hashPassword(adminPassword);
    await db.user.upsert({
      where: { email: adminEmail.trim().toLowerCase() },
      update: {},
      create: {
        email: adminEmail.trim().toLowerCase(),
        passwordHash,
        role: "ADMIN",
      },
    });
  } else {
    console.warn(
      "ADMIN_BOOTSTRAP_EMAIL / ADMIN_BOOTSTRAP_PASSWORD not set — skipping admin bootstrap.",
    );
  }

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
