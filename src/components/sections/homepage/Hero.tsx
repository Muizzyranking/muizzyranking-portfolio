"use client";

import { m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { EASE } from "@/lib/motion";

export default function Hero() {
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <section className="container-main text-center pt-[clamp(5rem,11vw,8.5rem)] pb-[clamp(4rem,8vw,6rem)]">
      <m.div
        initial={{ opacity: 0, ...from }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="font-mono text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-text-muted mb-[clamp(2.5rem,6vw,4rem)]"
      >
        Backend Engineer
      </m.div>

      <m.h1
        initial={{ opacity: 0, ...from }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="font-display font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(3rem,9vw,6.5rem)] text-text-primary mb-[clamp(2.5rem,6vw,4rem)]"
      >
        Muiz <span className="inline-block italic px-[0.12em] rounded-sm bg-accent text-background">Oyebowale</span>
      </m.h1>

      <m.p
        initial={{ opacity: 0, ...from }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
        className="text-text-secondary text-[clamp(1.2rem,2.3vw,1.6rem)] leading-[1.5] max-w-[44ch] mx-auto mb-4"
      >
        I build the parts nobody sees, and that&apos;s exactly how I like it. I&apos;ve got your back
        <span className="italic text-accent">end</span>.
      </m.p>

      <m.p
        initial={{ opacity: 0, ...from }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
        className="text-text-muted text-[1rem] leading-[1.7] max-w-[46ch] mx-auto mb-10"
      >
        not all heroes wears cape, some quietly build infrastructure that keeps working when it matters.
      </m.p>

      <m.div
        initial={{ opacity: 0, ...from }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.12 }}
        className="flex items-center justify-center gap-3 flex-wrap"
      >
        <Link
          href="/about"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-[0.95rem] font-semibold text-accent-foreground transition-colors duration-150 hover:bg-accent-dim"
        >
          about me
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-6 py-3 text-[0.95rem] font-semibold text-text-primary transition-colors duration-150 hover:border-accent-dim"
        >
          projects
          <span aria-hidden="true">→</span>
        </Link>
      </m.div>
    </section>
  );
}
