"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL } from "@/lib/motion";

const LINES = [
  "Working through the parts of ML that go beyond API wrappers: RAG, fine-tuning, model serving, experiment tracking.",
  "And Rust, slowly, because it keeps teaching me things about my own code.",
];

export default function Learning() {
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
          style={{ marginBottom: "2.5rem" }}
        >
          Currently learning
          <span className="eyebrow__rule" />
        </m.p>

        <m.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            padding: "2rem 2.25rem",
            background: "var(--color-background)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "2px",
              background: "var(--color-accent)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {LINES.map((line, i) => (
              <p
                key={line}
                style={{
                  fontFamily: i === 0 ? "var(--font-display)" : "var(--font-mono)",
                  fontSize: i === 0 ? "clamp(1.15rem, 2.2vw, 1.5rem)" : "0.8rem",
                  fontWeight: i === 0 ? 600 : 400,
                  letterSpacing: i === 0 ? "-0.02em" : "0",
                  lineHeight: 1.5,
                  color: i === 0 ? "var(--color-text-primary)" : "var(--color-text-muted)",
                }}
              >
                {i === 1 && <span style={{ color: "var(--color-accent-dim)" }}>{"// "}</span>}
                {line}
              </p>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
