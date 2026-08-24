"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { TierDot } from "@/components/sections/homepage/FullStack";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import { STACK_GROUPS } from "@/lib/stack";

export default function Stack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 14 };

  return (
    <section ref={ref} id="stack" className="section section-band">
      <div className="container-main">
        <m.p
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE }}
          className="eyebrow mb-6"
        >
          stack
        </m.p>

        <m.h2
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
          className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] font-bold text-text-primary mb-4"
        >
          What I use to work.
        </m.h2>

        <m.p
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
          className="text-text-secondary text-[1rem] leading-[1.7] max-w-[52ch] mb-10"
        >
          Not a boast, a working inventory. Grouped the way I think about a system, from the language down to the shell.
        </m.p>

        <div className="flex flex-col gap-4">
          {STACK_GROUPS.map(({ label, blurb, tags }, idx) => (
            <m.div
              key={label}
              initial={{ opacity: 0, ...from }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.05 * idx }}
              className="card grid gap-x-10 gap-y-4 p-7 transition-[box-shadow,border-color] duration-200 hover:border-accent/40 hover:shadow-[var(--shadow-lifted)] md:grid-cols-[15rem_minmax(0,1fr)] md:items-start"
            >
              <div>
                <p className="font-mono text-[0.72rem] font-semibold tracking-[0.14em] text-accent uppercase">{label}</p>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-text-secondary">{blurb}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map(({ name, tier }) => (
                  <span key={name} className="chip !text-[0.75rem]">
                    <TierDot tier={tier} />
                    {name}
                  </span>
                ))}
              </div>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.68rem] tracking-[0.1em] text-text-muted uppercase"
        >
          <span className="inline-flex items-center gap-2">
            <TierDot tier="production" /> production
          </span>
          <span className="inline-flex items-center gap-2">
            <TierDot tier="comfortable" /> comfortable
          </span>
          <span className="inline-flex items-center gap-2">
            <TierDot tier="exploring" /> exploring
          </span>
        </m.div>
      </div>
    </section>
  );
}
