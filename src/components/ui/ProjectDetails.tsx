"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";
import type { Project, ProjectContent } from "@/lib/projects";

type Props = {
  meta: Project;
  parsed: ProjectContent;
};

const STATUS_STYLE: Record<Project["status"], { label: string; color: string; border: string }> = {
  complete: {
    label: "complete",
    color: "var(--color-success)",
    border: "var(--color-accent-dim)",
  },
  "in-progress": {
    label: "in progress",
    color: "#c9a84c",
    border: "#8a6f2e",
  },
  archived: {
    label: "archived",
    color: "var(--color-text-muted)",
    border: "var(--color-border)",
  },
};

export default function ProjectDetail({ meta, parsed }: Props) {
  const s = STATUS_STYLE[meta.status];
  const challengesRef = useRef<HTMLDivElement>(null);
  const learnedRef = useRef<HTMLDivElement>(null);
  const challengesInView = useInView(challengesRef, SCROLL_REVEAL);
  const learnedInView = useInView(learnedRef, SCROLL_REVEAL);

  return (
    <>
      {/* ── HERO ── */}
      <div
        style={{
          position: "relative",
          paddingTop: "clamp(6rem, 14vw, 10rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
          borderBottom: "1px solid var(--color-border-subtle)",
          overflow: "hidden",
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            opacity: 0.35,
            pointerEvents: "none",
            maskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
          }}
        />

        <m.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: "clamp(6rem, 14vw, 10rem)",
            left: "clamp(1.5rem, 5vw, 4rem)",
            right: "clamp(1.5rem, 5vw, 4rem)",
            height: "1px",
            background: "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)",
            transformOrigin: "left",
          }}
        />

        <div className="container-main" style={{ position: "relative", zIndex: 2 }}>
          {/* Breadcrumb */}
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              color: "var(--color-text-muted)",
              marginBottom: "2.5rem",
            }}
          >
            <Link
              href="/projects"
              style={{
                color: "var(--color-accent)",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.65";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
            >
              ~/projects
            </Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{meta.slug}</span>
          </m.div>

          {/* Title + meta row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              alignItems: "flex-end",
            }}
            className="hero-title-row"
          >
            <div>
              <m.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "1.25rem",
                }}
              >
                <span style={{ color: "var(--color-text-primary)", fontStyle: "italic" }}>{meta.title}</span>
              </m.h1>

              <m.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.17, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                  maxWidth: "60ch",
                }}
              >
                {meta.summary}
              </m.p>
            </div>

            {/* Year badge */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "var(--color-accent)",
                opacity: 0.15,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                flexShrink: 0,
              }}
              className="year-badge"
            >
              {meta.year}
            </m.div>
          </div>

          {/* Tags + status + links row */}
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--color-border-subtle)",
            }}
          >
            {/* Status */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: s.color,
                border: `1px solid ${s.border}`,
                borderRadius: "var(--radius-sm)",
                padding: "0.18rem 0.55rem",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: s.color,
                }}
              />
              {s.label}
            </span>

            {/* Divider */}
            <span
              style={{
                width: "1px",
                height: "16px",
                background: "var(--color-border)",
              }}
            />

            {/* Stack */}
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
              {meta.stack.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.67rem",
                    color: "var(--color-text-muted)",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.2rem 0.5rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links — pushed right */}
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              {meta.live && (
                <a
                  href={meta.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    paddingInline: "1rem",
                    paddingBlock: "0.55rem",
                    background: "var(--color-accent)",
                    color: "#fff",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    borderRadius: "var(--radius-sm)",
                    textDecoration: "none",
                    transition: "opacity 0.15s",
                    letterSpacing: "0.03em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                >
                  ↗ live
                </a>
              )}
              {meta.repo && (
                <a
                  href={meta.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    paddingInline: "1rem",
                    paddingBlock: "0.55rem",
                    background: "transparent",
                    color: "var(--color-text-secondary)",
                    fontSize: "0.78rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--color-border)",
                    textDecoration: "none",
                    fontFamily: "var(--font-mono)",
                    transition: "border-color 0.15s, color 0.15s",
                    letterSpacing: "0.03em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent-dim)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                  }}
                >
                  ⌥ source
                </a>
              )}
            </div>
          </m.div>
        </div>
      </div>

      {/* ── CONTENT BODY — two column on desktop ── */}
      <div
        style={{
          padding: "clamp(3.5rem, 7vw, 6rem) 0",
        }}
      >
        <div
          className="container-main"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 260px",
            gap: "5rem",
            alignItems: "start",
          }}
          id="content-grid"
        >
          {/* ── LEFT — editorial content ── */}
          <div>
            {/* Overview */}
            <m.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: "4rem" }}
            >
              <SectionLabel label="Overview" />
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {parsed.overview.split("\n\n").map((para, i) => (
                  <p
                    key={para.slice(0, 10)}
                    style={{
                      fontSize: "0.96rem",
                      color: i === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      lineHeight: 1.82,
                      fontWeight: i === 0 ? 500 : 400,
                    }}
                  >
                    {para.trim()}
                  </p>
                ))}
              </div>
            </m.section>

            {/* Challenges */}
            <div ref={challengesRef} style={{ marginBottom: "4rem" }}>
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={challengesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionLabel label="Challenges" />
              </m.div>

              <m.div
                variants={staggerContainer}
                initial="hidden"
                animate={challengesInView ? "visible" : "hidden"}
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                {parsed.challenges.map((challenge, i) => (
                  <m.div
                    key={challenge.title}
                    variants={staggerItem}
                    style={{
                      padding: "1.5rem 1.75rem",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
                      position: "relative",
                    }}
                  >
                    {/* Number marker */}
                    <span
                      style={{
                        position: "absolute",
                        top: "1.5rem",
                        right: "1.5rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "var(--color-accent)",
                        opacity: 0.5,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <p
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        marginBottom: "0.75rem",
                        lineHeight: 1.35,
                        paddingRight: "2rem",
                      }}
                    >
                      {challenge.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.78,
                      }}
                    >
                      {challenge.body}
                    </p>
                  </m.div>
                ))}
              </m.div>
            </div>

            {/* Learned */}
            <div ref={learnedRef}>
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={learnedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionLabel label="What I learned" />
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={learnedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: "2rem",
                  background: "var(--color-accent-subtle)",
                  border: "1px solid var(--color-accent-dim)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                {parsed.learned.split("\n\n").map((para, i) => (
                  <p
                    key={para.slice(0, 10)}
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.82,
                      marginBottom: i < parsed.learned.split("\n\n").length - 1 ? "1rem" : 0,
                      fontStyle: i === 0 ? "italic" : "normal",
                    }}
                  >
                    {para.trim()}
                  </p>
                ))}
              </m.div>
            </div>
          </div>

          {/* ── RIGHT — sticky sidebar ── */}
          <div style={{ position: "sticky", top: "6rem" }} className="detail-sidebar">
            <m.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Meta card */}
              <div
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  marginBottom: "1rem",
                }}
              >
                {[
                  { label: "Year", value: meta.year },
                  { label: "Status", value: s.label, accent: true },
                  { label: "Type", value: "Side project" },
                ].map(({ label, value, accent }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.875rem 1.25rem",
                      borderBottom: "1px solid var(--color-border-subtle)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: accent ? s.color : "var(--color-text-secondary)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}

                {/* Stack list in sidebar */}
                <div style={{ padding: "1rem 1.25rem" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Stack
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {meta.stack.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.68rem",
                          color: "var(--color-text-muted)",
                          background: "var(--color-background)",
                          border: "1px solid var(--color-border-subtle)",
                          borderRadius: "var(--radius-sm)",
                          padding: "0.2rem 0.5rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {meta.live && (
                  <a
                    href={meta.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem",
                      background: "var(--color-accent)",
                      color: "#fff",
                      borderRadius: "var(--radius-md)",
                      textDecoration: "none",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      fontWeight: 600,
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.85";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                  >
                    ↗ View live
                  </a>
                )}
                {meta.repo && (
                  <a
                    href={meta.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem",
                      background: "transparent",
                      color: "var(--color-text-secondary)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-border)",
                      textDecoration: "none",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      transition: "border-color 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent-dim)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                    }}
                  >
                    ⌥ View source
                  </a>
                )}
                <Link
                  href="/projects"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "0.75rem",
                    color: "var(--color-text-muted)",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    transition: "color 0.15s",
                    marginTop: "0.25rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                  }}
                >
                  ← all projects
                </Link>
              </div>
            </m.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #content-grid {
            grid-template-columns: 1fr !important;
          }
          .detail-sidebar {
            position: static !important;
            order: -1;
          }
          .year-badge { display: none !important; }
          .hero-title-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          color: "var(--color-accent)",
          opacity: 0.7,
          letterSpacing: "0.1em",
        }}
      >
        [ ]
      </span>
      <h2
        style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </h2>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(to right, var(--color-border), transparent)",
        }}
      />
    </div>
  );
}
