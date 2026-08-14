-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "consentCapturedAt" TIMESTAMP(3),
ADD COLUMN     "smsPromotionalConsent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "smsTransactionalConsent" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "phone" DROP NOT NULL;
