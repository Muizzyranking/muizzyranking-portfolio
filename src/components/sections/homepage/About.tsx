"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { arrowNudge, fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

const SIDEBAR_CARDS = [
  {
    label: "Current setup",
    body: (
      <>
        <code className="about-code">nvim</code> + <code className="about-code">tmux</code> + <code className="about-code">lazygit</code> +{" "}
        <code className="about-code">zsh</code>. If it doesn&apos;t have a terminal interface, I&apos;m suspicious of it.
      </>
    ),
  },
  {
    label: "Currently exploring",
    chips: ["LLMs", "MLOps", "Statistics"],
  },
  {
    label: "Off the clock",
    body: "Marvel. DC. Every animated film ever made. Dad jokes — the worse, the better.",
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section ref={ref} id="about" className="section-band">
      <div className="container-main">
        <m.p variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"} className="eyebrow mb-8">
          About
          <span className="eyebrow__rule" />
        </m.p>

        <div className="about-grid grid grid-cols-2 gap-20 items-start max-[860px]:grid-cols-1 max-[860px]:gap-12">
          <div>
            <m.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-display font-semibold tracking-[-0.04em] leading-[1.05] mb-7 text-text-primary text-[clamp(1.9rem,3.8vw,2.75rem)]"
            >
              I listen well. <em className="italic text-accent font-bold">I build better.</em>
            </m.h2>

            {[
              <>
                I work on backend systems. APIs, queues, databases — the bits that have to keep working when nobody&apos;s watching. Right now{" "}
                <strong className="text-text-primary font-semibold">I&apos;m learning my way into AI and ML</strong>, which has been humbling in
                roughly the way you&apos;d expect.
              </>,
              "I'm quiet until you ask the right question. Distributed systems, why anything works, how things break — once we're there, I'll happily lose track of time.",
            ].map((text, i) => (
              <m.p
                key={text.toString().slice(0, 30)}
                variants={fadeUp}
                custom={i + 2}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="text-text-secondary leading-[1.78] mb-[1.1rem] text-[0.96rem]"
              >
                {text}
              </m.p>
            ))}

            <m.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mt-6 flex gap-7 flex-wrap items-center"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-[0.08em] text-accent border-b border-acccent-dim pb-[0.2rem]"
              >
                <span>the longer version</span>
                <m.span
                  variants={arrowNudge}
                  initial="rest"
                  whileHover="hover"
                  className="inline-block group-hover:translate-x-1 transition-transform"
                >
                  →
                </m.span>
              </Link>

              <Link
                href="/tools"
                className="group inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-[0.08em] text-text-muted pb-[0.2rem]"
              >
                <span>p.s. the toolbox</span>
                <m.span variants={arrowNudge} initial="rest" whileHover="hover" className="inline-block">
                  →
                </m.span>
              </Link>
            </m.div>
          </div>

          {/* Sidebar cards */}
          <m.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"} className="flex flex-col gap-4">
            {SIDEBAR_CARDS.map(({ label, body, chips }) => (
              <m.div
                key={label}
                variants={staggerItem}
                whileHover={{ y: -2, borderColor: "var(--color-accent-dim)" }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="bg-bg-elevated border border-border rounded-lg px-6 py-5"
              >
                <p className="font-mono text-[0.63rem] tracking-[0.16em] uppercase text--text-muted mb-3">{label}</p>

                {body && <p className="text-text-secondary text-[0.87rem] leading-[1.65]">{body}</p>}

                {chips && (
                  <div className="flex flex-wrap gap-1.5">
                    {chips.map((c) => (
                      <span
                        key={c}
                        className="font-mono text-[0.7rem] text-text-muted border border-dashed border-border rounded-sm px-[0.6rem] py-1"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </m.div>
            ))}

            <m.div
              variants={staggerItem}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="bg-accent-subtle border border-accent-dim rounded-lg px-6 py-5"
            >
              <p className="font-mono text-[0.63rem] tracking-[0.16em] uppercase text-accent-dim mb-2">Operating principle</p>
              <p className="text-text-secondary text-[0.87rem] leading-[1.65]">Perfectionist. Lazy about it. The combination somehow always works.</p>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
