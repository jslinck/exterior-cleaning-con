export function Eyebrow({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-ember ${className}`}
    >
      <span className="h-px w-8 bg-ember" aria-hidden="true" />
      {children}
    </div>
  );
}
