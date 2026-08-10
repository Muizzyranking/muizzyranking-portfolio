"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  right?: ReactNode;
};

export default function SectionHeader({ eyebrow, title, right }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <div ref={ref} className="mb-12">
      <m.p
        initial={{ opacity: 0, ...from }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
        transition={{ duration: 0.45, ease: EASE }}
        className="eyebrow mb-7"
      >
        {eyebrow}
      </m.p>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <m.h2
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
          className="font-display font-semibold tracking-[-0.02em] leading-[1.15] text-[clamp(1.5rem,3vw,2.1rem)] text-text-primary"
        >
          {title}
        </m.h2>
        {right}
      </div>
    </div>
  );
}
