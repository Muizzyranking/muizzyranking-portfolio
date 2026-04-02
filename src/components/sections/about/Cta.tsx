"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { EMAIL } from "@/lib/data";
import { fadeUp, SCROLL_REVEAL } from "@/lib/motion";

export default function AboutCTA() {
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
          <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>
            [ 07 ]
          </span>
          What&apos;s next
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
            gap: "1px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
          className="cta-grid"
        >
          {/* ── See the work */}
          <m.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              padding: "3rem",
              background: "var(--color-surface)",
              borderRight: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
              }}
            >
              See the work
            </p>
            <h3
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
                color: "var(--color-text-primary)",
              }}
            >
              Projects that{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                shipped.
              </em>
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                maxWidth: "38ch",
              }}
            >
              Things I built, problems I solved, and at least one project that
              exists because I was tired of doing something manually.
            </p>
            <Link
              href="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                paddingInline: "1.5rem",
                paddingBlock: "0.8rem",
                background: "var(--color-accent)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.85rem",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "opacity 0.2s, transform 0.2s",
                alignSelf: "flex-start",
                marginTop: "0.5rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View all projects →
            </Link>
          </m.div>

          {/* ── Get in touch */}
          <m.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              padding: "3rem",
              background: "var(--color-background)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
              }}
            >
              Get in touch
            </p>
            <h3
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
                color: "var(--color-text-primary)",
              }}
            >
              Let&apos;s build something{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                interesting.
              </em>
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                maxWidth: "38ch",
              }}
            >
              Open to backend roles, AI/ML work, and conversations that
              don&apos;t start with &ldquo;circling back.&rdquo; Hard problems
              preferred.
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                marginTop: "0.5rem",
              }}
            >
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  paddingInline: "1.5rem",
                  paddingBlock: "0.8rem",
                  background: "transparent",
                  color: "var(--color-text-secondary)",
                  fontSize: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.02em",
                  transition: "border-color 0.2s, color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  e.currentTarget.style.color = "var(--color-text-primary)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                say hello →
              </a>
              <a
                href="/resume.pdf"
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  paddingInline: "1.25rem",
                  paddingBlock: "0.8rem",
                  background: "transparent",
                  color: "var(--color-text-muted)",
                  fontSize: "0.82rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border-subtle)",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-accent)";
                  e.currentTarget.style.borderColor = "var(--color-accent-dim)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-muted)";
                  e.currentTarget.style.borderColor =
                    "var(--color-border-subtle)";
                }}
              >
                résumé ↓
              </a>
            </div>
          </m.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .cta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
