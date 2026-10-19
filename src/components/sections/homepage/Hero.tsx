"use client";

import { m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { EASE } from "@/lib/motion";

// ─── Hero copy — edit me ───
const HERO = {
  greeting: "hello, my name is.",
  intro: "I am a software engineer, and I build software — backend, frontend, and the parts in between.",
};

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = reduce ? {} : { y: 20 };

  return (
    <section className="relative overflow-x-clip">
      <div className="container-main flex min-h-[92dvh] flex-col justify-center pt-24 pb-16">
        <m.p
          initial={{ opacity: 0, ...rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-6 font-mono text-[0.82rem] font-semibold tracking-[0.02em] text-text-secondary"
        >
          {HERO.greeting}
        </m.p>

        <m.h1
          initial={{ opacity: 0, ...rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
          className="mb-8 font-display text-[clamp(3.2rem,10vw,7.25rem)] leading-[1] tracking-[-0.02em] font-bold text-text-primary"
        >
          Muiz <em className="text-accent">Oyebowale</em>
        </m.h1>

        <m.p
          initial={{ opacity: 0, ...rise }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
          className="mb-12 max-w-[54ch] text-[clamp(1.15rem,2.2vw,1.35rem)] leading-[1.7] text-text-secondary"
        >
          {HERO.intro}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.32 }}
          className="flex flex-wrap items-center gap-3"
        >
          <Link href="/projects" className="btn btn--primary">
            view projects
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="#contact" className="btn btn--ghost">
            get in touch
          </Link>
        </m.div>
      </div>
    </section>
  );
}
