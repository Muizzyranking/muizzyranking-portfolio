import type { ReactNode } from "react";

export default function ProjectSection({ index, label, children }: { index?: string; label: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section className="mt-14 border-t border-border-subtle pt-10 first:mt-0 first:border-t-0 first:pt-0">
      <div className="mb-7 flex items-baseline gap-4">
        {index && <span className="font-mono text-[0.78rem] font-semibold tracking-[0.12em] text-accent">{index}</span>}
        <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] leading-tight font-semibold tracking-[-0.015em] text-text-primary">{label}</h2>
      </div>
      {children}
    </section>
  );
}
