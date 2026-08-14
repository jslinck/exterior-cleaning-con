"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Logo";

const inputClasses =
  "w-full rounded-lg border border-bone/20 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30 transition-colors";

const labelClasses = "text-xs font-semibold uppercase tracking-[0.2em] text-bone/60";

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const data = new FormData(event.currentTarget);

    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: String(data.get("email") || "") }),
    }).catch(() => {});

    setStatus("sent");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <Container className="flex max-w-md flex-col items-center">
        <Mark className="h-12 w-auto" />
        <h1 className="mt-8 font-display text-3xl text-bone">Reset Password</h1>
        <p className="mt-2 text-center text-sm text-bone/50">
          Enter your email and we&apos;ll send you a link to set a new one.
        </p>

        {status === "sent" ? (
          <div
            role="status"
            className="mt-8 w-full rounded-2xl border border-bone/10 bg-charcoal/40 p-6 text-center text-sm text-bone/70 sm:p-8"
          >
            If that email has an account, a reset link is on its way — check your inbox.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex w-full flex-col gap-5 rounded-2xl border border-bone/10 bg-charcoal/40 p-6 sm:p-8"
            noValidate
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClasses}
                placeholder="you@exteriorcon.com"
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send Reset Link"}
            </Button>
          </form>
        )}

        <a href="/login" className="mt-6 text-sm text-bone/50 hover:text-ember">
          Back to login
        </a>
      </Container>
    </main>
  );
}
