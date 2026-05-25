"use client";

import { AnimatePresence, m, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";
import type { Experience } from "@/types";

function formatPeriod(start: string, end: string) {
  return `${start} — ${end === "present" ? "Present" : end}`;
}

function ExperienceRow({ exp, index, open, onToggle }: { exp: Experience; index: number; open: boolean; onToggle: () => void }) {
  const id = `exp-${index}`;

  return (
    <m.div variants={staggerItem} className="border-b border-border-subtle">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="w-full text-left grid grid-cols-[1fr_auto] gap-6 items-start py-6 bg-transparent border-0 cursor-pointer text-inherit"
      >
        <div className="min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap mb-[0.35rem]">
            <p className="font-display font-semibold tracking-[-0.025em] text-text-primary leading-[1.2] text-[clamp(1.15rem,2vw,1.45rem)]">
              {exp.company}
            </p>
            <span className="font-mono text-[0.63rem] tracking-[0.08em] text-accent border border-accent-dim rounded-sm px-2 py-[0.1rem]">
              {exp.type}
            </span>
          </div>

          <div className="flex gap-3 flex-wrap items-center font-mono text-[0.78rem] text-text-muted tracking-[0.04em] mb-[0.6rem]">
            <span className="text-text-secondary">{exp.role}</span>
            <span className="opacity-40">·</span>
            <span>{formatPeriod(exp.period.start, exp.period.end)}</span>
            <span className="opacity-40">·</span>
            <span>{exp.location}</span>
          </div>

          {!open && (
            <p className="text-text-secondary text-[0.88rem] leading-[1.6] max-w-[70ch] line-clamp-2">
              {exp.summary}
            </p>
          )}
        </div>

        <m.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-[1.1rem] pt-[0.2rem] transition-colors duration-200"
          style={{ color: open ? "var(--color-accent)" : "var(--color-text-muted)" }}
          aria-hidden
        >
          →
        </m.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7">
              <p className="text-text-secondary text-[0.95rem] leading-[1.72] max-w-[66ch] mb-5">
                {exp.summary}
              </p>

              {exp.highlights?.length > 0 && (
                <ul className="flex flex-col gap-2 mb-5 pl-0 list-none">
                  {exp.highlights.map((h) => (
                    <li
                      key={h.slice(0, 40)}
                      className="text-text-secondary text-[0.9rem] leading-[1.65] pl-[1.1rem] relative max-w-[70ch]"
                    >
                      <span className="absolute left-0 text-accent font-mono">
                        →
                      </span>
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
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

export default function ExperienceSection({ exp }: { exp: Experience[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      id="experience"
      className="py-[clamp(5rem,10vw,8rem)] border-t border-border-subtle bg-bg-elevated"
    >
      <div className="container-main">
        <m.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="eyebrow mb-8"
        >
          <span className="eyebrow__mark">[ 03 ]</span>
          Experience
          <span className="eyebrow__rule" />
        </m.p>

        <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
          <m.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-display font-semibold tracking-[-0.04em] leading-[1.05] text-[clamp(1.9rem,4vw,2.75rem)]"
          >
            Where I&apos;ve built things
          </m.h2>
          <m.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-mono text-[0.7rem] tracking-[0.08em] text-text-muted"
          >
            click to expand
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="border-t border-border-subtle"
        >
          {exp.map((exp, i) => (
            <ExperienceRow
              key={`${exp.company}-${i}`}
              exp={exp}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex((curr) => (curr === i ? null : i))}
            />
          ))}
        </m.div>
      </div>
    </section>
  );
}
