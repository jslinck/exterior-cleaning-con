import "server-only";
import { db } from "@/lib/db";
import { event } from "@/data/event";

// Sitewide founding-list progress toward the public goal — shown both on
// the homepage (public) and the creator dashboard (so creators can see
// how close the whole list is, not just their own numbers).
export async function getFoundingListGoalProgress() {
  const registered = await db.lead.count();
  const goal = event.foundingListGoal;
  const percent = Math.min(100, Math.round((registered / goal) * 100));
  return { registered, goal, percent };
}
