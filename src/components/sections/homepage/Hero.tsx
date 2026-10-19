"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";

// ─── Hero copy — edit me ───
const HERO = {
  tag: "software engineer",
  headline: ["I build", "software."],
  intro: "Backend, frontend, and every process in between.",
  name: { first: "Muiz", last: "Oyebowale" },
  role: "software engineer",
};

// Typewriter joke lines: each entry is typed onto the same line, with a
// short pause between entries.
const LINES = ["currently breaking the build.", "it was fine.", "it is not fine.", "anyway. welcome."];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: EASE, delay },
});

const GRID_STYLE = {
  backgroundImage:
    "linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
  opacity: 0.55,
  maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
} as const;

export default function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const target = LINES.slice(0, lineIdx + 1).join(" ");

  useEffect(() => {
    if (done) return;
    if (charIdx < target.length) {
      const timeout = setTimeout(
        () => {
          setDisplayed(target.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        },
        charIdx < LINES[0].length ? 45 : 38,
      );
      return () => clearTimeout(timeout);
    }
    if (lineIdx < LINES.length - 1) {
      const pause = setTimeout(() => setLineIdx((l) => l + 1), 1500 + lineIdx * 350);
      return () => clearTimeout(pause);
    }
    setDone(true);
  }, [charIdx, lineIdx, target, done]);

  return (
    <section className="relative overflow-hidden">
      {/* Grid background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={GRID_STYLE} />

      {/* Top rule */}
      <m.div
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
        className="absolute top-24 right-[clamp(1.25rem,5vw,2.5rem)] left-[clamp(1.25rem,5vw,2.5rem)] origin-left"
        style={{ height: 1, background: "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)" }}
      />

      <div className="container-main relative z-[2] flex min-h-[92dvh] flex-col pt-24 pb-14">
        <div className="flex flex-1 flex-col justify-center">
          {/* Tag */}
          <m.p {...rise(0)} className="mb-7 flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-text-muted">
            <span aria-hidden="true" className="text-accent opacity-70">
              [
            </span>
            {HERO.tag}
            <span aria-hidden="true" className="text-accent opacity-70">
              ]
            </span>
            <span aria-hidden="true" className="inline-block h-px w-8 bg-border" />
          </m.p>

          {/* Main line */}
          <m.h1
            {...rise(0.06)}
            className="mb-7 font-display text-[clamp(3.4rem,10vw,8rem)] leading-[0.93] font-bold tracking-[-0.04em] text-text-primary"
          >
            <span className="block">{HERO.headline[0]}</span>
            <span className="block text-accent italic">{HERO.headline[1]}</span>
          </m.h1>

          {/* Intro */}
          <m.p {...rise(0.18)} className="max-w-[52ch] text-[clamp(1.02rem,2vw,1.2rem)] leading-[1.6] font-medium text-text-secondary">
            {HERO.intro}
          </m.p>

          {/* Terminal */}
          <m.p {...rise(0.26)} className="mt-6 font-mono text-[0.76rem] text-text-muted" aria-label="Terminal-style introduction">
            <span className="mr-2 text-accent">$</span>
            {displayed}
            <m.span
              aria-hidden="true"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5] }}
              className="ml-0.5 inline-block"
            >
              ▋
            </m.span>
          </m.p>
        </div>

        {/* Signature row — name at the bottom */}
        <m.div {...rise(0.5)} className="mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-t border-border-subtle pt-6">
          <div>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-text-muted">{HERO.role}</p>
            <p className="mt-1.5 font-display text-[clamp(1.3rem,2.6vw,1.8rem)] leading-tight font-semibold text-text-primary">
              {HERO.name.first} <span className="text-accent italic">{HERO.name.last}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/projects" className="btn btn--primary">
              view projects
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="#contact" className="btn btn--ghost">
              get in touch
            </Link>
          </div>
        </m.div>
      </div>
    </section>
  );
}
