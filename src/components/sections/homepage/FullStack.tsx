"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import { STACK_GROUPS, type StackGroup, type StackTier } from "@/lib/stack";

export const TIER_DOT_CLASS: Record<StackTier, string> = {
  production: "bg-accent",
  comfortable: "border-[1.5px] border-text-muted",
  exploring: "border-[1.5px] border-dashed border-text-muted",
};

export function TierDot({ tier }: { tier: StackTier }) {
  return <span aria-hidden="true" className={`inline-block size-[7px] shrink-0 rounded-full ${TIER_DOT_CLASS[tier]}`} />;
}

function GroupCard({ group, index }: { group: StackGroup; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const from = reduce ? {} : { y: 14 };

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, ...from }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
      transition={{ duration: 0.45, ease: EASE, delay: 0.05 * index }}
      className="card flex min-w-0 flex-col p-6 transition-[box-shadow,border-color] duration-200 hover:border-accent/40 hover:shadow-[var(--shadow-soft)]"
    >
      <p className="font-mono text-[0.72rem] font-semibold tracking-[0.14em] text-accent uppercase">{group.label}</p>
      <p className="mt-2 text-[0.82rem] leading-relaxed text-text-muted">{group.blurb}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {group.tags.map(({ name, tier }) => (
          <span key={name} className="chip !text-[0.72rem]">
            <TierDot tier={tier} />
            {name}
          </span>
        ))}
      </div>
    </m.div>
  );
}

/** Tooling — full width. */
function ToolingCard({ group, index }: { group: StackGroup; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const from = reduce ? {} : { y: 14 };

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, ...from }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
      transition={{ duration: 0.45, ease: EASE, delay: 0.05 * index }}
      className="card p-6 transition-[box-shadow,border-color] duration-200 hover:border-accent/40 hover:shadow-[var(--shadow-soft)] sm:col-span-2 lg:col-span-4"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <p className="font-mono text-[0.72rem] font-semibold tracking-[0.14em] text-accent uppercase">{group.label}</p>
        <p className="text-[0.85rem] text-text-secondary">{group.blurb}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.tags.map(({ name, tier }) => (
          <span key={name} className="chip !text-[0.75rem]">
            <TierDot tier={tier} />
            {name}
          </span>
        ))}
      </div>
    </m.div>
  );
}

export default function FullStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 14 };

  return (
    <section ref={ref} className="section section-band">
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
          className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] font-bold text-text-primary mb-10"
        >
          The full stack.
        </m.h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-x-clip">
          {STACK_GROUPS.map((group, i) =>
            i === 4 ? <ToolingCard key={group.label} group={group} index={i} /> : <GroupCard key={group.label} group={group} index={i} />,
          )}
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
