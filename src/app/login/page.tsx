"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Mark } from "@/components/ui/Logo";

const inputClasses =
  "w-full rounded-lg border border-bone/20 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30 transition-colors";

const labelClasses = "text-xs font-semibold uppercase tracking-[0.2em] text-bone/60";

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") || ""),
          password: String(data.get("password") || ""),
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      router.push(body.role === "ADMIN" ? "/admin" : "/creator");
      router.refresh();
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <Container className="flex max-w-md flex-col items-center">
        <Mark className="h-12 w-auto" />
        <h1 className="mt-8 font-display text-3xl text-bone">Dashboard Login</h1>
        <p className="mt-2 text-center text-sm text-bone/50">
          For EXTERIOR CON creators and admins.
        </p>

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

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={labelClasses}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={inputClasses}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-ember-light">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Logging in…" : "Log In"}
          </Button>
        </form>
      </Container>
    </main>
  );
}
