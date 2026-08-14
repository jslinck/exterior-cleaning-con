"use client";

import { useEffect } from "react";
import { REF_LOCAL_STORAGE_KEY, REF_PENDING_COOKIE } from "@/lib/attribution/constants";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

// Mounted once in the root layout. Captures ?ref= (or the short-lived
// pending cookie proxy.ts mirrors it into) and reports it to
// /api/attribution, which does the actual first-touch-guarded database
// write. Also mirrors the resolved code to localStorage per the
// redundancy requirement — this is a convenience copy only, never the
// source of truth for anything that affects money.
export function AttributionCapture() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const referralCode = url.searchParams.get("ref") || getCookie(REF_PENDING_COOKIE);
    if (!referralCode) return;

    fetch("/api/attribution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referralCode }),
    })
      .then((res) => res.json())
      .then((data: { referralCode?: string }) => {
        if (data?.referralCode) {
          window.localStorage.setItem(REF_LOCAL_STORAGE_KEY, data.referralCode);
        }
      })
      .catch(() => {
        // Best-effort — the server-side VisitorAttribution row (once set)
        // remains the source of truth; a failed mirror here just means a
        // slightly stale localStorage copy, not lost attribution.
      });
  }, []);

  return null;
}
