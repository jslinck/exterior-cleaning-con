// Brand marks for EXTERIOR CON, built in code to match the reference
// moodboard (angular "EC" monogram + orange accent, "EXTERIOR CON"
// wordmark with an orange underline). These are CSS/SVG approximations,
// not a trace of a supplied logo file — swap in real brand assets here
// if/when final logo files exist.

export function Mark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-lg bg-charcoal ${className}`}
    >
      <span className="relative -translate-x-[0.04em] skew-x-[-10deg] font-display text-[0.5em] leading-none text-bone">
        EC
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-[22%] right-[20%] h-[0.09em] w-[0.34em] -skew-x-[10deg] bg-ember"
      />
    </span>
  );
}

export function Wordmark({
  className = "",
  align = "start",
}: {
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <span
      className={`inline-flex flex-col leading-none ${
        align === "center" ? "items-center" : "items-start"
      } ${className}`}
    >
      <span className="font-display tracking-wide text-bone">EXTERIOR</span>
      <span className="mt-[0.2em] flex items-center gap-[0.35em]">
        <span className="font-display text-[0.42em] tracking-[0.4em] text-bone/90">
          CON
        </span>
        <span className="h-[0.1em] w-[1.6em] bg-ember" aria-hidden="true" />
      </span>
    </span>
  );
}

export function Lockup({
  className = "",
  markClassName = "h-10 w-10 text-2xl",
  wordmarkClassName = "text-xl",
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark className={markClassName} />
      <Wordmark className={wordmarkClassName} />
    </span>
  );
}
