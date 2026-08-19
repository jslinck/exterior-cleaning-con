import { db } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { event } from "@/data/event";

export async function RegistrationGoal() {
  const registered = await db.lead.count();
  const goal = event.foundingListGoal;
  const percent = Math.min(100, Math.round((registered / goal) * 100));

  return (
    <section className="border-y border-bone/10 bg-charcoal/40 py-10">
      <Container className="flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">
          Founding List Goal
        </p>
        <p className="mt-2 font-display text-3xl text-bone sm:text-4xl">
          {registered.toLocaleString()} / {goal.toLocaleString()} founding members
        </p>
        <div
          className="mt-5 h-3 w-full max-w-xl overflow-hidden rounded-full bg-ink"
          role="progressbar"
          aria-valuenow={registered}
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-label={`${registered} of ${goal} founding list signups`}
        >
          <div
            className="h-full rounded-full bg-ember transition-[width]"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-bone/40">
          {goal - registered > 0
            ? `${(goal - registered).toLocaleString()} spots to go`
            : "Goal reached"}
        </p>
      </Container>
    </section>
  );
}
