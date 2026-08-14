import "server-only";
import { randomBytes, createHash } from "crypto";
import { db } from "@/lib/db";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

// Returns the raw token to put in the emailed link — only its hash is
// ever persisted, same rationale as password hashing: a DB leak alone
// can't be used to reset anyone's password.
export async function createResetToken(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  await db.user.update({
    where: { id: userId },
    data: {
      resetTokenHash: hashToken(token),
      resetTokenExpiresAt: new Date(Date.now() + TOKEN_TTL_MS),
    },
  });
  return token;
}

export async function verifyResetToken(token: string) {
  const user = await db.user.findUnique({ where: { resetTokenHash: hashToken(token) } });
  if (!user || !user.resetTokenExpiresAt || user.resetTokenExpiresAt.getTime() < Date.now()) {
    return null;
  }
  return user;
}

export async function consumeResetToken(userId: string) {
  await db.user.update({
    where: { id: userId },
    data: { resetTokenHash: null, resetTokenExpiresAt: null },
  });
}
