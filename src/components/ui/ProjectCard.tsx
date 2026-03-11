"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ position: "relative" }}
    >
      {/* Top border */}
      <div style={{ height: "1px", backgroundColor: "var(--color-border-subtle)" }} />

      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "4rem 1fr",
          gap: "1.5rem",
          paddingBlock: "2rem",
          paddingInline: "1rem",
          position: "relative",
          textDecoration: "none",
          cursor: "pointer",
          borderRadius: "var(--radius-md)",
          transition: "background-color 0.3s ease",
          backgroundColor: hovered
            ? "color-mix(in srgb, var(--color-accent) 4%, var(--color-surface))"
            : "transparent",
        }}
      >
        {/* Left accent bar */}
        <motion.div
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          initial={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: 0,
            top: "1.5rem",
            bottom: "1.5rem",
            width: "2px",
            backgroundColor: "var(--color-accent)",
            transformOrigin: "top",
            borderRadius: "2px",
          }}
        />

        {/* Index — bigger, more architectural */}
        <div style={{ paddingTop: "0.15rem" }}>
          <motion.span
            animate={{
              color: hovered ? "var(--color-accent)" : "var(--color-border)",
            }}
            transition={{ duration: 0.25 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.6rem",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              userSelect: "none",
              display: "block",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </div>

        {/* Content */}
        <div style={{ minWidth: 0 }}>

          {/* Title row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBlockEnd: "0.65rem",
              gap: "1rem",
            }}
          >
            <motion.h3
              animate={{
                color: hovered
                  ? "var(--color-accent)"
                  : "var(--color-text-primary)",
              }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: "1.15rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </motion.h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexShrink: 0,
                paddingTop: "0.1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.1em",
                }}
              >
                {project.year}
              </span>

              <motion.span
                animate={{
                  x: hovered ? 5 : 0,
                  opacity: hovered ? 1 : 0.2,
                  color: hovered
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: "1rem", display: "block" }}
              >
                →
              </motion.span>
            </div>
          </div>

          {/* Summary */}
          <motion.p
            animate={{
              color: hovered
                ? "var(--color-text-primary)"
                : "var(--color-text-secondary)",
            }}
            transition={{ duration: 0.25 }}
            style={{
              fontSize: "0.9rem",
              margin: 0,
              lineHeight: 1.7,
              marginBlockEnd: "1.1rem",
              maxWidth: "62ch",
            }}
          >
            {project.summary}
          </motion.p>

          {/* Stack tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.stack.map((tech, i) => (
              <motion.span
                key={tech}
                animate={{
                  color: hovered
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
                  borderColor: hovered
                    ? "var(--color-accent-dim)"
                    : "var(--color-border-subtle)",
                  backgroundColor: hovered
                    ? "var(--color-accent-subtle)"
                    : "transparent",
                }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border-subtle)",
                  textTransform: "uppercase",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </Link>

      {/* Bottom reveal line */}
      <div style={{ position: "relative", height: "1px" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-border-subtle)",
          }}
        />
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-accent)",
            transformOrigin: "left",
          }}
        />
      </div>
    </motion.div>
  );
}
