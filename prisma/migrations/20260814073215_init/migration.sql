-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CREATOR');

-- CreateEnum
CREATE TYPE "CreatorStatus" AS ENUM ('ACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('CREATOR', 'DIRECT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CONFIRMED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "AttributionSource" AS ENUM ('CHECKOUT_METADATA_MATCH', 'LEAD_EMAIL_MATCH', 'DIRECT');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('ISSUED', 'VOIDED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "CommissionStatus" AS ENUM ('PENDING', 'EARNED', 'APPROVED', 'PAID', 'FORFEITED');

-- CreateEnum
CREATE TYPE "RewardTier" AS ENUM ('NONE', 'GA', 'VIP');

-- CreateEnum
CREATE TYPE "RewardStatus" AS ENUM ('UNCLAIMED', 'CLAIMED', 'ISSUED');

-- CreateEnum
CREATE TYPE "AuditEventType" AS ENUM ('LEAD_ATTRIBUTION_OVERRIDDEN', 'ORDER_ATTRIBUTION_OVERRIDDEN', 'COMMISSION_STATUS_CHANGED', 'COMMISSION_AMOUNT_DRIFT_DETECTED', 'REWARD_STATUS_CHANGED', 'CREATOR_CREATED', 'CREATOR_UPDATED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "creatorId" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagram" TEXT,
    "referralCode" TEXT NOT NULL,
    "status" "CreatorStatus" NOT NULL DEFAULT 'ACTIVE',
    "participationConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailNormalized" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "revenue" TEXT,
    "learn" TEXT,
    "creatorId" TEXT,
    "referralCodeCaptured" TEXT,
    "source" "LeadSource" NOT NULL DEFAULT 'DIRECT',
    "attributionOverriddenAt" TIMESTAMP(3),
    "attributionOverriddenBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorAttribution" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "creatorId" TEXT,
    "referralCode" TEXT NOT NULL,
    "firstTouchAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorAttribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketTypeConfig" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "capacity" INTEGER,
    "ticketTailorTicketTypeId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketTypeConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionTier" (
    "id" TEXT NOT NULL,
    "minTickets" INTEGER NOT NULL,
    "maxTickets" INTEGER,
    "percentage" DECIMAL(5,2) NOT NULL,
    "label" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "ticketTailorOrderId" TEXT NOT NULL,
    "buyerEmail" TEXT NOT NULL,
    "buyerEmailNormalized" TEXT NOT NULL,
    "buyerName" TEXT NOT NULL,
    "buyerPhone" TEXT,
    "creatorId" TEXT,
    "attributionSource" "AttributionSource" NOT NULL DEFAULT 'DIRECT',
    "attributionCodeCaptured" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "ticketRevenue" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "fees" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "status" "OrderStatus" NOT NULL DEFAULT 'CONFIRMED',
    "purchaseTimestamp" TIMESTAMP(3) NOT NULL,
    "ticketTailorUpdatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "ticketTailorTicketId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "ticketTypeConfigId" TEXT,
    "ticketTailorTicketTypeId" TEXT NOT NULL,
    "holderName" TEXT,
    "holderEmail" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'ISSUED',
    "issuedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionRecord" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "ticketsCounted" INTEGER NOT NULL DEFAULT 0,
    "attributableRevenue" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "tierPercentage" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "matchedTierId" TEXT,
    "commissionAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "status" "CommissionStatus" NOT NULL DEFAULT 'PENDING',
    "paidAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "paidAt" TIMESTAMP(3),
    "paidNote" TEXT,
    "lastRecalculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatorReward" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "unlockedTier" "RewardTier" NOT NULL DEFAULT 'NONE',
    "status" "RewardStatus" NOT NULL DEFAULT 'UNCLAIMED',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreatorReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookEvent" (
    "id" TEXT NOT NULL,
    "ticketTailorEventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "processingError" TEXT,

    CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "type" "AuditEventType" NOT NULL,
    "actorUserId" TEXT,
    "leadId" TEXT,
    "orderId" TEXT,
    "creatorId" TEXT,
    "previousValue" JSONB,
    "newValue" JSONB,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_creatorId_key" ON "User"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_email_key" ON "Creator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_referralCode_key" ON "Creator"("referralCode");

-- CreateIndex
CREATE INDEX "Creator_status_idx" ON "Creator"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_emailNormalized_key" ON "Lead"("emailNormalized");

-- CreateIndex
CREATE INDEX "Lead_creatorId_idx" ON "Lead"("creatorId");

-- CreateIndex
CREATE INDEX "Lead_source_idx" ON "Lead"("source");

-- CreateIndex
CREATE UNIQUE INDEX "VisitorAttribution_visitorId_key" ON "VisitorAttribution"("visitorId");

-- CreateIndex
CREATE INDEX "VisitorAttribution_creatorId_idx" ON "VisitorAttribution"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "TicketTypeConfig_key_key" ON "TicketTypeConfig"("key");

-- CreateIndex
CREATE UNIQUE INDEX "TicketTypeConfig_ticketTailorTicketTypeId_key" ON "TicketTypeConfig"("ticketTailorTicketTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "CommissionTier_minTickets_key" ON "CommissionTier"("minTickets");

-- CreateIndex
CREATE UNIQUE INDEX "Order_ticketTailorOrderId_key" ON "Order"("ticketTailorOrderId");

-- CreateIndex
CREATE INDEX "Order_creatorId_idx" ON "Order"("creatorId");

-- CreateIndex
CREATE INDEX "Order_buyerEmailNormalized_idx" ON "Order"("buyerEmailNormalized");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticketTailorTicketId_key" ON "Ticket"("ticketTailorTicketId");

-- CreateIndex
CREATE INDEX "Ticket_orderId_idx" ON "Ticket"("orderId");

-- CreateIndex
CREATE INDEX "Ticket_status_idx" ON "Ticket"("status");

-- CreateIndex
CREATE INDEX "Ticket_ticketTypeConfigId_idx" ON "Ticket"("ticketTypeConfigId");

-- CreateIndex
CREATE UNIQUE INDEX "CommissionRecord_creatorId_key" ON "CommissionRecord"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "CreatorReward_creatorId_key" ON "CreatorReward"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "WebhookEvent_ticketTailorEventId_key" ON "WebhookEvent"("ticketTailorEventId");

-- CreateIndex
CREATE INDEX "WebhookEvent_eventType_idx" ON "WebhookEvent"("eventType");

-- CreateIndex
CREATE INDEX "AuditLog_type_idx" ON "AuditLog"("type");

-- CreateIndex
CREATE INDEX "AuditLog_creatorId_idx" ON "AuditLog"("creatorId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitorAttribution" ADD CONSTRAINT "VisitorAttribution_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_ticketTypeConfigId_fkey" FOREIGN KEY ("ticketTypeConfigId") REFERENCES "TicketTypeConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionRecord" ADD CONSTRAINT "CommissionRecord_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatorReward" ADD CONSTRAINT "CreatorReward_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
