"use client";

import { AnimatePresence, m, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";
import type { Experience } from "@/types";

function formatPeriod(start: string, end: string) {
  return `${start} — ${end === "present" ? "Present" : end}`;
}

function CompanyTab({ exp, active, onClick }: { exp: Experience; active: boolean; onClick: () => void }) {
  return (
    <m.li variants={staggerItem} className="flex-shrink-0 snap-start">
      <button
        type="button"
        role="tab"
        aria-selected={active}
        onClick={onClick}
        className={`whitespace-nowrap overflow-hidden text-ellipsis block w-full text-left py-3 px-4 border-b-2 bg-transparent cursor-pointer transition-colors duration-200 max-[860px]:py-2.5 max-[860px]:px-3 ${
          active ? "border-accent" : "border-border-subtle hover:border-border"
        }`}
      >
        <p
          className={`font-display font-semibold tracking-[-0.02em] text-[1.02rem] transition-colors duration-200 ${
            active ? "text-text-primary" : "text-text-muted"
          }`}
        >
          {exp.company}
        </p>
      </button>
    </m.li>
  );
}

function ExperienceDetail({ exp }: { exp: Experience }) {
  return (
    <m.div
      key={exp.company}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      role="tabpanel"
    >
      <div className="flex items-baseline gap-3 flex-wrap mb-[0.35rem]">
        <p className="font-display font-semibold tracking-[-0.025em] text-text-primary leading-[1.2] text-[clamp(1.15rem,2vw,1.45rem)]">
          {exp.company}
        </p>
        <span className="font-mono text-[0.63rem] tracking-[0.08em] text-accent border border-accent-dim rounded-sm px-2 py-[0.1rem]">
          {exp.type}
        </span>
      </div>

      <div className="flex gap-3 flex-wrap items-center font-mono text-[0.78rem] text-text-muted tracking-[0.04em] mb-5">
        <span className="text-text-secondary">{exp.role}</span>
        <span className="opacity-40">·</span>
        <span>{formatPeriod(exp.period.start, exp.period.end)}</span>
        <span className="opacity-40">·</span>
        <span>{exp.location}</span>
      </div>

      <p className="text-text-secondary text-[0.95rem] leading-[1.72] max-w-[66ch] mb-5">{exp.summary}</p>

      {exp.highlights?.length > 0 && (
        <ul className="flex flex-col gap-2 mb-5 pl-0 list-none">
          {exp.highlights.map((h) => (
            <li key={h.slice(0, 40)} className="text-text-secondary text-[0.9rem] leading-[1.65] pl-[1.1rem] relative max-w-[70ch]">
              <span className="absolute left-0 text-accent font-mono">→</span>
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-[0.4rem]">
        {exp.stack.map((s) => (
          <span
            key={s}
            className="font-mono text-[0.68rem] text-text-muted bg-bg-elevated border border-border-subtle rounded-sm px-[0.55rem] py-[0.2rem]"
          >
            {s}
          </span>
        ))}
      </div>
    </m.div>
  );
}

export default function ExperienceSection({ exp }: { exp: Experience[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const [selected, setSelected] = useState(0);

  return (
    <section ref={ref} id="experience" className="py-[clamp(5rem,10vw,8rem)] border-t border-border-subtle bg-bg-elevated">
      <div className="container-main">
        <m.p variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"} className="eyebrow mb-8">
          Experience
          <span className="eyebrow__rule" />
        </m.p>

        <m.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-display font-semibold tracking-[-0.04em] leading-[1.05] text-[clamp(1.9rem,4vw,2.75rem)] mb-12"
        >
          Where I&apos;ve built things
        </m.h2>

        <div className="grid grid-cols-[240px_1fr] gap-x-14 items-start max-[860px]:grid-cols-1 max-[860px]:gap-y-8">
          <div className="relative max-[860px]:-mx-4 max-[860px]:px-4 max-[860px]:after:content-[''] max-[860px]:after:absolute max-[860px]:after:right-0 max-[860px]:after:top-0 max-[860px]:after:bottom-0 max-[860px]:after:w-8 max-[860px]:after:bg-gradient-to-l max-[860px]:after:from-bg-elevated max-[860px]:after:to-transparent max-[860px]:after:pointer-events-none">
            <m.ul
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              role="tablist"
              className="flex flex-col border-t border-border-subtle max-[860px]:flex-row max-[860px]:overflow-x-auto max-[860px]:border-t-0 max-[860px]:border-b max-[860px]:gap-0 max-[860px]:snap-x max-[860px]:snap-mandatory max-[860px]:scrollbar-none"
            >
            {exp.map((e, i) => (
              <CompanyTab key={`${e.company}-${i}`} exp={e} active={selected === i} onClick={() => setSelected(i)} />
            ))}
          </m.ul>
          </div>

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <ExperienceDetail key={exp[selected].company} exp={exp[selected]} />
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }
      `}</style>
    </section>
  );
}
