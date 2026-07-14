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
    label: "languages",
    blurb: "What I reach for first. Rust is the one I'm currently learning to argue with.",
    tags: [
      { name: "Python", tier: "primary" },
      { name: "TypeScript", tier: "primary" },
      { name: "HTML / CSS", tier: "primary" },
      { name: "JavaScript", tier: "secondary" },
      { name: "Bash", tier: "secondary" },
      { name: "C", tier: "secondary" },
      { name: "Lua", tier: "secondary" },
      { name: "Go", tier: "exploring" },
      { name: "Rust", tier: "exploring" },
    ],
  },
  {
    label: "frameworks",
    blurb: "Mostly Django and FastAPI on the backend. Next.js on the frontend when one is involved.",
    tags: [
      { name: "Django", tier: "primary" },
      { name: "FastAPI", tier: "primary" },
      { name: "Next.js", tier: "primary" },
      { name: "Django Ninja", tier: "primary" },
      { name: "Django REST Framework", tier: "secondary" },
      { name: "Flask", tier: "secondary" },
      { name: "React", tier: "secondary" },
      { name: "Tailwind", tier: "secondary" },
    ],
  },
  {
    label: "infrastructure",
    blurb: "What I'd reach for if you handed me a server today. PostgreSQL, Redis, and Docker do most of the lifting.",
    tags: [
      { name: "Linux (Arch / Ubuntu)", tier: "primary" },
      { name: "PostgreSQL", tier: "primary" },
      { name: "Redis", tier: "primary" },
      { name: "Docker", tier: "primary" },
      { name: "Celery", tier: "secondary" },
      { name: "Nginx", tier: "secondary" },
      { name: "Cloudinary", tier: "secondary" },
      { name: "GitHub Actions", tier: "secondary" },
    ],
  },
];

const TIER_CONFIG: Record<Tier, { symbol: string; className: string }> = {
  primary: { symbol: "◆", className: "stack-tag--primary" },
  secondary: { symbol: "◇", className: "stack-tag--secondary" },
  exploring: { symbol: "○", className: "stack-tag--exploring" },
};

export default function Stack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      className="section-band section-band--elevated"
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
            marginBottom: "3rem",
          }}
        >
          Languages &amp; frameworks
        </m.h2>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {GROUPS.map(({ label, blurb, tags }) => (
            <m.div
              key={label}
              variants={staggerItem}
              className="stack-section"
            >
              {/* Section header */}
              <div className="stack-section__header">
                <span className="stack-section__prompt">$</span>
                <span className="stack-section__label">{label}</span>
                <span className="stack-section__count">{tags.length} packages</span>
              </div>

              {/* Blurb as comment */}
              <p className="stack-section__blurb">
                <span className="stack-section__comment">{"//"}</span> {blurb}
              </p>

              {/* Tags */}
              <div className="stack-section__tags">
                {tags.map((t, i) => {
                  const tier = TIER_CONFIG[t.tier];
                  return (
                    <span
                      key={`${t.name}-${i}`}
                      className={`stack-tag ${tier.className}`}
                    >
                      <span className="stack-tag__icon">{tier.symbol}</span>
                      {t.name}
                    </span>
                  );
                })}
              </div>

              {/* Tier legend */}
              <div className="stack-section__legend">
                <span className="stack-legend__item">
                  <span className="stack-tag__icon stack-tag__icon--primary">◆</span>
                  production
                </span>
                <span className="stack-legend__item">
                  <span className="stack-tag__icon stack-tag__icon--secondary">◇</span>
                  comfortable
                </span>
                <span className="stack-legend__item">
                  <span className="stack-tag__icon stack-tag__icon--exploring">○</span>
                  exploring
                </span>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>

      <style>{`
        .stack-section {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .stack-section:hover {
          border-color: var(--color-accent-dim);
        }

        .stack-section__header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .stack-section__prompt {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-accent);
        }
        .stack-section__label {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-primary);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .stack-section__count {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
        }

        .stack-section__blurb {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin: 0;
        }
        .stack-section__comment {
          color: var(--color-accent-dim);
          opacity: 0.7;
        }

        .stack-section__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding-top: 0.25rem;
        }

        .stack-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          background: var(--color-bg-elevated);
          color: var(--color-text-secondary);
          transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
        }
        .stack-tag:hover {
          border-color: var(--color-accent);
          color: var(--color-text-primary);
          transform: translateY(-1px);
        }

        .stack-tag__icon {
          font-size: 0.55rem;
          line-height: 1;
        }
        .stack-tag__icon--primary { color: var(--color-accent); }
        .stack-tag__icon--secondary { color: var(--color-text-muted); }
        .stack-tag__icon--exploring { color: var(--color-text-muted); opacity: 0.5; }

        .stack-tag--primary {
          border-color: var(--color-accent-dim);
          background: var(--color-accent-subtle);
          color: var(--color-text-primary);
          font-weight: 500;
        }
        .stack-tag--primary:hover {
          background: var(--color-accent-dim);
          border-color: var(--color-accent);
        }

        .stack-tag--secondary {
          border-color: var(--color-border);
          background: var(--color-bg-elevated);
        }

        .stack-tag--exploring {
          border-style: dashed;
          background: transparent;
          color: var(--color-text-muted);
        }

        .stack-section__legend {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--color-border-subtle);
          margin-top: 0.25rem;
        }
        .stack-legend__item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--color-text-muted);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        @media (max-width: 600px) {
          .stack-section {
            padding: 1.25rem;
          }
          .stack-section__header {
            flex-wrap: wrap;
          }
          .stack-section__count {
            width: 100%;
            margin-left: 0;
            margin-top: 0.25rem;
          }
          .stack-tag {
            font-size: 0.72rem;
            padding: 0.35rem 0.6rem;
          }
        }
      `}</style>
    </section>
  );
}
