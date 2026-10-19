"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import DocSection, { DocLink } from "@/components/ui/DocSection";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";

export default function AboutBlurb() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <DocSection title="The person behind it." action={<DocLink href="/about">more about me</DocLink>}>
      <div ref={ref} className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start">
        <div className="min-w-0">
          <m.p
            initial={{ opacity: 0, ...from }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
            transition={{ duration: 0.5, ease: EASE }}
            className="max-w-[62ch] text-[1rem] leading-[1.75] text-text-secondary"
          >
            I'm a software engineer driven by curiosity about how things work, from intuitive frontend experiences to the systems and data models
            behind them. I enjoy understanding problems deeply, making thoughtful engineering decisions, and building software that works well and
            stands the test of time. Lately, I've been exploring AI and machine learning, particularly how to turn them into useful products.
          </m.p>
        </div>

        <m.figure
          initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[13rem] lg:m-0"
        >
          <div className="relative aspect-square overflow-hidden rounded-[var(--radius-md)] border border-border bg-bg-elevated">
            <Image
              src="/muizzy.jpg"
              alt="Portrait of Muiz Oyebowale"
              fill
              sizes="(min-width: 1024px) 208px, 60vw"
              className="object-cover grayscale-[20%]"
            />
          </div>
          <figcaption className="mt-3 text-center font-mono text-[0.68rem] text-text-muted">@muizzyranking</figcaption>
        </m.figure>
      </div>
    </DocSection>
  );
}
