"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import DocSection from "@/components/ui/DocSection";
import { GenericTechGlyph, TECH_ICONS, TechGlyph } from "@/components/ui/icons";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import { STACK_GROUPS } from "@/lib/stack";

// ─── Left column copy — edit me ───
const SIDE = {
  title: "The tools I've worked with.",
  body: "A starting point, not the boundary. The problem determines the tool, and these are the ones I've used to solve problems so far.",
};

export default function Stack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <DocSection title="The working set.">
      <div ref={ref} className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(15rem,21rem)_minmax(0,1fr)]">
        {/* Left column — shorter, so it pins while the lists scroll */}
        <m.div
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.5, ease: EASE }}
          className="self-start lg:sticky lg:top-28"
        >
          <h3 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.25] tracking-[-0.02em] font-semibold text-text-primary">
            {SIDE.title}
          </h3>
          <p className="mt-3 max-w-[42ch] text-[0.96rem] leading-[1.7] text-text-secondary">{SIDE.body}</p>
        </m.div>

        {/* Right column — group title, then every tech as an icon + name row */}
        <div className="min-w-0 flex flex-col gap-9">
          {STACK_GROUPS.map((group, i) => (
            <m.div
              key={group.label}
              initial={{ opacity: 0, ...from }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.05 + 0.05 * i }}
            >
              <h4 className="font-mono text-[0.8rem] uppercase tracking-[0.16em] text-text-muted">{group.label}</h4>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {group.tags.map((tag) => {
                  const icon = tag.icon && TECH_ICONS[tag.icon];
                  return (
                    <li
                      key={tag.name}
                      className="inline-flex items-center gap-2.5 text-[0.92rem] text-text-secondary transition-colors duration-150 hover:text-text-primary"
                    >
                      <span className="text-accent" aria-hidden="true">
                        {icon ? <TechGlyph path={icon.path} /> : <GenericTechGlyph />}
                      </span>
                      {tag.name}
                    </li>
                  );
                })}
              </ul>
            </m.div>
          ))}
        </div>
      </div>
    </DocSection>
  );
}
