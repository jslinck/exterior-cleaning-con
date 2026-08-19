const TONE_CLASSES = {
  neutral: "border-bone/20 bg-bone/5 text-bone/60",
  ember: "border-ember/30 bg-ember/10 text-ember",
  success: "border-green-500/30 bg-green-500/10 text-green-400",
  warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  danger: "border-red-500/30 bg-red-500/10 text-red-400",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: string;
  tone?: keyof typeof TONE_CLASSES;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
