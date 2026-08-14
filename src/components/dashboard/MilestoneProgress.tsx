type MilestoneItem = {
  label: string;
  achieved: boolean;
};

export function MilestoneProgress({ items }: { items: MilestoneItem[] }) {
  return (
    <div className="rounded-2xl border border-bone/10 bg-charcoal/40 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">Milestones</p>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-sm">
            <span
              aria-hidden="true"
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                item.achieved ? "bg-ember/20 text-ember" : "border border-bone/20 text-bone/30"
              }`}
            >
              {item.achieved ? "✓" : "○"}
            </span>
            <span className={item.achieved ? "text-bone" : "text-bone/50"}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
