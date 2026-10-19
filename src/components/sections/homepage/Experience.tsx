"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/sections/homepage/SectionHeader";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import type { Experience } from "@/types";

function formatPeriod(start: string, end: string) {
  return `${start} to ${end === "present" ? "Present" : end}`;
}

function ExperienceEntry({ exp }: { exp: Experience }) {
  return (
    <div className="py-7 first:pt-0 last:pb-0 border-b border-border-subtle last:border-0">
      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
        <h3 className="font-display font-semibold tracking-[-0.01em] leading-[1.3] text-text-primary text-[1.25rem]">{exp.company}</h3>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-muted">{exp.type}</span>
      </div>

      <p className="font-mono text-[0.78rem] tracking-[0.06em] text-text-muted mb-4">
        {exp.role}
        <span aria-hidden="true"> · </span>
        {formatPeriod(exp.period.start, exp.period.end)}
      </p>

      <p className="text-text-secondary text-[0.98rem] leading-[1.7] max-w-[72ch] mb-4">{exp.summary}</p>

      {exp.highlights.length > 0 && (
        <ul className="flex flex-col gap-2 mb-4">
          {exp.highlights.slice(0, 4).map((h) => (
            <li key={h.slice(0, 48)} className="text-text-secondary text-[0.95rem] leading-[1.65] pl-5 relative max-w-[76ch]">
              <span className="absolute left-0 top-[0.5rem] text-accent font-mono text-[0.85rem]" aria-hidden="true">
                →
              </span>
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5">
        {exp.stack.map((s) => (
          <span key={s} className="font-mono text-[0.72rem] text-text-muted bg-surface border border-border-subtle rounded-sm px-2 py-[0.2rem]">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection({ exp }: { exp: Experience[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <section ref={ref} className="section section-band">
      <div className="container-main">
        <SectionHeader eyebrow="Career" title="Where I've done this." />

        <m.div
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
        >
          {exp.map((e) => (
            <ExperienceEntry key={e.company} exp={e} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
