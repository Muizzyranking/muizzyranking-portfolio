"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { EASE } from "@/lib/motion";

const PARAGRAPHS = [
  {
    text: "It started with curiosity, like most things do. I wanted to know how things worked. Not the surface, but the mechanism underneath. I started with C, which isn't the friendliest place to begin, but it taught me the fundamentals properly. The questions never really stopped.",
  },
  {
    text: "Backend engineering felt like a natural home. I like the parts nobody sees: the performance work, the data modelling, the failure modes, the 3am alerts that teach you more about a system than a week of reading docs. If you did it right, nobody knows you were there.",
  },
  {
    text: "People who know me call me muizzy. You're welcome to too. Now I'm pointing the same obsession at AI and ML. The intersection of systems and intelligence is the most interesting problem space I've found, and I'm still early in it. I'm paying attention.",
    accent: true,
  },
];

export default function AboutHero() {
  const reduce = useReducedMotion();
  const rise = reduce ? {} : { y: 16 };

  return (
    <section className="border-b border-border-subtle">
      <div className="container-main pt-[clamp(6rem,13vw,9.5rem)] pb-[clamp(4rem,8vw,6rem)]">
        <m.p initial={{ opacity: 0, ...rise }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="eyebrow mb-8">
          who am i
        </m.p>

        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div>
            <m.h1
              initial={{ opacity: 0, ...rise }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
              className="font-display text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] tracking-[-0.03em] font-bold text-text-primary mb-8"
            >
              Muiz <em className="italic text-accent">Oyebowale</em>
            </m.h1>

            <div className="max-w-[62ch] flex flex-col gap-5">
              {PARAGRAPHS.map(({ text, accent }, idx) => (
                <m.p
                  key={text.slice(0, 24)}
                  initial={{ opacity: 0, ...rise }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.16 + idx * 0.08 }}
                  className={
                    accent
                      ? "border-l-2 border-accent bg-accent-subtle px-5 py-4 text-[0.98rem] leading-[1.75] font-medium text-text-primary"
                      : "text-[1.02rem] leading-[1.75] text-text-secondary"
                  }
                >
                  {text.trim()}
                </m.p>
              ))}
            </div>
          </div>

          {/* Portrait — warm duotone so it belongs to the palette */}
          <m.figure
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(10% 6% 10% 6% round 24px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.3 }}
            className="portrait-frame relative mx-auto w-full max-w-[20rem]"
          >
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-xl)] border border-border bg-bg-elevated">
              <Image
                src="/muizzy.jpg"
                alt="Portrait of Muiz Oyebowale"
                fill
                priority
                sizes="(min-width: 1024px) 20rem, 85vw"
                className="object-cover"
                quality={90}
              />
              <div className="portrait-grain" aria-hidden="true" />
            </div>
            <figcaption className="mt-4 flex items-center justify-center gap-2 font-mono text-[0.68rem] font-semibold tracking-[0.12em] lowercase text-text-muted">
              <span className="block size-1.5 rounded-full bg-accent" aria-hidden="true" />
              @muizzyranking
            </figcaption>
          </m.figure>
        </div>
      </div>
    </section>
  );
}
