"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";

export default function AboutCta() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <section ref={ref} className="section section-band">
      <div className="container-main">
        <m.p
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE }}
          className="eyebrow mb-7"
        >
          Who is this?
        </m.p>

        <m.p
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
          className="text-text-secondary text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.7] max-w-[58ch] mb-8"
        >
          A backend engineer who cares about the parts of a product that only get noticed when they break. I build APIs, data pipelines, payments, and
          queues. I keep them reliable, correct, and boring, so nobody has to think about them. And I&apos;m pointing the same attention at AI and ML.
        </m.p>

        <m.div
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.12 }}
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 font-mono text-[0.82rem] font-semibold tracking-[0.06em] text-accent uppercase"
          >
            read more about me
            <span className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        </m.div>
      </div>
    </section>
  );
}
