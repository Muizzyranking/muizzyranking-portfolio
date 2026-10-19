"use client";

import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import DocSection from "@/components/ui/DocSection";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import type { Experience } from "@/types";

const HIGHLIGHT_LIMIT = 5;
const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"];

function periodRange(exp: Experience) {
  return `${exp.period.start} — ${exp.period.end}`;
}

function Detail({ exp }: { exp: Experience }) {
  const highlights = exp.highlights.slice(0, HIGHLIGHT_LIMIT);

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <h3 className="font-display text-[clamp(1.4rem,2.6vw,1.8rem)] leading-[1.25] tracking-[-0.02em] font-semibold text-text-primary">
          {exp.role}
        </h3>
        <p className="font-mono text-[0.74rem] text-text-muted">
          {periodRange(exp)} · {exp.type.toLowerCase()}
        </p>
      </div>

      <p className="mt-5 max-w-[68ch] text-[1.02rem] leading-[1.75] text-text-secondary">{exp.summary}</p>

      {highlights.length > 0 && (
        <ol className="mt-7 flex flex-col gap-3.5">
          {highlights.map((h, i) => (
            <li key={h.slice(0, 48)} className="grid grid-cols-[2rem_minmax(0,1fr)] items-baseline">
              <span className="font-mono text-[0.72rem] text-accent" aria-hidden="true">
                {ROMAN[i]}.
              </span>
              <p className="max-w-[70ch] text-[0.98rem] leading-[1.7] text-text-secondary">{h}</p>
            </li>
          ))}
        </ol>
      )}

      {exp.stack.length > 0 && <p className="meta-line mt-7">{exp.stack.join(" · ")}</p>}
    </div>
  );
}

export default function ExperienceSection({ exp }: { exp: Experience[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = exp[active] ?? exp[0];

  const from = reduce ? {} : { y: 12 };

  if (!current) return null;

  return (
    <DocSection title="Places I've worked.">
      <div ref={ref} className="grid gap-x-10 gap-y-8 md:grid-cols-[13rem_minmax(0,1fr)]">
        {/* Company selector — vertical on desktop, scrollable row on mobile */}
        <div
          role="tablist"
          aria-label="Companies"
          className="flex items-start gap-5 max-md:overflow-x-auto md:flex-col md:gap-1.5 md:border-r md:border-border-subtle md:pr-6"
        >
          {exp.map((e, i) => {
            const selected = i === active;
            return (
              <button
                key={e.company}
                type="button"
                role="tab"
                id={`exp-tab-${i}`}
                aria-selected={selected}
                aria-controls="exp-panel"
                onClick={() => setActive(i)}
                className="group relative shrink-0 py-2 text-left font-mono text-[0.88rem] lowercase transition-colors duration-150"
                style={{ color: selected ? "var(--color-accent)" : "var(--color-text-muted)" }}
              >
                {selected && (
                  <m.span
                    layoutId="exp-tick"
                    className="absolute top-1/2 hidden h-[0.9rem] w-px -translate-y-1/2 -left-4 bg-accent md:block"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
                <span className="block transition-colors duration-150 group-hover:text-text-primary">{e.company.replace(" (HNG)", "")}</span>
              </button>
            );
          })}
        </div>

        {/* Detail panel — swaps with a crossfade + rise; `layout` keeps the
            container height change continuous while content of different
            length slides in */}
        <div className="min-w-0 md:pl-3">
          <div id="exp-panel" role="tabpanel" aria-labelledby={`exp-tab-${active}`}>
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={current.company}
                layout
                initial={{ opacity: 0, ...from }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.28, ease: EASE, layout: { type: "spring", stiffness: 300, damping: 34 } }}
              >
                <Detail exp={current} />
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DocSection>
  );
}
