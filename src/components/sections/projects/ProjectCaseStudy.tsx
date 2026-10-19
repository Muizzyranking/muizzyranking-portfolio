"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import ProjectMdx from "@/components/sections/projects/ProjectMdx";
import ScreenshotGallery from "@/components/sections/projects/ScreenshotGallery";
import { SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";
import type { Project, ProjectContent } from "@/types";

const STATUS_STYLE: Record<Project["status"], { label: string; color: string; border: string }> = {
  complete: {
    label: "complete",
    color: "var(--color-success)",
    border: "var(--color-accent-dim)",
  },
  "in-progress": {
    label: "in progress",
    color: "var(--color-accent)",
    border: "var(--color-accent-dim)",
  },
  archived: {
    label: "archived",
    color: "var(--color-text-muted)",
    border: "var(--color-border)",
  },
};

const GRID_STYLE = {
  backgroundImage:
    "linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
  opacity: 0.35,
  maskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
} as const;

export default function ProjectCaseStudy({
  meta,
  parsed,
  prev,
  next,
}: {
  meta: Project;
  parsed: ProjectContent;
  prev?: Project | null;
  next?: Project | null;
}) {
  const s = STATUS_STYLE[meta.status];
  const challengesRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const learnedRef = useRef<HTMLDivElement>(null);
  const challengesInView = useInView(challengesRef, SCROLL_REVEAL);
  const outcomesInView = useInView(outcomesRef, SCROLL_REVEAL);
  const learnedInView = useInView(learnedRef, SCROLL_REVEAL);
  const screenshots = meta.screenshots ?? [];

  return (
    <>
      {/* ── Header — grid backdrop, breadcrumb, italic title, faded year ── */}
      <div className="relative pt-[clamp(6rem,14vw,10rem)] pb-[clamp(3rem,6vw,5rem)] overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={GRID_STYLE} />

        <m.div
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[clamp(6rem,14vw,10rem)] right-[clamp(1.25rem,5vw,2.5rem)] left-[clamp(1.25rem,5vw,2.5rem)] origin-left"
          style={{ height: 1, background: "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)" }}
        />

        <div className="container-main relative z-[2]">
          {/* Breadcrumb */}
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.1em] text-text-muted"
          >
            <Link href="/projects" className="text-accent no-underline transition-opacity duration-150 hover:opacity-65">
              ~/projects
            </Link>
            <span className="opacity-40">/</span>
            <span>{meta.slug}</span>
          </m.div>

          {/* Title + year */}
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <m.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mb-5 font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-none font-bold tracking-[-0.045em] text-text-primary italic"
              >
                {meta.title}
              </m.h1>

              {meta.summary && (
                <m.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.17, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[60ch] text-[clamp(0.95rem,1.8vw,1.1rem)] leading-[1.65] text-text-secondary"
                >
                  {meta.summary}
                </m.p>
              )}
            </div>

            {/* Giant faded year badge */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="hidden shrink-0 font-mono text-[clamp(2rem,4vw,3rem)] leading-none font-bold tracking-[-0.04em] text-accent lg:block"
            >
              {meta.year}
            </m.div>
          </div>

          {/* Status + tags + links row */}
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4 border-t border-border-subtle pt-6"
          >
            <span
              className="flex items-center gap-[0.35rem] rounded-sm px-[0.55rem] py-[0.18rem] font-mono text-[0.62rem] uppercase tracking-[0.1em]"
              style={{ color: s.color, border: `1px solid ${s.border}` }}
            >
              <span className="h-1 w-1 rounded-full" style={{ background: s.color }} />
              {s.label}
            </span>

            <span aria-hidden="true" className="h-4 w-px bg-border" />

            <div className="flex flex-wrap gap-[0.35rem]">
              {meta.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-border-subtle bg-surface px-2 py-[0.2rem] font-mono text-[0.67rem] text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-3">
              {meta.live && (
                <a
                  href={meta.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[0.4rem] rounded-sm bg-accent px-4 py-[0.55rem] text-[0.78rem] font-semibold tracking-[0.03em] text-accent-foreground no-underline transition-opacity duration-150 hover:opacity-85"
                >
                  ↗ live
                </a>
              )}
              {meta.repo && (
                <a
                  href={meta.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[0.4rem] rounded-sm border border-border px-4 py-[0.55rem] font-mono text-[0.78rem] tracking-[0.03em] text-text-secondary no-underline transition-[border-color,color] duration-150 hover:border-accent-dim hover:text-text-primary"
                >
                  ⌥ source
                </a>
              )}
            </div>
          </m.div>
        </div>
      </div>

      {/* ── Body — content + sticky sidebar ── */}
      <div className="py-[clamp(3.5rem,7vw,6rem)]">
        <div className="container-main grid grid-cols-1 items-start gap-y-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-x-20">
          {/* Left — editorial content */}
          <div className="min-w-0">
            {/* Overview */}
            <m.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16"
            >
              <SectionLabel label="Overview" />
              <div className="case-body overview-body flex flex-col">
                <ProjectMdx source={parsed.overview} />
              </div>
            </m.section>

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <section className="mb-16">
                <SectionLabel label="Screenshots" />
                <ScreenshotGallery screenshots={screenshots} title={meta.title} />
              </section>
            )}

            {/* Challenges */}
            <div ref={challengesRef} className="mb-16">
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={challengesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionLabel label="Challenges" />
              </m.div>

              {parsed.challenges.length > 0 && (
                <m.div variants={staggerContainer} initial="hidden" animate={challengesInView ? "visible" : "hidden"} className="flex flex-col gap-6">
                  {parsed.challenges.map((challenge, i) => (
                    <m.div
                      key={challenge.title}
                      variants={staggerItem}
                      whileHover={{ y: -2, borderColor: "var(--color-accent-dim)" }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="challenge-card relative rounded-lg border border-border bg-bg-elevated px-7 py-6"
                    >
                      <span aria-hidden="true" className="absolute top-6 right-6 font-mono text-[0.65rem] tracking-[0.1em] text-accent opacity-50">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mb-3 pr-8 font-display text-base leading-[1.3] font-semibold tracking-[-0.02em] text-text-primary">
                        {challenge.title}
                      </h3>
                      <div className="challenge-body">
                        <ProjectMdx source={challenge.body} />
                      </div>
                    </m.div>
                  ))}
                </m.div>
              )}
            </div>

            {/* Outcomes */}
            <div ref={outcomesRef} className="mb-16">
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={outcomesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionLabel label="Outcomes" />
                <div className="case-body">
                  <ProjectMdx source={parsed.outcomes} />
                </div>
              </m.div>
            </div>

            {/* What I learned — the accent panel */}
            <div ref={learnedRef}>
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={learnedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionLabel label="What I learned" />

                <m.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={learnedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-lg border border-accent-dim bg-accent-subtle p-8"
                >
                  <div className="case-body learned-body">
                    <ProjectMdx source={parsed.learned} />
                  </div>
                </m.div>
              </m.div>
            </div>
          </div>

          {/* Right — sticky sidebar (definition sheet) */}
          <aside className="detail-sidebar static max-lg:order-first lg:sticky lg:top-24" aria-label="Project details">
            <m.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 overflow-hidden rounded-lg border border-border bg-surface">
                {[
                  { label: "Year", value: meta.year },
                  { label: "Status", value: s.label, accent: true },
                  { label: "Featured", value: meta.featured ? "Yes" : "No" },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="flex items-center justify-between border-b border-border-subtle px-5 py-[0.875rem]">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-muted">{label}</span>
                    <span className="font-mono text-[0.75rem] tracking-[0.04em]" style={{ color: accent ? s.color : "var(--color-text-secondary)" }}>
                      {value}
                    </span>
                  </div>
                ))}

                <div className="px-5 py-4">
                  <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-muted">Stack</p>
                  <div className="flex flex-wrap gap-[0.35rem]">
                    {meta.stack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm border border-border-subtle bg-background px-2 py-[0.2rem] font-mono text-[0.68rem] text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {meta.live && (
                  <a
                    href={meta.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-md bg-accent py-3 font-mono text-[0.75rem] font-semibold tracking-[0.08em] text-accent-foreground no-underline transition-opacity duration-150 hover:opacity-85"
                  >
                    ↗ View live
                  </a>
                )}
                {meta.repo && (
                  <a
                    href={meta.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-md border border-border bg-transparent py-3 font-mono text-[0.75rem] tracking-[0.08em] text-text-secondary no-underline transition-[border-color,color] duration-150 hover:border-accent-dim hover:text-text-primary"
                  >
                    ⌥ View source
                  </a>
                )}
                <Link
                  href="/projects"
                  className="mt-1 flex justify-center rounded-md py-3 font-mono text-[0.72rem] tracking-[0.08em] text-text-muted no-underline transition-colors duration-150 hover:text-accent"
                >
                  ← all projects
                </Link>
              </div>
            </m.div>
          </aside>
        </div>
      </div>

      {/* Prev / next */}
      {(prev || next) && (
        <nav className="border-t border-border-subtle" aria-label="Project navigation">
          <div className="container-main grid gap-8 py-12 sm:grid-cols-2">
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group min-w-0">
                <span className="mb-2 block font-mono text-[0.68rem] lowercase text-text-muted transition-colors duration-150 group-hover:text-accent">
                  ← previous
                </span>
                <span className="block font-display text-[1.05rem] leading-[1.3] font-semibold text-text-primary italic transition-colors duration-200 group-hover:text-accent">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}

            {next ? (
              <Link href={`/projects/${next.slug}`} className="group min-w-0 sm:text-right">
                <span className="mb-2 block font-mono text-[0.68rem] lowercase text-text-muted transition-colors duration-150 group-hover:text-accent">
                  next →
                </span>
                <span className="block font-display text-[1.05rem] leading-[1.3] font-semibold text-text-primary italic transition-colors duration-200 group-hover:text-accent">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </div>
        </nav>
      )}

      <style>{`
        .case-body p:last-child,
        .case-body ul:last-child,
        .case-body ol:last-child {
          margin-bottom: 0;
        }
        .overview-body p:first-of-type {
          font-weight: 500;
          color: var(--color-text-primary);
        }
        .learned-body p:first-of-type {
          font-style: italic;
        }
        .challenge-body p {
          font-size: 0.88rem;
          line-height: 1.78;
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <h2 style={{ fontSize: "1.5rem" }}>{label}</h2>
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, var(--color-accent), transparent)" }} />
    </div>
  );
}
