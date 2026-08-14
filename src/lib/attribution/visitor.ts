import "server-only";
import { cookies } from "next/headers";
import { VISITOR_COOKIE } from "@/lib/attribution/constants";

export async function getVisitorId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(VISITOR_COOKIE)?.value ?? null;
}
