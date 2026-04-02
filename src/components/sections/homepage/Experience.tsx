"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import type { Experience } from "@/lib/experience";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

type Props = {
  experiences: Experience[];
};

function formatPeriod(start: string, end: string) {
  return `${start} — ${end === "present" ? "Present" : end}`;
}

export default function ExperienceSection({ experiences }: Props) {
  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      id="experience"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) 0",
        borderTop: "1px solid var(--color-border-subtle)",
        background: "var(--color-surface)",
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
          <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>[ ]</span>
          Experience
          <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--color-border)" }} />
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
          }}
        >
          Where I&apos;ve built things
        </m.h2>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "2.25rem" }}>
          <m.div
            ref={lineRef}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{
              position: "absolute",
              left: 0,
              top: "0.4rem",
              bottom: 0,
              width: "1px",
              background: "linear-gradient(to bottom, var(--color-accent) 0%, var(--color-border) 60%, transparent 100%)",
              transformOrigin: "top",
            }}
          />

          <m.div variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"}>
            {experiences.map((exp, i) => (
              <m.div
                key={`${exp.company}-${i}`}
                variants={staggerItem}
                style={{
                  position: "relative",
                  paddingBottom: i < experiences.length - 1 ? "3.5rem" : 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-2.55rem",
                    top: "0.45rem",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    border: "2px solid var(--color-background)",
                    boxShadow: `0 0 0 1px var(--color-accent-dim)`,
                  }}
                />

                {/* Meta row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.1em",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {formatPeriod(exp.period.start, exp.period.end)}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.63rem",
                      color: "var(--color-accent)",
                      border: "1px solid var(--color-accent-dim)",
                      borderRadius: "var(--radius-sm)",
                      padding: "0.12rem 0.5rem",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {exp.type}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.63rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {exp.location}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "1.08rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    marginBottom: "0.2rem",
                    lineHeight: 1.3,
                  }}
                >
                  {exp.role}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--color-accent)",
                    marginBottom: "0.85rem",
                  }}
                >
                  {exp.company}
                </p>

                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.9rem",
                    lineHeight: 1.72,
                    maxWidth: "64ch",
                    marginBottom: "0.85rem",
                  }}
                >
                  {exp.summary}
                </p>

                {/* Highlights  */}
                {exp.highlights?.length > 0 && (
                  <ul
                    style={{
                      paddingLeft: "1rem",
                      marginBottom: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                    }}
                  >
                    {exp.highlights.map((h, _) => (
                      <li
                        key={h.slice(0, 30)}
                        style={{
                          color: "var(--color-text-muted)",
                          fontSize: "0.85rem",
                          lineHeight: 1.6,
                          listStyleType: "none",
                          position: "relative",
                          paddingLeft: "1rem",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: "var(--color-accent)",
                          }}
                        >
                          ›
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {exp.stack.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "var(--color-text-muted)",
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border-subtle)",
                        borderRadius: "var(--radius-sm)",
                        padding: "0.2rem 0.5rem",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
