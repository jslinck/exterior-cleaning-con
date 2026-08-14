"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function CopyReferralLink({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — the input is
      // still selectable/readonly below as a manual fallback.
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        readOnly
        value={link}
        onFocus={(event) => event.currentTarget.select()}
        className="w-full rounded-lg border border-bone/20 bg-ink px-4 py-3 text-sm text-bone/80 focus:border-ember focus:outline-none"
      />
      <Button type="button" variant="secondary" onClick={handleCopy} className="shrink-0">
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
}
