"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { type ReactNode, useRef } from "react";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";

type DocSectionProps = {
  title?: string;
  action?: ReactNode;
  id?: string;
  children: ReactNode;
};

/** Section shell: hairline rule above, display title with an optional inline
 *  action link. Numbered side rails were dropped deliberately. */
export default function DocSection({ title, action, id, children }: DocSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 14 };

  return (
    <section id={id} className="section section-band overflow-x-clip">
      <div className="container-main">
        {title && (
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <m.h2
              initial={{ opacity: 0, ...from }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.04 }}
              className="font-display text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.14] tracking-[-0.01em] text-text-primary"
            >
              {title}
            </m.h2>
            {action && (
              <m.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.12 }}
              >
                {action}
              </m.div>
            )}
          </div>
        )}
        <div ref={ref} className="min-w-0">
          {children}
        </div>
      </div>
    </section>
  );
}

/** Mono link used for "view all" affordances beside section titles. */
export function DocLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 font-mono text-[0.74rem] lowercase text-text-muted transition-colors duration-150 hover:text-accent"
    >
      {children}
      <span className="transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
