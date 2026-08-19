import { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-bone/10">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  );
}

export function Thead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-charcoal/60 text-xs font-semibold uppercase tracking-[0.15em] text-bone/50">
      {children}
    </thead>
  );
}

export function Tbody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-bone/5">{children}</tbody>;
}

export function Tr({ children }: { children: ReactNode }) {
  return <tr className="hover:bg-bone/[0.02]">{children}</tr>;
}

export function Th({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <th className={`px-3 py-3 font-semibold ${className}`}>{children}</th>;
}

export function Td({
  children,
  className = "",
  colSpan,
}: {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}) {
  return (
    <td colSpan={colSpan} className={`px-3 py-3 text-bone/80 ${className}`}>
      {children}
    </td>
  );
}
