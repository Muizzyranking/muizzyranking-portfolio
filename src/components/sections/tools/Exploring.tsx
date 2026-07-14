"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

const ITEMS = [
  { name: "LLMs", note: "API integration, prompt patterns, RAG architectures." },
  { name: "Machine Learning", note: "Fundamentals first. Then the interesting parts." },
  { name: "MLOps", note: "The Ops side I get. The ML side I'm learning." },
  { name: "PyTorch", note: "For the model-building side of the pivot." },
  { name: "MLflow", note: "Experiment tracking. Starting to make sense." },
  { name: "Statistics", note: "Because hand-wavy intuition only gets you so far." },
  { name: "AI Finance", note: "Where systems thinking meets numbers that matter." },
];

export default function Exploring() {
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
          style={{ marginBottom: "2rem" }}
        >
          Currently exploring
          <span className="eyebrow__rule" />
        </m.p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
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
            }}
          >
            What I&apos;m <em style={{ fontStyle: "italic", color: "var(--color-accent)", fontWeight: 500 }}>cooking.</em>
          </m.h2>

          <m.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--color-text-muted)",
              maxWidth: "32ch",
              lineHeight: 1.6,
            }}
          >
            {`// updated ${new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}`}
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "0.85rem",
          }}
        >
          {ITEMS.map(({ name, note }) => (
            <m.div
              key={name}
              variants={staggerItem}
              whileHover={{ y: -2, borderColor: "var(--color-accent-dim)" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "1.1rem 1.25rem",
                background: "var(--color-bg-elevated)",
                border: "1px dashed var(--color-border)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.86rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                {name}
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.55,
                }}
              >
                {note}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
