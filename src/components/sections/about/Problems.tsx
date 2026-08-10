"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

const PROBLEMS = [
  {
    title: "Reliability",
    why: "Systems that must not fall over. Retries, timeouts, backpressure, graceful degradation. The boring failures are the interesting ones.",
  },
  {
    title: "Payments and ledgers",
    why: "Money moves exactly once. Idempotency, reconciliation, double-entry discipline. You get one deployment to get it right.",
  },
  {
    title: "Queues and async work",
    why: "Splitting work so nothing blocks and nothing gets lost. Where delivery and ordering guarantees actually matter.",
  },
  {
    title: "Auth and access",
    why: "Sessions, tokens, scopes, roles. Boundaries you can reason about, not hope about.",
  },
  {
    title: "APIs at scale",
    why: "Contracts that stay stable while the implementation underneath keeps changing.",
  },
];

export default function Problems() {
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
          Problems I enjoy
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
          The work I&apos;d sign up for again.
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
          Backend work, mostly, where correctness is the feature. A short list of the problems that keep me awake in the good way.
        </m.p>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            background: "var(--color-background)",
          }}
        >
          {PROBLEMS.map(({ title, why }, idx) => (
            <m.div
              key={title}
              variants={staggerItem}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "1.5rem",
                padding: "1.5rem 2rem",
                borderBottom: idx < PROBLEMS.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
                alignItems: "baseline",
              }}
              className="problem-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.1em",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <p
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    marginBottom: "0.35rem",
                    lineHeight: 1.4,
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {why}
                </p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>

      <style>{`
        @media (max-width: 620px) {
          .problem-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
            padding: 1.25rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
