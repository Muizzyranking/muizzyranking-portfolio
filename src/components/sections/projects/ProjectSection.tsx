import type { ReactNode } from "react";

export default function ProjectSection({ index, label, children }: { index?: string; label: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section className="py-[clamp(2.75rem,5.5vw,4.25rem)]">
      <div className="flex items-baseline gap-4 mb-7">
        {index && <span className="font-mono text-[0.75rem] font-semibold tracking-[0.12em] text-accent">{index}</span>}
        <h2 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-tight font-bold tracking-[-0.02em] text-text-primary">{label}</h2>
        <div className="mb-1.5 flex-1 self-center h-px bg-border-subtle" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}
