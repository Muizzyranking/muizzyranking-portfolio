"use client";

import { m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { EASE } from "@/lib/motion";

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = reduce ? {} : { y: 16 };

  return (
    <section className="relative overflow-x-clip">
      <div className="container-main flex flex-col items-center pt-[clamp(7rem,15vw,11rem)] pb-[clamp(4rem,9vw,6rem)] text-center">
        <m.p
          initial={{ opacity: 0, ...rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-3 text-[1.1rem] italic text-text-muted"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Hi there, my name is
        </m.p>

        <m.h1
          initial={{ opacity: 0, ...rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="font-display text-[clamp(3rem,8vw,6rem)] leading-[1.0] tracking-[-0.035em] font-extrabold text-text-primary mb-6"
        >
          Muiz <em className="italic text-accent">Oyebowale</em>
        </m.h1>

        <m.div
          initial={{ opacity: 0, ...rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
          className="mb-7"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-raised px-4 py-2">
            <span className="block size-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="font-mono text-[0.68rem] font-semibold tracking-[0.12em] text-text-secondary uppercase">
              backend-heavy fullstack engineer
            </span>
          </span>
        </m.div>

        <m.p
          initial={{ opacity: 0, ...rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.22 }}
          className="text-text-secondary text-[clamp(1.15rem,2.2vw,1.45rem)] leading-[1.6] max-w-[42ch] mb-10"
        >
          I build the part of the software nobody sees. And that&rsquo;s exactly how I like it.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/about" className="btn btn--primary">
            about me
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/projects" className="btn btn--ghost">
            projects
          </Link>
        </m.div>
      </div>
    </section>
  );
}
