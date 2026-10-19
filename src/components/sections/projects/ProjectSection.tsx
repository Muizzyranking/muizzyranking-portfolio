import type { ReactNode } from "react";

export default function ProjectSection({ index, label, icon, children }: { index?: string; label: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section className="border-t border-border-subtle py-[clamp(2.75rem,5.5vw,4.5rem)] first:border-t-0">
      <div className="flex items-center gap-3 mb-7">
        {icon && <span className="text-accent">{icon}</span>}
        {index && <span className="font-mono text-[0.7rem] font-semibold tracking-[0.08em] text-accent">{index}</span>}
        <h2 className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-text-primary">{label}</h2>
        <div className="flex-1 h-px bg-border-subtle" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}
