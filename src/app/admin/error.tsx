"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin]", error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">Something went wrong</p>
      <h1 className="mt-3 max-w-lg font-display text-2xl text-bone sm:text-3xl">
        {error.message || "An unexpected error occurred."}
      </h1>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset} size="md">
          Try Again
        </Button>
        <Button href="/admin" size="md" variant="secondary">
          Back to Overview
        </Button>
      </div>
    </Container>
  );
}
