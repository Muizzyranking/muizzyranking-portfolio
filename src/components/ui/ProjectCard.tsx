"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ position: "relative" }}
    >
      {/* Top border line */}
      <div style={{ height: "1px", backgroundColor: "var(--color-border-subtle)" }} />

      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "3rem 1fr",
          gap: "1.5rem",
          paddingBlock: "2rem",
          paddingInline: "1rem",
          position: "relative",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        {/* Left accent bar — grows in on hover */}
        <motion.div
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          initial={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
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

        {/* Index */}
        <motion.span
          animate={{ color: hovered ? "var(--color-accent)" : "var(--color-text-muted)" }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            paddingTop: "0.2rem",
            userSelect: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Content */}
        <div style={{ minWidth: 0 }}>

          {/* Title row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBlockEnd: "0.6rem",
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
                fontSize: "1.1rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                margin: 0,
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
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {project.year}
              </span>

              <motion.span
                animate={{
                  x: hovered ? 4 : 0,
                  opacity: hovered ? 1 : 0.25,
                  color: hovered
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
                }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: "0.85rem" }}
              >
                →
              </motion.span>
            </div>
          </div>

          {/* Summary — always visible */}
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              margin: 0,
              lineHeight: 1.65,
              marginBlockEnd: "1rem",
              maxWidth: "64ch",
            }}
          >
            {project.summary}
          </p>

          {/* Stack — always visible, lights up on hover */}
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
                    : "var(--color-background)",
                }}
                transition={{ duration: 0.15, delay: i * 0.03 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.06em",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border-subtle)",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </Link>

      {/* Bottom reveal line — animates left to right on hover */}
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
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
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
