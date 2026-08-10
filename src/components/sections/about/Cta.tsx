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
        <m.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="eyebrow"
          style={{ marginBottom: "3rem" }}
        >
          What&apos;s next
          <span className="eyebrow__rule" />
        </m.p>

        <m.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "0.5rem",
            maxWidth: "24ch",
          }}
        >
          If you got here, you read <em style={{ fontStyle: "italic", color: "var(--color-accent)", fontWeight: 500 }}>enough.</em>
        </m.h2>

        <m.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontSize: "0.95rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.7,
            maxWidth: "48ch",
            marginBottom: "3rem",
          }}
        >
          Three doors. Pick one.
        </m.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
          className="cta-grid"
        >
          {/* See the work */}
          <m.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ y: -2, backgroundColor: "var(--color-surface)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: "2.5rem 2rem",
              background: "var(--color-bg-elevated)",
              borderRight: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
            className="cta-card"
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
              [ 01 ] The work
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Projects that <em style={{ fontStyle: "italic", color: "var(--color-accent)", fontWeight: 500 }}>shipped.</em>
            </h3>
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.65,
                flex: 1,
              }}
            >
              Things I built. The interesting decisions behind them.
            </p>
            <Link
              href="/projects"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                color: "var(--color-accent)",
                letterSpacing: "0.06em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                marginTop: "0.5rem",
              }}
              className="group"
            >
              all projects
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </m.div>

          {/* Daily driver */}
          <m.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ y: -2, backgroundColor: "var(--color-surface)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: "2.5rem 2rem",
              background: "var(--color-bg-elevated)",
              borderRight: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
            className="cta-card"
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
              [ 02 ] The toolbox
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              What I <em style={{ fontStyle: "italic", color: "var(--color-accent)", fontWeight: 500 }}>reach for.</em>
            </h3>
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.65,
                flex: 1,
              }}
            >
              Languages, tools, the setup that survives a fresh install.
            </p>
            <Link
              href="/about#stack"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                color: "var(--color-accent)",
                letterSpacing: "0.06em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                marginTop: "0.5rem",
              }}
              className="group"
            >
              the stack
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </m.div>

          {/* Get in touch */}
          <m.div
            variants={fadeUp}
            custom={5}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ y: -2, backgroundColor: "var(--color-surface)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: "2.5rem 2rem",
              background: "var(--color-bg-elevated)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
            className="cta-card"
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
              [ 03 ] Say hi
            </p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.3rem, 2.4vw, 1.7rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Backend roles. AI/ML work. <em style={{ fontStyle: "italic", color: "var(--color-accent)", fontWeight: 500 }}>Interesting problems.</em>
            </h3>
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.65,
                flex: 1,
              }}
            >
              Bonus points if it doesn&apos;t start with &ldquo;circling back.&rdquo;
            </p>
            <div className="flex flex-wrap items-center gap-3" style={{ marginTop: "0.5rem" }}>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.88rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.06em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "opacity 0.2s",
                }}
                className="group"
              >
                email me
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <span style={{ color: "var(--color-text-muted)", opacity: 0.4 }}>·</span>
              <a
                href="/Muiz-Oyebowale-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.88rem",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.06em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "color 0.2s",
                }}
                className="hover:text-text-primary"
              >
                résumé
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
              </a>
            </div>
          </m.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cta-grid { grid-template-columns: 1fr !important; }
          .cta-card { border-right: none !important; border-bottom: 1px solid var(--color-border); }
          .cta-card:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
