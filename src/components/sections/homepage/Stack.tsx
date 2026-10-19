"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/sections/homepage/SectionHeader";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";

type Tier = "production" | "comfortable" | "exploring";

type Group = {
  label: string;
  blurb: string;
  tags: { name: string; tier: Tier }[];
};

const GROUPS: Group[] = [
  {
    label: "Languages",
    blurb: "What I reach for first. Rust is the one I'm currently learning to argue with.",
    tags: [
      { name: "Python", tier: "production" },
      { name: "TypeScript", tier: "production" },
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
    blurb: "Mostly Django and FastAPI on the backend. Next.js on the frontend when one is involved.",
    tags: [
      { name: "Django", tier: "production" },
      { name: "FastAPI", tier: "production" },
      { name: "Django Ninja", tier: "production" },
      { name: "Django REST Framework", tier: "comfortable" },
      { name: "Flask", tier: "comfortable" },
      { name: "React", tier: "comfortable" },
      { name: "Next.js", tier: "production" },
    ],
  },
  {
    label: "Infrastructure",
    blurb: "PostgreSQL, Redis, and Docker do most of the lifting on a fresh server.",
    tags: [
      { name: "PostgreSQL", tier: "production" },
      { name: "Redis", tier: "production" },
      { name: "Docker", tier: "production" },
      { name: "Celery", tier: "comfortable" },
      { name: "Nginx", tier: "comfortable" },
      { name: "GitHub Actions", tier: "comfortable" },
      { name: "Linux", tier: "production" },
    ],
  },
];

const TIER_STYLES: Record<Tier, string> = {
  production: "bg-accent-subtle border-accent-dim text-text-primary",
  comfortable: "bg-bg-elevated border-border text-text-secondary",
  exploring: "border-dashed border-border bg-transparent text-text-muted",
};

const TIER_DOT: Record<Tier, string> = {
  production: "bg-accent",
  comfortable: "border border-text-muted",
  exploring: "border border-text-muted/50 rounded-full",
};

export default function Stack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <section ref={ref} className="section section-band">
      <div className="container-main">
        <SectionHeader eyebrow="Stack" title="The tools I use." />

        <m.div
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {GROUPS.map((group) => (
            <div key={group.label} className="rounded-lg bg-bg-elevated border border-border p-7 flex flex-col">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent mb-2">{group.label}</p>
              <p className="text-text-muted text-[0.85rem] leading-[1.6] mb-6">{group.blurb}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {group.tags.map((tag) => (
                  <span key={tag.name} className={`font-mono text-[0.72rem] border rounded-sm px-2 py-[0.25rem] ${TIER_STYLES[tag.tier]}`}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </m.div>

        <m.div
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.16 }}
          className="flex items-center gap-6 flex-wrap mt-8 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-text-muted"
        >
          {(["production", "comfortable", "exploring"] as Tier[]).map((tier) => (
            <span key={tier} className="inline-flex items-center gap-2">
              <span className={`inline-block size-2 rounded-full ${TIER_DOT[tier]}`} aria-hidden="true" />
              {tier}
            </span>
          ))}
        </m.div>
      </div>
    </section>
  );
}
