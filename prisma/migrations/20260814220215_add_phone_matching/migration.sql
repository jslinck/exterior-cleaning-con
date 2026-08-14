-- AlterEnum
ALTER TYPE "AttributionSource" ADD VALUE 'LEAD_PHONE_MATCH';

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "phoneNormalized" TEXT;

-- CreateIndex
CREATE INDEX "Lead_phoneNormalized_idx" ON "Lead"("phoneNormalized");
