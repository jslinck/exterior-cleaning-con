-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
