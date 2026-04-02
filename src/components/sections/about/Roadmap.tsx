"use client";


import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

type Stage = "reading" | "building" | "applying" | "comfortable" | "teaching";

const STAGE_ORDER: Stage[] = ["reading", "building", "applying", "comfortable", "teaching"];

const STAGE_LABEL: Record<Stage, string> = {
  reading: "Reading",
  building: "Building",
  applying: "Applying",
  comfortable: "Comfortable",
  teaching: "Teaching",
};

const TRACKS = [
  {
    area: "AI / LLMs",
    stage: "building" as Stage,
    description:
      "Started with API wrappers, moved into prompt engineering, now reading papers on fine-tuning and RAG architectures. The more I learn, the more questions I have. This is a good sign.",
    items: [
      "LLM API integration (OpenAI, Anthropic)",
      "Prompt engineering patterns",
      "RAG architectures",
      "Fine-tuning concepts",
      "Embeddings & vector stores",
    ],
    reading: ["Attention Is All You Need", "The Illustrated Transformer", "Chip Huyen's ML Engineering"],
    note: "// currently: building things that embarrass future me",
  },
  {
    area: "MLOps",
    stage: "reading" as Stage,
    description:
      "Coming from a backend/infra background means the 'Ops' part of MLOps feels familiar. The 'ML' part is where I'm doing the work. Bridging the two is where it gets interesting.",
    items: [
      "ML pipeline design",
      "Model versioning & registries",
      "Experiment tracking (MLflow, W&B)",
      "Model serving patterns",
      "Data versioning (DVC)",
    ],
    reading: ["Designing ML Systems — Chip Huyen", "Made With ML"],
    note: "// the infra part I get. the model part: getting there.",
  },
  {
    area: "Rust",
    stage: "reading" as Stage,
    description:
      "I like Rust because it refuses to let you be sloppy. The borrow checker is a strict code reviewer who never takes a day off. I respect it. I also occasionally want to argue with it.",
    items: [
      "Ownership & borrowing",
      "Error handling (Result, Option)",
      "Traits & generics",
      "Async Rust (tokio)",
      "CLI tooling with clap",
    ],
    reading: ["The Rust Book", "Rust by Practice", "Error Handling in Rust"],
    note: "// current status: the borrow checker and I have an understanding",
  },
];

function StageIndicator({ current }: { current: Stage }) {
  const currentIdx = STAGE_ORDER.indexOf(current);
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center", marginBottom: "1.25rem" }}>
      {STAGE_ORDER.map((stage, i) => (
        <div key={stage} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div
            style={{
              width: i <= currentIdx ? "24px" : "8px",
              height: "3px",
              borderRadius: "2px",
              background:
                i < currentIdx
                  ? "var(--color-accent-dim)"
                  : i === currentIdx
                  ? "var(--color-accent)"
                  : "var(--color-border)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      ))}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.12em",
          color: "var(--color-accent)",
          marginLeft: "0.5rem",
          textTransform: "uppercase",
        }}
      >
        {STAGE_LABEL[current]}
      </span>
    </div>
  );
}

export default function Roadmap() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4.5rem, 9vw, 7rem) 0",
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container-main">
        <m.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
        >
          <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>[  ]</span>
          Learning roadmap
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--color-border)",
            }}
          />
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
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            What I&apos;m building toward
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
              maxWidth: "36ch",
              lineHeight: 1.6,
              textAlign: "right",
            }}
            className="roadmap-subtitle"
          >
            { `// updated ${new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}` }
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          {TRACKS.map(({ area, stage, description, items, reading, note }) => (
            <m.div
              key={area}
              variants={staggerItem}
              style={{
                background: "var(--color-background)",
                padding: "2rem",
                borderRight: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
            >
              {/* Area label */}
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  marginBottom: "0.75rem",
                }}
              >
                {area}
              </p>

              {/* Stage indicator */}
              <StageIndicator current={stage} />

              {/* Description */}
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.72,
                  marginBottom: "1.5rem",
                }}
              >
                {description}
              </p>

              {/* Learning items */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.6rem",
                  }}
                >
                  Topics
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--color-text-muted)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "0.1rem" }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reading */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.6rem",
                  }}
                >
                  Reading
                </p>
                {reading.map((r) => (
                  <p
                    key={r}
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-muted)",
                      fontFamily: "var(--font-mono)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    — {r}
                  </p>
                ))}
              </div>

              {/* Dry comment */}
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--color-text-muted)",
                  opacity: 0.6,
                  marginTop: "auto",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--color-border-subtle)",
                }}
              >
                {note}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .roadmap-subtitle { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}
