"use client";
import { m, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";

const STACK = [
  {
    label: "Languages",
    tags: ["Python", "TypeScript", "HTML"],
  },
  {
    label: "Frameworks",
    tags: ["Django", "FastAPI", "Next.js"],
  },
  {
    label: "Data",
    tags: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    label: "Infra",
    tags: ["Docker", "Linux", "Celery", "GitHub Actions"],
  },
];

export default function StackMini() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  // running index so the stagger cascades across the whole grid, not just per-row
  let i = 0;

  return (
    <section ref={ref} className="section section-band">
      <div className="container-main">
        <m.p
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE }}
          className="eyebrow mb-7"
        >
          stack
        </m.p>

        <div className="flex items-end justify-between gap-4 flex-wrap mb-10">
          <m.h2
            initial={{ opacity: 0, ...from }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
            className="font-display font-semibold tracking-[-0.02em] leading-[1.15] text-[clamp(1.5rem,3vw,2.1rem)] text-text-primary"
          >
            The tools I reach for.
          </m.h2>
          <m.div
            initial={{ opacity: 0, ...from }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.12 }}
          >
            <Link
              href="/about#stack"
              className="group inline-flex items-center gap-2 font-mono text-[0.8rem] font-semibold tracking-[0.08em] text-accent uppercase"
            >
              the full stack
              <span className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </m.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {STACK.map((group, groupIdx) => (
            <div key={group.label} className="flex flex-col gap-3">
              <m.p
                initial={{ opacity: 0, ...from }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.1 + groupIdx * 0.05 }}
                className="font-mono text-[0.7rem] tracking-[0.12em] text-text-secondary/60 uppercase flex items-center gap-2"
              >
                <span className="inline-block w-3 h-px bg-accent/50" aria-hidden="true" />
                {group.label}
              </m.p>

              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => {
                  const delay = 0.16 + i * 0.035;
                  i += 1;
                  return (
                    <m.span
                      key={tag}
                      initial={{ opacity: 0, ...(reduce ? {} : { y: 8, scale: 0.96 }) }}
                      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, ...(reduce ? {} : { y: 8, scale: 0.96 }) }}
                      transition={{ duration: 0.35, ease: EASE, delay }}
                      className="font-mono text-[0.75rem] border border-border bg-bg-elevated text-text-secondary rounded-sm px-3 py-[0.3rem] transition-all duration-200 ease-out hover:border-accent hover:text-accent hover:-translate-y-0.5 hover:shadow-[0_4px_14px_-6px_rgba(0,0,0,0.25)]"
                    >
                      {tag}
                    </m.span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
