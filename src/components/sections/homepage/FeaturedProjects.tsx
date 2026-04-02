"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL } from "@/lib/motion";
import type { Project } from "@/lib/projects";

const STATUS_STYLES: Record<Project["status"], { color: string; border: string; label: string }> = {
  complete: {
    color: "var(--color-success)",
    border: "var(--color-accent-dim)",
    label: "complete",
  },
  "in-progress": {
    color: "#c9a84c",
    border: "#8a6f2e",
    label: "in progress",
  },
  archived: {
    color: "var(--color-text-muted)",
    border: "var(--color-border)",
    label: "archived",
  },
};

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      id="projects"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) 0",
        borderTop: "1px solid var(--color-border-subtle)",
        borderBottom: "1px solid var(--color-border-subtle)",
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
          Projects
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--color-border)",
            }}
          />
        </m.p>

        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <m.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Things I&apos;ve shipped
          </m.h2>

          <m.div variants={fadeUp} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <Link
              href="/projects"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.76rem",
                color: "var(--color-accent)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.65";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
            >
              all projects →
            </Link>
          </m.div>
        </div>

        {/* Project cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          {projects.slice(0, 3).map((project, i) => {
            const status = STATUS_STYLES[project.status];
            return (
              <m.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  delay: 0.15 + i * 0.12,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ backgroundColor: "var(--color-surface-raised)" }}
                style={{
                  background: "var(--color-background)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  borderRight: "1px solid var(--color-border)",
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: status.color,
                      border: `1px solid ${status.border}`,
                      borderRadius: "var(--radius-sm)",
                      padding: "0.18rem 0.5rem",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {status.label}
                  </span>
                </div>

                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "0.875rem",
                    lineHeight: 1.68,
                    flex: 1,
                  }}
                >
                  {project.summary}
                </p>

                {/* Stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {project.stack.map((s) => (
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

                {/* Links */}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--color-border-subtle)",
                    marginTop: "auto",
                  }}
                >
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.08em",
                        color: "var(--color-text-muted)",
                        textDecoration: "none",
                        transition: "color 0.2s",
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
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.08em",
                        color: "var(--color-text-muted)",
                        textDecoration: "none",
                        transition: "color 0.2s",
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
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.08em",
                      color: "var(--color-text-muted)",
                      textDecoration: "none",
                      marginLeft: "auto",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                    }}
                  >
                    read more →
                  </Link>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
