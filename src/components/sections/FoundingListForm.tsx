"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ctas, foundingList } from "@/data/event";
import type { FoundingListSubmission } from "@/app/api/founding-list/route";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-bone/20 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/30 transition-colors";

const labelClasses = "text-xs font-semibold uppercase tracking-[0.2em] text-bone/60";

export function FoundingListForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload: FoundingListSubmission = {
      firstName: String(data.get("firstName") || ""),
      lastName: String(data.get("lastName") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || "") || undefined,
      instagram: String(data.get("instagram") || ""),
      company: String(data.get("company") || ""),
      revenue: String(data.get("revenue") || "") || undefined,
      learn: String(data.get("learn") || "") || undefined,
      smsPromotionalConsent: data.get("smsPromotionalConsent") === "on",
    };

    try {
      const res = await fetch("/api/founding-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section
      id="founding-list"
      className="relative overflow-hidden bg-gradient-to-b from-charcoal to-ink py-24 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/3 rounded-full bg-ember/20 blur-[130px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>{foundingList.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] text-bone sm:text-5xl md:text-6xl">
              {foundingList.headline}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone/70">
              {foundingList.body}
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {foundingList.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-bone/80">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember/15 text-ember"
                  >
                    ✓
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-bone/10 bg-ink/60 p-6 backdrop-blur-sm sm:p-8">
            {status === "success" ? (
              <div
                role="status"
                className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember/15 text-2xl text-ember">
                  ✓
                </span>
                <h3 className="font-display text-2xl text-bone sm:text-3xl">
                  You&apos;re on the list.
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-bone/60">
                  You&apos;ll be first to know when founding tickets and speaker
                  announcements go live. Keep an eye on your inbox and Instagram
                  DMs.
                </p>
                <Button variant="secondary" onClick={() => setStatus("idle")}>
                  Submit another response
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <h3 className="font-display text-2xl text-bone">
                  {ctas.finalCta}
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className={labelClasses}>
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      className={inputClasses}
                      placeholder="Jordan"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className={labelClasses}>
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      className={inputClasses}
                      placeholder="Rivera"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
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
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className={labelClasses}>
                      Phone{" "}
                      <span className="normal-case tracking-normal text-bone/30">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClasses}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="instagram" className={labelClasses}>
                      Instagram handle
                    </label>
                    <input
                      id="instagram"
                      name="instagram"
                      type="text"
                      required
                      autoComplete="off"
                      className={inputClasses}
                      placeholder="@yourbusiness"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className={labelClasses}>
                      Company name
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      autoComplete="organization"
                      className={inputClasses}
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="revenue" className={labelClasses}>
                    Approximate annual revenue{" "}
                    <span className="normal-case tracking-normal text-bone/30">(optional)</span>
                  </label>
                  <select
                    id="revenue"
                    name="revenue"
                    defaultValue=""
                    className={`${inputClasses} appearance-none`}
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    <option value="under-100k">Under $100K</option>
                    <option value="100k-250k">$100K – $250K</option>
                    <option value="250k-500k">$250K – $500K</option>
                    <option value="500k-1m">$500K – $1M</option>
                    <option value="1m-plus">$1M+</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="learn" className={labelClasses}>
                    What would you most want to learn?{" "}
                    <span className="normal-case tracking-normal text-bone/30">(optional)</span>
                  </label>
                  <textarea
                    id="learn"
                    name="learn"
                    rows={3}
                    className={`${inputClasses} resize-none`}
                    placeholder="Meta ads, hiring, recurring revenue..."
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex items-start gap-3 text-xs leading-relaxed text-bone/50">
                    <input
                      type="checkbox"
                      name="smsPromotionalConsent"
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-bone/30 bg-ink accent-ember"
                    />
                    By checking this box, I consent to receive promotional SMS messages from
                    EXTERIOR CON, including special offers, service updates, seasonal promotions,
                    and company announcements. Message frequency may vary. Message and data rates
                    may apply. Reply STOP to opt out or HELP for help.
                  </label>
                </div>

                {status === "error" && error && (
                  <p role="alert" className="text-sm text-ember-light">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="mt-2 w-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Submitting…" : ctas.finalCta}
                </Button>

                <p className="text-center text-[11px] text-bone/30">
                  No spam. Just founding access and announcements.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
