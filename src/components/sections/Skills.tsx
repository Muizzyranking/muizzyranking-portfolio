"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const skillGroups = [
  {
    category: "Languages",
    description: "What I think in",
    icon: "{ }",
    skills: ["Python", "Go", "Bash", "SQL", "TypeScript"],
    accent: "var(--color-accent)",
    accentSubtle: "var(--color-accent-subtle)",
    accentDim: "var(--color-accent-dim)",
  },
  {
    category: "Frameworks",
    description: "What I build with",
    icon: "⌬",
    skills: ["Django", "Django REST Framework", "Django Ninja", "FastAPI"],
    accent: "#6b8f71",
    accentSubtle: "#0e1a0f",
    accentDim: "#2a4a2e",
  },
  {
    category: "Infrastructure",
    description: "What keeps it running",
    icon: "⬡",
    skills: ["PostgreSQL", "Redis", "Celery", "Docker", "Nginx"],
    accent: "#7b8fa6",
    accentSubtle: "#0e1218",
    accentDim: "#2a3a4a",
  },
  {
    category: "Tools & Workflow",
    description: "How I actually work",
    icon: "⌘",
    skills: ["Neovim", "Git", "GitHub Actions", "Linux", "Postman"],
    accent: "#a67b6b",
    accentSubtle: "#1a100e",
    accentDim: "#4a2a20",
  },
  {
    category: "Exploring",
    description: "Where I'm headed",
    icon: "◎",
    skills: ["Rust", "Machine Learning", "Statistics", "LLM APIs"],
    accent: "#9b7ec8",
    accentSubtle: "#130e1a",
    accentDim: "#3a2a4a",
  },
];

export default function Skills() {
  return (
    <section className="section">
      <div className="container-main">
        <div style={{ marginBlockEnd: "3rem" }}>
          <p className="mono-label" style={{ marginBlockEnd: "0.5rem" }}>
            Toolkit
          </p>
          <h2 style={{ margin: 0 }}>Skills</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Top row — 3 cards equal width */}
          <div className="skills-grid-top">
            {skillGroups.slice(0, 3).map((group, i) => (
              <SkillCard key={group.category} group={group} index={i} />
            ))}
          </div>
          {/* Bottom row — 2 cards stretched to same total width */}
          <div className="skills-grid-bottom">
            {skillGroups.slice(3).map((group, i) => (
              <SkillCard key={group.category} group={group} index={i + 3} />
            ))}
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-text-muted)",
            marginBlockStart: "1.5rem",
            opacity: 0.4,
          }}
        >
          :wq
        </p>
      </div>
    </section>
  );
}

function SkillCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[0];
  index: number;
}) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        position: "relative",
        padding: "1.5rem",
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border-subtle)",
        overflow: "hidden",
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100px",
          height: "100px",
          background: `radial-gradient(circle at top right, ${group.accent}18, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "1.5rem",
          right: "1.5rem",
          height: "1px",
          background: `linear-gradient(to right, ${group.accent}, transparent)`,
        }}
      />

      {/* Header — icon + category + description */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          marginBlockEnd: "1.25rem",
        }}
      >
        {/* Icon */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1.1rem",
            color: group.accent,
            lineHeight: 1,
            paddingTop: "0.15rem",
            flexShrink: 0,
            opacity: 0.9,
          }}
        >
          {group.icon}
        </span>

        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: group.accent,
              margin: 0,
              marginBlockEnd: "0.25rem",
              fontWeight: 500,
            }}
          >
            {group.category}
          </p>
          <p
            style={{
              fontSize: "0.78rem",
              color: "var(--color-text-primary)",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            {group.description}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {group.skills.map((skill, i) => (
          <motion.span
            key={skill}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            animate={{
              backgroundColor:
                hoveredSkill === skill
                  ? group.accentSubtle
                  : "var(--color-background)",
              borderColor:
                hoveredSkill === skill
                  ? group.accent
                  : "var(--color-border-subtle)",
              color:
                hoveredSkill === skill
                  ? group.accent
                  : "var(--color-text-muted)",
              y: hoveredSkill === skill ? -2 : 0,
            }}
            transition={{ duration: 0.15 }}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.04em",
              padding: "0.3rem 0.7rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border-subtle)",
              cursor: "default",
              userSelect: "none",
              transitionDelay: `${i * 0.03}s`,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
