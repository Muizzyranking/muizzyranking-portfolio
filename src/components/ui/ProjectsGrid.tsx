"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
  stats: { total: number; complete: number; inProgress: number };
};

const STATUS: Record<Project["status"], { label: string; color: string; border: string; dot: string }> = {
  complete: {
    label: "complete",
    color: "var(--color-success)",
    border: "var(--color-accent-dim)",
    dot: "var(--color-accent)",
  },
  "in-progress": {
    label: "in progress",
    color: "#c9a84c",
    border: "#8a6f2e",
    dot: "#c9a84c",
  },
  archived: {
    label: "archived",
    color: "var(--color-text-muted)",
    border: "var(--color-border)",
    dot: "var(--color-border)",
  },
};

function ProjectCard({ project }: { project: Project; index: number }) {
  const s = STATUS[project.status];

  return (
    <m.div variants={staggerItem} style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          background: "var(--color-background)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "1.75rem",
          textDecoration: "none",
          color: "inherit",
          transition: "border-color 0.2s, transform 0.2s, background 0.2s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Main card link - covers entire card */}
        <Link
          href={`/projects/${project.slug}`}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget.parentElement as HTMLElement;
            el.style.borderColor = "var(--color-accent-dim)";
            el.style.transform = "translateY(-3px)";
            el.style.background = "var(--color-surface)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget.parentElement as HTMLElement;
            el.style.borderColor = "var(--color-border)";
            el.style.transform = "translateY(0)";
            el.style.background = "var(--color-background)";
          }}
        >
          <span style={{ position: "absolute", inset: 0 }} />
        </Link>

        {/* Featured indicator */}
        {project.featured && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "3px",
              height: "100%",
              background: "linear-gradient(to bottom, var(--color-accent), transparent)",
              borderRadius: "var(--radius-lg) 0 0 var(--radius-lg)",
            }}
          />
        )}

        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "0.75rem",
            marginBottom: "0.875rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: "var(--color-text-muted)",
            }}
          >
            {project.year}
          </span>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: s.color,
              border: `1px solid ${s.border}`,
              borderRadius: "var(--radius-sm)",
              padding: "0.15rem 0.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: s.dot,
                flexShrink: 0,
              }}
            />
            {s.label}
          </span>
        </div>

        {/* Title */}
        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            lineHeight: 1.3,
            marginBottom: "0.75rem",
            position: "relative",
            zIndex: 2,
          }}
          className="project-card-title"
        >
          {project.title}
        </p>

        {/* Summary */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            flex: 1,
            marginBottom: "1.25rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {project.summary}
        </p>

        {/* Stack tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.35rem",
            marginBottom: "1.25rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {project.stack.slice(0, 5).map((s) => (
            <span
              key={s}
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
              {s}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.67rem",
                color: "var(--color-text-muted)",
                padding: "0.2rem 0.5rem",
              }}
            >
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* Footer links */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            paddingTop: "1rem",
            borderTop: "1px solid var(--color-border-subtle)",
            position: "relative",
            zIndex: 3,
          }}
        >
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                color: "var(--color-text-muted)",
                textDecoration: "none",
                transition: "color 0.15s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
              }}
            >
              ↗ live
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                color: "var(--color-text-muted)",
                textDecoration: "none",
                transition: "color 0.15s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
              }}
            >
              ⌥ source
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            style={{
              marginLeft: "auto",
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--color-accent)",
              letterSpacing: "0.06em",
              textDecoration: "none",
              position: "relative",
            }}
          >
            read more →
          </Link>
        </div>
      </div>
    </m.div>
  );
}

export default function ProjectsGrid({ projects, stats }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const gridInView = useInView(gridRef, SCROLL_REVEAL);

  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div
        ref={headerRef}
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

        {/* Top rule */}
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
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
            <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>~/projects</span>
            <span
              style={{
                display: "inline-block",
                width: "32px",
                height: "1px",
                background: "var(--color-border)",
              }}
            />
            all work
          </m.p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <m.h1
              initial={{ opacity: 0, y: 14 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              <span style={{ color: "var(--color-accent)", display: "block" }}>Things</span>
              <span
                style={{
                  color: "var(--color-text-primary)",
                  display: "block",
                  fontStyle: "italic",
                }}
              >
                I&apos;ve shipped.
              </span>
            </m.h1>

            {/* Stat pills */}
            <m.div
              initial={{ opacity: 0, x: 12 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
            >
              {[
                { label: "total", value: stats.total },
                { label: "shipped", value: stats.complete },
                { label: "cooking", value: stats.inProgress },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                  }}
                >
                  <span
                    style={{
                      padding: "0.3rem 0.6rem",
                      background: "var(--color-surface)",
                      color: "var(--color-text-muted)",
                      letterSpacing: "0.08em",
                      borderRight: "1px solid var(--color-border)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      padding: "0.3rem 0.7rem",
                      color: "var(--color-text-secondary)",
                      fontWeight: 600,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </div>

      {/* ── PROJECTS GRID ── */}
      <div
        ref={gridRef}
        style={{
          padding: "clamp(3rem, 6vw, 5rem) 0 clamp(5rem, 10vw, 8rem)",
        }}
      >
        <div className="container-main">
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1rem",
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </m.div>

          {projects.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "5rem 0",
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-muted)",
                fontSize: "0.82rem",
              }}
            >
              <p style={{ marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--color-accent)" }}>$</span> ls ./projects
              </p>
              <p>{"// nothing here yet. check back soon."}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`.project-card-title { transition: color 0.2s; }
        div:hover .project-card-title { color: var(--color-accent) !important; }

        @media (max-width: 640px) {
          [style*="repeat(auto-fill"] {
            grid-template-columns: 1fr !important;
          }
        }`}</style>
    </>
  );
}
