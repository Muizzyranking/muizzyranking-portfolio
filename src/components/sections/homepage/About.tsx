"use client";

import { m, useInView } from "framer-motion";

import { useRef } from "react";
import {
  fadeUp,
  SCROLL_REVEAL,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

const SIDEBAR_CARDS = [
  {
    label: "Current setup",
    body: (
      <>
        <code>nvim</code> + <code>tmux</code> + <code>lazygit</code> +{" "}
        <code>zsh</code>. If it doesn&apos;t have a terminal interface, I&apos;m
        suspicious of it.
      </>
    ),
  },
  {
    label: "Currently exploring",
    chips: ["LLMs", "Rust", "Machine Learning", "MLOps", "Statistics"],
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
    <section
      ref={ref}
      id="about"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) 0",
        borderTop: "1px solid var(--color-border-subtle)",
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
            marginBottom: "2rem",
          }}
        >
          <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>
            [  ]
          </span>
          About
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
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          <div>
            <m.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                fontSize: "clamp(1.9rem, 3.8vw, 2.75rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                color: "var(--color-text-primary)",
              }}
            >
              I listen well.{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                I build better.
              </em>
            </m.h2>

            {[
              <>
                Backend engineer with a few years of building the invisible
                infrastructure — the APIs, queues, and pipelines nobody claps
                for.{" "}
                <strong style={{ color: "var(--color-text-primary)" }}>
                  I&apos;m now pivoting into AI/ML and MLOps
                </strong>
                , because if you&apos;re going to be obsessed with systems, you
                might as well be obsessed with the most interesting ones.
              </>,
              <>
                I&apos;m a good listener. The kind that actually pays attention
                — not the kind waiting for their turn to talk. I notice details
                most people skip. Terrible at small talk, but I&apos;ll go deep
                on distributed systems, the history of computing, or{" "}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.88em",
                    color: "var(--color-text-muted)",
                  }}
                >
                  why the sky isn&apos;t actually blue.*
                </span>
              </>,
            ].map((text, i) => (
              <m.p
                // biome-ignore lint/suspicious/noArrayIndexKey: index is fine
                key={i}
                variants={fadeUp}
                custom={i + 2}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.78,
                  marginBottom: "1rem",
                  fontSize: "0.96rem",
                }}
              >
                {text}
              </m.p>
            ))}

            <m.p
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.76rem",
                color: "var(--color-text-muted)",
                marginTop: "0.25rem",
              }}
            >
              * It is. I just wanted to see if you were paying attention.
            </m.p>

            <m.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ marginTop: "2rem" }}
            >
              <a
                href="/about"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.08em",
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--color-accent-dim)",
                  paddingBottom: "0.15rem",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.65";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                more about me →
              </a>
            </m.div>
          </div>

          {/* ── RIGHT — sidebar cards */}
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {SIDEBAR_CARDS.map(({ label, body, chips }) => (
              <m.div
                key={label}
                variants={staggerItem}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.63rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {label}
                </p>

                {body && (
                  <p
                    style={{
                      color: "var(--color-text-secondary)",
                      fontSize: "0.87rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {body}
                  </p>
                )}

                {chips && (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
                  >
                    {chips.map((c) => (
                      <span
                        key={c}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "var(--color-text-muted)",
                          border: "1px solid var(--color-border)",
                          borderRadius: "var(--radius-sm)",
                          padding: "0.25rem 0.6rem",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </m.div>
            ))}

            {/* Perfectionist card — personality */}
            <m.div
              variants={staggerItem}
              style={{
                background: "var(--color-accent-subtle)",
                border: "1px solid var(--color-accent-dim)",
                borderRadius: "var(--radius-lg)",
                padding: "1.25rem 1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.63rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-accent-dim)",
                  marginBottom: "0.5rem",
                }}
              >
                Philosophy
              </p>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "0.87rem",
                  lineHeight: 1.65,
                }}
              >
                Perfectionist. Lazy about it. The combination somehow always
                works.
              </p>
            </m.div>
          </m.div>
        </div>
      </div>

      <style>{`
        .about-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        code {
          font-family: var(--font-mono);
          font-size: 0.82em;
          color: var(--color-accent);
          background: var(--color-accent-subtle);
          padding: 0.1em 0.4em;
          border-radius: var(--radius-sm);
        }
      `}</style>
    </section>
  );
}
