"use client";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import type { Experience } from "@/lib/experience";

export default function AboutExperience({ experiences }: { experiences: Experience[] }) {
  return (
    <SectionWrapper>
      <div style={{ marginBlockEnd: "8rem" }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          margin: "0 0 3rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}>
          <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ 03 ]</span>
          Experience
        </p>

        <div style={{ position: "relative" }}>
          {/* Track line */}
          <div style={{
            position: "absolute",
            left: "7rem",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "linear-gradient(to bottom, var(--color-accent-dim), var(--color-border-subtle) 80%, transparent)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "7rem 1fr",
                  gap: "2.5rem",
                  alignItems: "start",
                  position: "relative",
                }}
              >
                {/* Period */}
                <div style={{ textAlign: "right", paddingRight: "2rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-accent)", letterSpacing: "0.08em", lineHeight: 1.6, display: "block" }}>
                    {exp.period.start}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-text-muted)", letterSpacing: "0.06em", display: "block" }}>
                    {exp.period.end}
                  </span>
                </div>

                {/* Node dot */}
                <div style={{
                  position: "absolute",
                  left: "calc(7rem - 4px)",
                  top: "0.3rem",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  backgroundColor: i === 0 ? "var(--color-accent)" : "var(--color-border)",
                  border: `2px solid ${i === 0 ? "var(--color-accent-dim)" : "var(--color-border-subtle)"}`,
                  boxShadow: i === 0 ? "0 0 8px color-mix(in srgb, var(--color-accent) 40%, transparent)" : "none",
                }} />

                {/* Content */}
                <div style={{
                  padding: "1.25rem",
                  backgroundColor: i === 0 ? "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface))" : "var(--color-surface)",
                  borderRadius: "var(--radius-md)",
                  border: `1px solid ${i === 0 ? "var(--color-accent-dim)" : "var(--color-border-subtle)"}`,
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Top accent — only on most recent */}
                  {i === 0 && (
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: "1.25rem",
                      right: "1.25rem",
                      height: "1px",
                      background: "linear-gradient(to right, var(--color-accent), transparent)",
                    }} />
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBlockEnd: "0.35rem" }}>
                    <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>
                      {exp.company}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                      backgroundColor: "var(--color-background)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border-subtle)",
                    }}>
                      {exp.type}
                    </span>
                  </div>

                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-text-secondary)", display: "block", marginBlockEnd: "0.6rem" }}>
                    {exp.role}
                  </span>

                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.75, margin: 0 }}>
                    {exp.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
