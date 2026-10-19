"use client";

import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import TierDot from "@/components/ui/TierDot";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import { STACK_GROUPS } from "@/lib/stack";

export default function Stack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };
  const [active, setActive] = useState(0);
  const current = STACK_GROUPS[active] ?? STACK_GROUPS[0];

  return (
    <section ref={ref} id="stack" className="section section-band">
      <div className="container-main">
        <m.h2
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
          className="mb-4 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.14] text-text-primary"
        >
          What I use to work.
        </m.h2>

        <m.p
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
          className="mb-10 max-w-[52ch] text-[1.02rem] leading-[1.7] text-text-secondary"
        >
          Not a boast, a working inventory. Grouped the way I think about a system, from the language down to the shell.
        </m.p>

        {/* Category tabs left, active group's panel right */}
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-[13rem_minmax(0,1fr)]">
          <div
            role="tablist"
            aria-label="Stack categories"
            className="flex items-start gap-5 max-md:overflow-x-auto md:flex-col md:gap-1.5 md:border-r md:border-border-subtle md:pr-6"
          >
            {STACK_GROUPS.map((group, i) => {
              const selected = i === active;
              return (
                <button
                  key={group.label}
                  type="button"
                  role="tab"
                  id={`stack-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="stack-panel"
                  onClick={() => setActive(i)}
                  style={{ color: selected ? "var(--color-accent)" : "var(--color-text-muted)" }}
                  className="group relative shrink-0 py-2 text-left font-mono text-[0.88rem] lowercase transition-colors duration-150"
                >
                  {selected && (
                    <m.span
                      layoutId="stack-tick"
                      className="absolute top-1/2 hidden h-[0.9rem] w-px -translate-y-1/2 -left-4 bg-accent md:block"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="block transition-colors duration-150 group-hover:text-text-primary">{group.label}</span>
                </button>
              );
            })}
          </div>

          <div className="min-w-0 md:pl-3">
            <div id="stack-panel" role="tabpanel" aria-labelledby={`stack-tab-${active}`}>
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={current.label}
                  layout
                  initial={{ opacity: 0, ...from }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={{ duration: 0.28, ease: EASE, layout: { type: "spring", stiffness: 300, damping: 34 } }}
                >
                  <p className="max-w-[56ch] text-[1.02rem] leading-[1.7] text-text-secondary">{current.blurb}</p>

                  <ul className="mt-6 flex flex-wrap items-center gap-2">
                    {current.tags.map(({ name, tier }) => (
                      <li key={name}>
                        <span className="chip chip--lg">
                          <TierDot tier={tier} />
                          {name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Legend for the tier dots */}
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-1.5 border-t border-border-subtle pt-4">
                    {(["production", "comfortable", "exploring"] as const).map((tier) => (
                      <span key={tier} className="inline-flex items-center gap-2 font-mono text-[0.72rem] lowercase text-text-muted">
                        <TierDot tier={tier} />
                        {tier}
                      </span>
                    ))}
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
