type LeaderboardEntry = {
  rank: number;
  name: string;
  value: string;
};

export function Leaderboard({ title, entries }: { title: string; entries: LeaderboardEntry[] }) {
  return (
    <div className="rounded-2xl border border-bone/10 bg-charcoal/40 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">{title}</p>
      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-bone/40">No data yet.</p>
      ) : (
        <ol className="mt-4 flex flex-col gap-1">
          {entries.map((entry) => (
            <li
              key={entry.rank}
              className="flex items-center justify-between border-b border-bone/5 py-2 text-sm last:border-0"
            >
              <span className="flex items-center gap-3">
                <span className="font-display text-ember">{entry.rank}.</span>
                <span className="text-bone">{entry.name}</span>
              </span>
              <span className="text-bone/60">{entry.value}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
