export function StatTile({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-bone/10 bg-charcoal/40 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">{label}</p>
      <p className="mt-2 font-display text-4xl text-bone">{value}</p>
      {sublabel && <p className="mt-1 text-xs text-bone/40">{sublabel}</p>}
    </div>
  );
}
