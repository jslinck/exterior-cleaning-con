"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Logo";

const inputClasses =
  "w-full rounded-lg border border-bone/20 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30 transition-colors";

const labelClasses = "text-xs font-semibold uppercase tracking-[0.2em] text-bone/60";

function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") || "");
    const confirmPassword = String(data.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setStatus("idle");
      setError("Passwords don't match.");
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="mt-8 w-full rounded-2xl border border-bone/10 bg-charcoal/40 p-6 text-center text-sm text-bone/70 sm:p-8"
      >
        Password updated — redirecting you to login…
      </div>
    );
  }

  if (!token) {
    return (
      <div className="mt-8 w-full rounded-2xl border border-bone/10 bg-charcoal/40 p-6 text-center text-sm text-bone/70 sm:p-8">
        This link is missing its token.{" "}
        <a href="/forgot-password" className="text-ember hover:underline">
          Request a new one
        </a>
        .
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex w-full flex-col gap-5 rounded-2xl border border-bone/10 bg-charcoal/40 p-6 sm:p-8"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className={labelClasses}>
          New Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClasses}
          placeholder="At least 8 characters"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className={labelClasses}>
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClasses}
          placeholder="Re-enter password"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-ember-light">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Saving…" : "Set Password"}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <Container className="flex max-w-md flex-col items-center">
        <Mark className="h-12 w-auto" />
        <h1 className="mt-8 font-display text-3xl text-bone">Set a New Password</h1>

        <Suspense fallback={<p className="mt-8 text-sm text-bone/50">Loading…</p>}>
          <ResetPasswordForm />
        </Suspense>
      </Container>
    </main>
  );
}
