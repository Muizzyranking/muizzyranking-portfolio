"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

const WORK = [
  {
    title: "Backend development",
    body: "The spine of the product: data, auth, integrations, the parts users never see.",
  },
  {
    title: "AI integration",
    body: "Models and providers wired into real flows, where latency, cost and reliability decide.",
  },
  {
    title: "API design",
    body: "Contracts that are pleasant to consume and stable to depend on.",
  },
  {
    title: "End to end",
    body: "Schema to shipped service. I own the API, the jobs, the deploy and the 3am alert.",
  },
  {
    title: "Payments & financial systems",
    body: "Money moves exactly once. Ledgers, wallets, settlement, reconciliation.",
  },
  {
    title: "Reliability & performance",
    body: "Caching, queues, async, backpressure. It holds when it matters.",
  },
  {
    title: "Infrastructure & deployment",
    body: "Docker, Linux, Nginx, CI/CD. Repeatable deploys, boring on purpose.",
  },
  {
    title: "Developer tooling & automation",
    body: "The terminal workflow that survives a fresh install.",
  },
];

export default function WhatIDo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4.5rem, 9vw, 7rem) 0",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container-main">
        <m.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="eyebrow"
          style={{ marginBottom: "3rem" }}
        >
          What I do
          <span className="eyebrow__rule" />
        </m.p>

        <m.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: "1.25rem",
          }}
        >
          What I do, end to end.
        </m.h2>

        <m.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontSize: "1rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.7,
            maxWidth: "52ch",
            marginBottom: "3.5rem",
          }}
        >
          Backend first. But I follow a feature all the way out the door.
        </m.p>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            background: "var(--color-border)",
          }}
          className="whatido-grid"
        >
          {WORK.map(({ title, body }, idx) => (
            <m.div
              key={title}
              variants={staggerItem}
              style={{
                background: "var(--color-background)",
                padding: "1.6rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                minHeight: "100%",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.1em",
                  marginBottom: "1.1rem",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <p
                style={{
                  fontSize: "1.02rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.4,
                }}
              >
                {title}
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.65,
                }}
              >
                {body}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .whatido-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 620px) {
          .whatido-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
