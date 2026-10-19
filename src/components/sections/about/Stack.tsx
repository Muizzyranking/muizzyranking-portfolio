"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

type Tier = "production" | "comfortable" | "exploring";

const GROUPS: { label: string; blurb: string; tags: { name: string; tier: Tier }[] }[] = [
  {
    label: "Languages",
    blurb: "What I reach for first.",
    tags: [
      { name: "Python", tier: "production" },
      { name: "TypeScript", tier: "production" },
      { name: "HTML", tier: "production" },
      { name: "JavaScript", tier: "comfortable" },
      { name: "Bash", tier: "comfortable" },
      { name: "C", tier: "comfortable" },
      { name: "Lua", tier: "comfortable" },
      { name: "Go", tier: "exploring" },
      { name: "Rust", tier: "exploring" },
    ],
  },
  {
    label: "Frameworks",
    blurb: "Backend first. A frontend when one is involved.",
    tags: [
      { name: "Django", tier: "production" },
      { name: "FastAPI", tier: "production" },
      { name: "Django Ninja", tier: "production" },
      { name: "Next.js", tier: "production" },
      { name: "Django REST Framework", tier: "comfortable" },
      { name: "Flask", tier: "comfortable" },
      { name: "React", tier: "comfortable" },
    ],
  },
  {
    label: "Data",
    blurb: "Postgres for everything until there is a real reason not to.",
    tags: [
      { name: "PostgreSQL", tier: "production" },
      { name: "MySQL", tier: "production" },
      { name: "Redis", tier: "production" },
      { name: "SQLAlchemy", tier: "production" },
      { name: "Django ORM", tier: "comfortable" },
      { name: "SQLite", tier: "comfortable" },
    ],
  },
  {
    label: "Infrastructure",
    blurb: "Repeatable deploys: a server, a container, a workflow.",
    tags: [
      { name: "Linux", tier: "production" },
      { name: "Docker", tier: "production" },
      { name: "Celery", tier: "comfortable" },
      { name: "Nginx", tier: "comfortable" },
      { name: "Uvicorn / Gunicorn", tier: "comfortable" },
      { name: "GitHub Actions", tier: "comfortable" },
    ],
  },
  {
    label: "Tooling",
    blurb: "The setup that survives a fresh install.",
    tags: [
      { name: "Neovim", tier: "comfortable" },
      { name: "Git", tier: "production" },
      { name: "Tmux", tier: "comfortable" },
      { name: "Zsh", tier: "comfortable" },
      { name: "fzf", tier: "comfortable" },
      { name: "ripgrep", tier: "comfortable" },
      { name: "lazygit", tier: "comfortable" },
    ],
  },
];

const TIER_DOT: Record<Tier, React.CSSProperties> = {
  production: { background: "var(--color-accent)", border: "none" },
  comfortable: { border: "1px solid var(--color-text-muted)" },
  exploring: { border: "1px dashed var(--color-text-muted)", background: "transparent" },
};

export default function Stack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      id="stack"
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
          Stack
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
            marginBottom: "1.25rem",
          }}
        >
          What I use to do the above.
        </m.h2>

        <m.p
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontSize: "1rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.7,
            maxWidth: "52ch",
            marginBottom: "3.5rem",
          }}
        >
          Not a boast, a working inventory. Grouped the way I think about a system, from the language down to the shell.
        </m.p>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            background: "var(--color-background)",
          }}
        >
          {GROUPS.map(({ label, blurb, tags }, idx) => (
            <m.div
              key={label}
              variants={staggerItem}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: "2.5rem",
                padding: "1.75rem 2rem",
                borderBottom: idx < GROUPS.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
                alignItems: "start",
              }}
              className="about-stack-row"
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {blurb}
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {tags.map(({ name, tier }) => (
                  <span
                    key={name}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      padding: "0.35rem 0.7rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      background: "var(--color-bg-elevated)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        display: "inline-block",
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        flexShrink: 0,
                        ...TIER_DOT[tier],
                      }}
                    />
                    {name}
                  </span>
                ))}
              </div>
            </m.div>
          ))}
        </m.div>

        <m.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
            marginTop: "1.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
          }}
        >
          {(["production", "comfortable", "exploring"] as Tier[]).map((tier) => (
            <span key={tier} style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  ...TIER_DOT[tier],
                }}
              />
              {tier}
            </span>
          ))}
        </m.div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .about-stack-row {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
            padding: 1.25rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
