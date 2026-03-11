"use client";
import { m } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function AboutOpening() {
  return (
    <SectionWrapper>
      <div style={{
        position: "relative",
        marginBlockEnd: "8rem",
        paddingBlockEnd: "5rem",
      }}>

        {/* Horizontal rule — mirrors hero */}
        <m.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            height: "1px",
            background: "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)",
            transformOrigin: "left",
            marginBlockEnd: "3rem",
          }}
        />

        {/* Eyebrow */}
        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            margin: "0 0 1.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ 00 ]</span>
          About
          <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--color-border)", verticalAlign: "middle" }} />
          Muiz Oyebowale
        </m.p>

        {/* Heading */}
        <m.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            margin: "0 0 2.5rem",
          }}
        >
          <span style={{ color: "var(--color-accent)", display: "block" }}>I build the parts</span>
          <span style={{ color: "var(--color-text-primary)", display: "block" }}>nobody sees.</span>
        </m.h1>

        {/* Body + metadata — two column */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "start",
        }}>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-primary)",
              lineHeight: 1.85,
              margin: 0,
              maxWidth: "52ch",
              fontWeight: 500,
            }}
          >
            Backend engineer. I care about systems that handle real users,
            real money, and real failure modes —
            <span style={{ color: "var(--color-text-secondary)", fontWeight: 400 }}> the kind of work that has to be correct, not just functional.</span>
          </m.p>

          {/* Right metadata — mirrors hero sidebar */}
          <m.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              paddingLeft: "2rem",
              borderLeft: "1px solid var(--color-border-subtle)",
            }}
          >
            {[
              { label: "Role", value: "Backend Eng." },
              { label: "Stack", value: "Go / Python" },
              { label: "Status", value: "Open" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-text-muted)", margin: "0 0 0.25rem" }}>
                  {label}
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-text-secondary)", margin: 0 }}>
                  {value}
                </p>
              </div>
            ))}
          </m.div>
        </div>

        {/* Bottom divider */}
        <div style={{
          marginBlockStart: "5rem",
          height: "1px",
          background: "linear-gradient(to right, var(--color-accent), var(--color-border-subtle), transparent)",
        }} />
      </div>
    </SectionWrapper>
  );
}
