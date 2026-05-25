"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

type Tier = "primary" | "secondary" | "exploring";

interface Tag {
  name: string;
  tier: Tier;
}

interface Group {
  label: string;
  blurb: string;
  tags: Tag[];
}

const GROUPS: Group[] = [
  {
    label: "Languages",
    blurb: "What I reach for first. Rust is the one I'm currently learning to argue with.",
    tags: [
      { name: "Python", tier: "primary" },
      { name: "TypeScript", tier: "primary" },
      { name: "JavaScript", tier: "secondary" },
      { name: "Go", tier: "secondary" },
      { name: "C", tier: "secondary" },
      { name: "Lua", tier: "secondary" },
      { name: "Bash", tier: "secondary" },
      { name: "HTML / CSS", tier: "secondary" },
      { name: "Rust", tier: "exploring" },
    ],
  },
  {
    label: "Frameworks",
    blurb: "Mostly Django and FastAPI on the backend. Next.js on the frontend when one is involved.",
    tags: [
      { name: "Django", tier: "primary" },
      { name: "FastAPI", tier: "primary" },
      { name: "Next.js", tier: "primary" },
      { name: "Django REST Framework", tier: "secondary" },
      { name: "Django Ninja", tier: "secondary" },
      { name: "Flask", tier: "secondary" },
      { name: "React", tier: "secondary" },
      { name: "Tailwind", tier: "secondary" },
    ],
  },
  {
    label: "Infrastructure",
    blurb: "What I'd reach for if you handed me a server today. PostgreSQL, Redis, and Docker do most of the lifting.",
    tags: [
      { name: "PostgreSQL", tier: "primary" },
      { name: "Redis", tier: "primary" },
      { name: "Docker", tier: "primary" },
      { name: "Celery", tier: "secondary" },
      { name: "Nginx", tier: "secondary" },
      { name: "Cloudinary", tier: "secondary" },
      { name: "Linux (Arch / Ubuntu)", tier: "secondary" },
      { name: "GitHub Actions", tier: "secondary" },
    ],
  },
];

function tagStyles(tier: Tier): React.CSSProperties {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    borderRadius: "var(--radius-sm)",
    padding: "0.32rem 0.7rem",
    transition: "border-color 0.2s, color 0.2s, background 0.2s",
    cursor: "default",
  };

  if (tier === "primary") {
    return {
      ...base,
      fontSize: "0.85rem",
      fontWeight: 600,
      color: "var(--color-text-primary)",
      background: "var(--color-bg-elevated)",
      border: "1px solid var(--color-accent-dim)",
    };
  }
  if (tier === "secondary") {
    return {
      ...base,
      fontSize: "0.78rem",
      color: "var(--color-text-secondary)",
      background: "var(--color-bg-elevated)",
      border: "1px solid var(--color-border)",
    };
  }
  return {
    ...base,
    fontSize: "0.78rem",
    color: "var(--color-text-muted)",
    background: "transparent",
    border: "1px dashed var(--color-border)",
  };
}

export default function Stack() {
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
          style={{ marginBottom: "2rem" }}
        >
          <span className="eyebrow__mark">[ 01 ]</span>
          The stack
          <span className="eyebrow__rule" />
        </m.p>

        <m.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: "0.5rem",
          }}
        >
          Languages &amp; frameworks
        </m.h2>

        <m.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--color-text-muted)",
            marginBottom: "3rem",
          }}
        >
          {"// solid border = production-ready · dashed = still in the oven (let me cook)"}
        </m.p>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
        >
          {GROUPS.map(({ label, blurb, tags }) => (
            <m.div key={label} variants={staggerItem}>
              <div className="flex items-baseline gap-3 flex-wrap mb-3">
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.66rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "0.86rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {blurb}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t.name} className="stack-tag" data-tier={t.tier} style={tagStyles(t.tier)}>
                    {t.name}
                  </span>
                ))}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>

      <style>{`
        .stack-tag {
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          cursor: default;
        }
        .stack-tag:hover {
          border-color: var(--color-accent) !important;
          color: var(--color-text-primary) !important;
        }
      `}</style>
    </section>
  );
}
