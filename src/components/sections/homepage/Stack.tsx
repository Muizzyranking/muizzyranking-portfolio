"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import DocSection from "@/components/ui/DocSection";
import TierDot from "@/components/ui/TierDot";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import { STACK_GROUPS } from "@/lib/stack";

export default function Stack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <DocSection title="The working set.">
      <div ref={ref} className="min-w-0">
        {/* Legend sits at the top, out of the content's way */}
        <m.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-3 flex items-center justify-end gap-x-7 border-b border-border-subtle pb-4 max-md:justify-start"
        >
          {(["production", "comfortable", "exploring"] as const).map((tier) => (
            <span key={tier} className="inline-flex items-center gap-2 font-mono text-[0.72rem] lowercase text-text-muted">
              <TierDot tier={tier} />
              {tier}
            </span>
          ))}
        </m.div>

        {/* Groups in two columns; chips carry the tier dot */}
        <div className="grid gap-x-14 max-lg:gap-y-2 lg:grid-cols-2">
          {STACK_GROUPS.map((group, i) => (
            <m.div
              key={group.label}
              initial={{ opacity: 0, ...from }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.05 * i }}
              className="border-b border-border-subtle py-8"
            >
              <h3 className="font-display text-[1.4rem] leading-[1.25] font-semibold tracking-[-0.01em] text-text-primary">{group.label}</h3>
              <p className="mt-1.5 max-w-[46ch] text-[0.92rem] leading-[1.6] text-text-muted">{group.blurb}</p>
              <ul className="mt-5 flex flex-wrap items-center gap-2">
                {group.tags.map(({ name, tier }) => (
                  <li key={name}>
                    <span className="chip chip--lg">
                      <TierDot tier={tier} />
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>
      </div>
    </DocSection>
  );
}
