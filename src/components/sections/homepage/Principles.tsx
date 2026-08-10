"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/sections/homepage/SectionHeader";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";

const PRINCIPLES = [
  {
    number: "01",
    title: "Performance first",
    body: "Latency is a feature. I optimize the hot path before decorating the page.",
  },
  {
    number: "02",
    title: "Simple over clever",
    body: "The simplest solution that works today, and still works in six months.",
  },
  {
    number: "03",
    title: "Reliability matters",
    body: "Systems must survive failure. Idempotency, retries, and graceful degradation are defaults, not afterthoughts.",
  },
  {
    number: "04",
    title: "Design for maintenance",
    body: "Code is read far more than it's written. I optimize for the next engineer, including future me.",
  },
  {
    number: "05",
    title: "Measure before optimizing",
    body: "No guesswork. Profile, benchmark, then decide.",
  },
];

export default function Principles() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <section ref={ref} className="section section-band">
      <div className="container-main">
        <SectionHeader eyebrow="How I work" title="Principles I build by." />

        <m.div
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
        >
          {PRINCIPLES.map((principle, i) => (
            <div
              key={principle.number}
              className={`grid gap-x-6 gap-y-1.5 py-6 md:grid-cols-[3.5rem_15rem_1fr] ${
                i === 0 ? "border-t border-border" : "border-t border-border-subtle"
              } ${i === PRINCIPLES.length - 1 ? "border-b border-border" : ""}`}
            >
              <span className="font-mono text-[0.72rem] tracking-[0.08em] text-accent pt-1">{principle.number}</span>
              <h3 className="font-display font-semibold tracking-[-0.01em] leading-[1.3] text-text-primary text-[1.0625rem]">{principle.title}</h3>
              <p className="text-text-secondary text-[0.92rem] leading-[1.68] max-w-[64ch]">{principle.body}</p>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
