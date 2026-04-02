"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL } from "@/lib/motion";

const MILESTONES = [
  {
    year: "2021",
    title: "HTML, then JavaScript",
    body: "Started with HTML, then wrote my first line of JavaScript. Things worked. I didn't know why. That bothered me more than it should have.",
    tag: "origin",
  },
  {
    year: "2022",
    title: "ALX & C",
    body: "Joined ALX (full-stack, leaned backend) and wrote my first line of C. It slowed me down in a good way — memory, pointers, and what the machine is actually doing. Also picked up Python around this time.",
    tag: "foundations",
  },
  {
    year: "2022",
    title: "Terminal era",
    body: "Started writing Bash scripts and struggling with Vim. The first few weeks were… humbling. Eventually it clicked. Now it's home.",
    tag: "tooling",
  },
  {
    year: "2023",
    title: "First real users",
    body: "Worked on a booking system people actually used. It broke once. I fixed it under pressure. Learned more in that moment than in months of building alone.",
    tag: "production",
  },
  {
    year: "2024",
    title: "Thinking in systems",
    body: "Started seeing things less as features and more as systems — APIs, background jobs, data flow, and failure modes.",
    tag: "systems",
  },
  {
    year: "2025",
    title: "The AI thread",
    body: "Started pulling on the LLM thread. One paper led to five more. Sleep schedule took a hit. Still worth it.",
    tag: "AI/ML",
  },
  {
    year: "2026 →",
    title: "Leaning into it",
    body: "Focusing on AI/ML and MLOps. Building, writing, and figuring things out in public. Also learning Rust, because apparently I enjoy difficulty.",
    tag: "now",
    current: true,
  },
];

const TAG_COLORS: Record<string, string> = {
  origin: "#4a7c59",
  backend: "#5a8a6a",
  production: "#3d6b4a",
  tooling: "#4a7c59",
  systems: "#3d6b4a",
  "AI/ML": "#4a7c59",
  now: "#4a7c59",
};

export default function Journey() {
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
        {/* Eyebrow */}
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
          The journey
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--color-border)",
            }}
          />
        </m.p>

        <m.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "3.5rem",
            maxWidth: "32ch",
          }}
        >
          Not a career page.{" "}
          <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>
            The actual story.
          </span>
        </m.h2>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
          {/* Animated vertical line */}
          <m.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              position: "absolute",
              left: 0,
              top: "0.5rem",
              bottom: 0,
              width: "1px",
              background:
                "linear-gradient(to bottom, var(--color-accent) 0%, var(--color-border) 70%, transparent 100%)",
              transformOrigin: "top",
            }}
          />

          {MILESTONES.map((m_item, i) => (
            <m.div
              key={m_item.title}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{
                delay: 0.2 + i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: "relative",
                paddingBottom: i < MILESTONES.length - 1 ? "2.75rem" : 0,
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: "2rem",
                alignItems: "start",
              }}
              className="milestone-row"
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-2.75rem",
                  top: "0.45rem",
                  width: m_item.current ? "11px" : "8px",
                  height: m_item.current ? "11px" : "8px",
                  borderRadius: "50%",
                  background: m_item.current
                    ? "var(--color-accent)"
                    : "var(--color-surface)",
                  border: `1px solid ${m_item.current ? "var(--color-accent)" : "var(--color-border)"}`,
                  boxShadow: m_item.current
                    ? "0 0 0 3px var(--color-accent-subtle)"
                    : undefined,
                  transition: "all 0.2s",
                }}
              />

              {/* Year */}
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: m_item.current
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                    letterSpacing: "0.06em",
                    display: "block",
                    paddingTop: "0.1rem",
                  }}
                >
                  {m_item.year}
                </span>
              </div>

              {/* Content */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "0.4rem",
                    flexWrap: "wrap",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {m_item.title}
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      color: TAG_COLORS[m_item.tag] ?? "var(--color-accent)",
                      border: `1px solid ${TAG_COLORS[m_item.tag] ?? "var(--color-accent-dim)"}`,
                      borderRadius: "var(--radius-sm)",
                      padding: "0.12rem 0.45rem",
                      opacity: 0.8,
                    }}
                  >
                    {m_item.tag}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.72,
                    maxWidth: "58ch",
                  }}
                >
                  {m_item.body}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .milestone-row {
            grid-template-columns: 70px 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
