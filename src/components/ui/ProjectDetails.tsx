"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";
import type { Project, ProjectDetailsProps } from "@/types";

const STATUS_STYLE: Record<Project["status"], { label: string; color: string; border: string }> = {
  complete: {
    label: "complete",
    color: "var(--color-success)",
    border: "var(--color-accent-dim)",
  },
  "in-progress": {
    label: "in progress",
    color: "#c9a84c",
    border: "#8a6f2e",
  },
  archived: {
    label: "archived",
    color: "var(--color-text-muted)",
    border: "var(--color-border)",
  },
};

export default function ProjectDetail({ meta, parsed }: ProjectDetailsProps) {
  const s = STATUS_STYLE[meta.status];
  const challengesRef = useRef<HTMLDivElement>(null);
  const learnedRef = useRef<HTMLDivElement>(null);
  const challengesInView = useInView(challengesRef, SCROLL_REVEAL);
  const learnedInView = useInView(learnedRef, SCROLL_REVEAL);

  return (
    <>
      {/* ── HERO ── */}
      <div className="relative pt-[clamp(6rem,14vw,10rem)] pb-[clamp(3rem,6vw,5rem)] border-b border-border-subtle overflow-hidden">
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            opacity: 0.35,
            maskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
          }}
        />

        <m.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[clamp(6rem,14vw,10rem)] left-[clamp(1.5rem,5vw,4rem)] right-[clamp(1.5rem,5vw,4rem)] h-px origin-left"
          style={{
            background: "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)",
          }}
        />

        <div className="container-main relative z-[2]">
          {/* Breadcrumb */}
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.1em] text-text-muted mb-10"
          >
            <Link href="/projects" className="text-accent no-underline transition-opacity duration-150 hover:opacity-65">
              ~/projects
            </Link>
            <span className="opacity-40">/</span>
            <span>{meta.slug}</span>
          </m.div>

          {/* Title + meta row */}
          <div className="hero-title-row grid grid-cols-[1fr_auto] gap-8 items-end max-[900px]:grid-cols-1">
            <div>
              <m.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold tracking-[-0.045em] leading-none mb-5 text-[clamp(2.2rem,5.5vw,4rem)]"
              >
                <span className="italic text-text-primary">{meta.title}</span>
              </m.h1>

              <m.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.17, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(0.95rem,1.8vw,1.1rem)] text-text-secondary leading-[1.65] max-w-[60ch]"
              >
                {meta.summary}
              </m.p>
            </div>

            {/* Year badge */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="year-badge hidden max-[900px]:hidden font-mono text-[clamp(2rem,4vw,3rem)] font-bold text-accent opacity-15 tracking-[-0.04em] leading-none shrink-0"
            >
              {meta.year}
            </m.div>
          </div>

          {/* Tags + status + links row */}
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 flex-wrap mt-8 pt-6 border-t border-border-subtle"
          >
            {/* Status */}
            <span
              className="font-mono text-[0.62rem] tracking-[0.1em] uppercase flex items-center gap-[0.35rem] rounded-sm px-[0.55rem] py-[0.18rem]"
              style={{
                color: s.color,
                border: `1px solid ${s.border}`,
              }}
            >
              <span className="w-1 h-1 rounded-full" style={{ background: s.color }} />
              {s.label}
            </span>

            {/* Divider */}
            <span className="w-px h-4 bg-border" />

            {/* Stack */}
            <div className="flex gap-[0.35rem] flex-wrap">
              {meta.stack.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.67rem] text-text-muted bg-surface border border-border-subtle rounded-sm px-2 py-[0.2rem]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links — pushed right */}
            <div className="ml-auto flex gap-3 items-center">
              {meta.live && (
                <a
                  href={meta.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[0.4rem] px-4 py-[0.55rem] bg-accent text-white text-[0.78rem] font-semibold rounded-sm no-underline tracking-[0.03em] transition-opacity duration-150 hover:opacity-85"
                >
                  ↗ live
                </a>
              )}
              {meta.repo && (
                <a
                  href={meta.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[0.4rem] px-4 py-[0.55rem] bg-transparent text-text-secondary text-[0.78rem] rounded-sm border border-border no-underline font-mono tracking-[0.03em] transition-[border-color,color] duration-150 hover:border-accent-dim hover:text-text-primary"
                >
                  ⌥ source
                </a>
              )}
            </div>
          </m.div>
        </div>
      </div>

      {/* ── CONTENT BODY — two column on desktop ── */}
      <div className="py-[clamp(3.5rem,7vw,6rem)]">
        <div className="container-main grid grid-cols-[1fr_260px] gap-20 items-start max-[900px]:grid-cols-1" id="content-grid">
          {/* ── LEFT — editorial content ── */}
          <div>
            {/* Overview */}
            <m.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16"
            >
              <SectionLabel label="Overview" />
              <div className="flex flex-col gap-4">
                {parsed.overview.split("\n\n").map((para, i) => (
                  <p
                    key={para.slice(0, 10)}
                    className="text-[0.96rem] leading-[1.82]"
                    style={{
                      color: i === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      fontWeight: i === 0 ? 500 : 400,
                    }}
                  >
                    {para.trim()}
                  </p>
                ))}
              </div>
            </m.section>

            {/* Challenges */}
            <div ref={challengesRef} className="mb-16">
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={challengesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionLabel label="Challenges" />
              </m.div>

              <m.div variants={staggerContainer} initial="hidden" animate={challengesInView ? "visible" : "hidden"} className="flex flex-col gap-6">
                {parsed.challenges.map((challenge, i) => (
                  <m.div
                    key={challenge.title}
                    variants={staggerItem}
                    whileHover={{ y: -2, borderColor: "var(--color-accent-dim)" }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="p-6 px-7 bg-bg-elevated border border-border rounded-lg relative"
                  >
                    {/* Number marker */}
                    <span className="absolute top-6 right-6 font-mono text-[0.65rem] text-accent opacity-50 tracking-[0.1em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <p className="font-display text-base font-semibold text-text-primary mb-3 leading-[1.3] pr-8 tracking-[-0.02em]">
                      {challenge.title}
                    </p>
                    <p className="text-[0.88rem] text-text-secondary leading-[1.78]">{challenge.body}</p>
                  </m.div>
                ))}
              </m.div>
            </div>

            {/* Learned */}
            <div ref={learnedRef}>
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={learnedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionLabel label="What I learned" />
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={learnedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 bg-accent-subtle border border-accent-dim rounded-lg"
              >
                {parsed.learned.split("\n\n").map((para, i, arr) => (
                  <p
                    key={para.slice(0, 10)}
                    className="text-[0.95rem] text-text-secondary leading-[1.82]"
                    style={{
                      marginBottom: i < arr.length - 1 ? "1rem" : 0,
                      fontStyle: i === 0 ? "italic" : "normal",
                    }}
                  >
                    {para.trim()}
                  </p>
                ))}
              </m.div>
            </div>
          </div>

          {/* ── RIGHT — sticky sidebar ── */}
          <div className="sticky top-24 max-[900px]:static max-[900px]:order-first detail-sidebar">
            <m.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Meta card */}
              <div className="bg-surface border border-border rounded-lg overflow-hidden mb-4">
                {[
                  { label: "Year", value: meta.year },
                  { label: "Status", value: s.label, accent: true },
                  { label: "Featured", value: meta.featured ? "Yes" : "No" },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="flex justify-between items-center px-5 py-[0.875rem] border-b border-border-subtle">
                    <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-text-muted">{label}</span>
                    <span
                      className="font-mono text-[0.75rem] tracking-[0.04em]"
                      style={{
                        color: accent ? s.color : "var(--color-text-secondary)",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}

                {/* Stack list in sidebar */}
                <div className="px-5 py-4">
                  <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-text-muted mb-3">Stack</p>
                  <div className="flex flex-wrap gap-[0.35rem]">
                    {meta.stack.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.68rem] text-text-muted bg-background border border-border-subtle rounded-sm px-2 py-[0.2rem]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2">
                {meta.live && (
                  <a
                    href={meta.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 py-3 bg-accent text-white rounded-md no-underline font-mono text-[0.75rem] tracking-[0.08em] font-semibold transition-opacity duration-150 hover:opacity-85"
                  >
                    ↗ View live
                  </a>
                )}
                {meta.repo && (
                  <a
                    href={meta.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 py-3 bg-transparent text-text-secondary rounded-md border border-border no-underline font-mono text-[0.75rem] tracking-[0.08em] transition-[border-color,color] duration-150 hover:border-accent-dim hover:text-text-primary"
                  >
                    ⌥ View source
                  </a>
                )}
                <Link
                  href="/projects"
                  className="flex justify-center py-3 text-text-muted rounded-md no-underline font-mono text-[0.72rem] tracking-[0.08em] transition-colors duration-150 mt-1 hover:text-accent"
                >
                  ← all projects
                </Link>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2 style={{ fontSize: "1.5rem" }}>{label}</h2>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, var(--color-accent), transparent)" }} />
    </div>
  );
}
