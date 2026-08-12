// Brand marks for EXTERIOR CON, built in code to match the reference
// brand sheet (angular "EC" monogram with an orange accent flag, and the
// "EXTERIOR CON" wordmark with a skewed orange bar under EXTERIOR and
// wide-tracked CON). These are hand-built SVG/CSS recreations from
// reference images, not a trace of a supplied vector file — swap in real
// brand assets here if/when final logo files exist.

export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      aria-hidden="true"
    >
      <polygon points="36,0 166,0 150,40 20,40" fill="currentColor" />
      <polygon points="36,64 126,64 110,104 20,104" fill="currentColor" />
      <polygon points="20,0 36,0 36,104 20,104" fill="currentColor" />
      <path
        d="M 20,104
           C 18,175 45,225 110,228
           C 155,230 190,205 208,155
           L 168,158
           C 150,172 130,185 100,183
           C 60,180 42,150 40,104
           Z"
        fill="currentColor"
      />
      <polygon points="178,132 226,124 216,168 168,178" fill="var(--color-ember)" />
    </svg>
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
      <span className="font-display inline-block -skew-x-[8deg] text-bone">
        EXTERIOR
      </span>
      <span className="mt-[0.16em] flex items-center gap-[0.3em]">
        <span
          aria-hidden="true"
          className="h-[0.22em] w-[1.9em] bg-ember"
          style={{ clipPath: "polygon(3% 0,100% 0,97% 100%,0% 100%)" }}
        />
        <span className="font-display -skew-x-[8deg] text-[0.4em] tracking-[0.35em] text-bone">
          CON
        </span>
      </span>
    </span>
  );
}

export function Lockup({
  className = "",
  markClassName = "h-10 w-10 text-bone",
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
