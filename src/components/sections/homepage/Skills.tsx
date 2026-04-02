"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

const SKILL_GROUPS = [
  {
    label: "Languages",
    skills: [
      { name: "Python", exploring: false },
      { name: "TypeScript", exploring: false },
      { name: "JavaScript", exploring: false },
      { name: "Go", exploring: false },
      { name: "C", exploring: false },
      { name: "Lua", exploring: false },
      { name: "Bash", exploring: false },
      { name: "HTML / CSS", exploring: false },
      { name: "Rust", exploring: true },
    ],
  },
  {
    label: "Frameworks",
    skills: [
      { name: "FastAPI", exploring: false },
      { name: "Django", exploring: false },
      { name: "DRF", exploring: false },
      { name: "Django Ninja", exploring: false },
      { name: "Flask", exploring: false },
      { name: "Next.js", exploring: false },
      { name: "React", exploring: false },
      { name: "Tailwind", exploring: false },
    ],
  },
  {
    label: "Tools & Infra",
    skills: [
      { name: "Docker", exploring: false },
      { name: "PostgreSQL", exploring: false },
      { name: "Redis", exploring: false },
      { name: "Celery", exploring: false },
      { name: "Nginx", exploring: false },
      { name: "Linux", exploring: false },
      { name: "Git / GitHub", exploring: false },
      { name: "Neovim", exploring: false },
      { name: "Postman / curl", exploring: false },
    ],
  },
  {
    label: "Exploring",
    skills: [
      { name: "LLMs", exploring: true },
      { name: "Machine Learning", exploring: true },
      { name: "MLOps", exploring: true },
      { name: "Statistics", exploring: true },
      { name: "Rust", exploring: true },
      { name: "AI Finance", exploring: true },
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      id="skills"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) 0",
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border-subtle)",
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
            marginBottom: "2rem",
          }}
        >
          <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>[  ]</span>
          Skills
          <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--color-border)" }} />
        </m.p>

        <div style={{ marginBottom: "3rem" }}>
          <m.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "0.4rem",
            }}
          >
            The stack
          </m.h2>
        </div>

        {/* Grid of skill groups — border-collapsed look */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          {SKILL_GROUPS.map(({ label, skills }) => (
            <m.div
              key={label}
              variants={staggerItem}
              style={{
                background: "var(--color-background)",
                padding: "1.75rem",
                borderRight: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.63rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                }}
              >
                {label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {skills.map(({ name, exploring }) => (
                  <span
                    key={name}
                    role="img"
                    aria-hidden="true" 
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.74rem",
                      color: exploring ? "var(--color-text-muted)" : "var(--color-text-secondary)",
                      background: "var(--color-surface)",
                      border: `1px ${exploring ? "dashed" : "solid"} var(--color-border)`,
                      borderRadius: "var(--radius-sm)",
                      padding: "0.28rem 0.65rem",
                      transition: "border-color 0.2s, color 0.2s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent-dim)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                      (e.currentTarget as HTMLElement).style.color = exploring
                        ? "var(--color-text-muted)"
                        : "var(--color-text-secondary)";
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
