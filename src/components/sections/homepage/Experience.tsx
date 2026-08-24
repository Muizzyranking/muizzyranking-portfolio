"use client";

import { m, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/sections/homepage/SectionHeader";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import type { Experience } from "@/types";

function formatPeriod(start: string, end: string) {
  return `${start} — ${end === "present" ? "Present" : end}`;
}

function ExperienceEntry({ exp, index }: { exp: Experience; index: number }) {
  const reduce = useReducedMotion();

  return (
    <m.li
      initial={{ opacity: 0, y: reduce ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={SCROLL_REVEAL}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.06 }}
      className="grid gap-x-10 gap-y-3 border-b border-border-subtle py-8 last:border-0 md:grid-cols-[15rem_minmax(0,1fr)]"
    >
      <div>
        <h3 className="font-display text-[1.2rem] leading-[1.3] font-semibold tracking-[-0.01em] text-text-primary">{exp.company}</h3>
        <p className="mt-1 font-mono text-[0.72rem] tracking-[0.06em] text-text-muted">{exp.role}</p>
        <p className="mt-1 font-mono text-[0.68rem] tracking-[0.06em] text-text-muted/80 uppercase">
          {formatPeriod(exp.period.start, exp.period.end)} · {exp.type}
        </p>
      </div>

      <div className="min-w-0">
        <p className="max-w-[70ch] text-[0.98rem] leading-[1.7] text-text-secondary">{exp.summary}</p>

        {exp.highlights.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2">
            {exp.highlights.slice(0, 3).map((h) => (
              <li key={h.slice(0, 48)} className="relative max-w-[74ch] pl-5 text-[0.92rem] leading-[1.6] text-text-secondary">
                <span className="absolute top-[0.55em] left-0 block h-px w-3 bg-accent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {exp.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </div>
    </m.li>
  );
}

export default function ExperienceSection({ exp }: { exp: Experience[] }) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="section section-band">
      <div className="container-main">
        <SectionHeader eyebrow="Career" title="Where I've done it." />
        <ul className="border-t border-border-subtle">
          {exp.map((e, i) => (
            <ExperienceEntry key={e.company} exp={e} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
