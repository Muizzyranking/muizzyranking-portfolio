"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL } from "@/lib/motion";
import type { Milestone } from "@/types";

const TAG_COLORS: Record<string, string> = {
  origin: "#4a7c59",
  foundations: "#5a8a6a",
  tooling: "#4a7c59",
  production: "#3d6b4a",
  systems: "#3d6b4a",
  "AI/ML": "#4a7c59",
  now: "#4a7c59",
};

export default function Journey({ milestones }: { milestones: Milestone[] }) {
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
          <span className="eyebrow__mark">[ 03 ]</span>
          The journey
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
            marginBottom: "3.5rem",
            maxWidth: "32ch",
          }}
        >
          Not a career page. <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>The actual story.</span>
        </m.h2>

        <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
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
              background: "linear-gradient(to bottom, transparent 0%, var(--color-border) 25%, var(--color-accent) 100%)",
              transformOrigin: "top",
            }}
          />

          {milestones.map((mItem, i) => (
            <m.div
              key={`${mItem.year}-${mItem.title}`}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{
                delay: 0.2 + i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: "relative",
                paddingBottom: i < milestones.length - 1 ? "2.75rem" : 0,
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: "2rem",
                alignItems: "start",
              }}
              className="milestone-row"
            >
              <div
                style={{
                  position: "absolute",
                  left: "-2.75rem",
                  top: "0.45rem",
                  width: mItem.current ? "11px" : "8px",
                  height: mItem.current ? "11px" : "8px",
                  borderRadius: "50%",
                  background: mItem.current ? "var(--color-accent)" : "var(--color-surface)",
                  border: `1px solid ${mItem.current ? "var(--color-accent)" : "var(--color-border)"}`,
                  boxShadow: mItem.current ? "0 0 0 3px var(--color-accent-subtle)" : undefined,
                  transition: "all 0.2s",
                }}
              />

              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: mItem.current ? "var(--color-accent)" : "var(--color-text-muted)",
                    letterSpacing: "0.06em",
                    display: "block",
                    paddingTop: "0.1rem",
                  }}
                >
                  {mItem.year}
                </span>
              </div>

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
                    {mItem.title}
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      color: TAG_COLORS[mItem.tag] ?? "var(--color-accent)",
                      border: `1px solid ${TAG_COLORS[mItem.tag] ?? "var(--color-accent-dim)"}`,
                      borderRadius: "var(--radius-sm)",
                      padding: "0.12rem 0.45rem",
                      opacity: 0.8,
                    }}
                  >
                    {mItem.tag}
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
                  {mItem.body}
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
