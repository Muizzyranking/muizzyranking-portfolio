"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";
import type { Project, ProjectGridProps } from "@/types";

const STATUS_LABEL: Record<Project["status"], { label: string; color: string }> = {
  complete: { label: "shipped", color: "var(--color-success)" },
  "in-progress": { label: "in progress", color: "#c9a84c" },
  archived: { label: "archived", color: "var(--color-text-muted)" },
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const status = STATUS_LABEL[project.status];

  return (
    <m.div variants={staggerItem} className="relative">
      <div className="h-px bg-border-subtle" />

      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="project-row grid grid-cols-[3.5rem_1fr_auto] gap-6 py-7 px-4 relative no-underline text-inherit rounded-md transition-colors duration-300 items-start max-[640px]:grid-cols-[2.5rem_1fr]"
        style={{
          backgroundColor: hovered ? "color-mix(in srgb, var(--color-accent) 4%, transparent)" : "transparent",
        }}
      >
        {/* Accent bar */}
        <m.div
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          initial={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-5 bottom-5 w-[2px] bg-accent origin-top rounded-[2px]"
        />

        {/* Index */}
        <div className="pt-[0.1rem]">
          <m.span
            animate={{ color: hovered ? "var(--color-accent)" : "var(--color-border)" }}
            transition={{ duration: 0.2 }}
            className="font-mono text-2xl font-bold tracking-[-0.04em] leading-none block select-none"
          >
            {String(index + 1).padStart(2, "0")}
          </m.span>
        </div>

        {/* Content */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap mb-2">
            <m.h3
              animate={{ color: hovered ? "var(--color-accent)" : "var(--color-text-primary)" }}
              transition={{ duration: 0.2 }}
              className="font-display font-semibold tracking-[-0.025em] m-0 leading-[1.2] text-[clamp(1.15rem,2vw,1.45rem)]"
            >
              {project.title}
            </m.h3>
            <span
              className="font-mono text-[0.6rem] tracking-[0.1em] uppercase opacity-85"
              style={{ color: status.color }}
            >
              {status.label}
            </span>
          </div>

          <m.p
            animate={{ color: hovered ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}
            transition={{ duration: 0.25 }}
            className="text-[0.92rem] m-0 mb-[0.85rem] leading-[1.7] max-w-[64ch]"
          >
            {project.summary}
          </m.p>

          <div className="flex flex-wrap gap-[0.4rem]">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[0.66rem] tracking-[0.06em] rounded-sm px-[0.55rem] py-[0.22rem] transition-[color,border-color] duration-200"
                style={{
                  color: hovered ? "var(--color-text-secondary)" : "var(--color-text-muted)",
                  border: `1px solid ${hovered ? "var(--color-border)" : "var(--color-border-subtle)"}`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right meta */}
        <div className="project-row-meta flex flex-col items-end gap-[0.55rem] shrink-0 pt-[0.15rem] max-[640px]:col-span-full max-[640px]:items-start max-[640px]:flex-row max-[640px]:gap-3">
          <span className="font-mono text-[0.72rem] text-text-muted tracking-[0.08em]">
            {project.year}
          </span>

          <m.span
            animate={{
              x: hovered ? 4 : 0,
              opacity: hovered ? 1 : 0.3,
              color: hovered ? "var(--color-accent)" : "var(--color-text-muted)",
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-[1.1rem] block"
          >
            →
          </m.span>
        </div>
      </Link>

      {/* Bottom reveal line */}
      <div className="relative h-px">
        <m.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-accent origin-left"
        />
      </div>
    </m.div>
  );
}

export default function ProjectsGrid({ projects, stats }: ProjectGridProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const listInView = useInView(listRef, SCROLL_REVEAL);

  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div
        ref={headerRef}
        className="relative pt-[clamp(6rem,14vw,10rem)] pb-[clamp(3rem,6vw,5rem)] border-b border-border-subtle overflow-hidden"
      >
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
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-8"
          >
            <span className="eyebrow__mark">~/projects</span>
            <span className="eyebrow__rule" />
            all work
          </m.p>

          <div className="flex justify-between items-end flex-wrap gap-8">
            <m.h1
              initial={{ opacity: 0, y: 14 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold tracking-[-0.045em] leading-[0.95] text-[clamp(2.5rem,6vw,4.5rem)]"
            >
              <span className="block text-accent">Things</span>
              <span className="block italic text-text-primary">
                I&apos;ve shipped.
              </span>
            </m.h1>

            <m.div
              initial={{ opacity: 0, x: 12 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-2 flex-wrap"
            >
              {[
                { label: "total", value: stats.total },
                { label: "shipped", value: stats.complete },
                { label: "cooking", value: stats.inProgress },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center border border-border rounded-sm overflow-hidden font-mono text-[0.7rem]"
                >
                  <span className="px-[0.6rem] py-[0.3rem] bg-surface text-text-muted tracking-[0.08em] border-r border-border">
                    {label}
                  </span>
                  <span className="px-[0.7rem] py-[0.3rem] text-text-secondary font-semibold">
                    {value}
                  </span>
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </div>

      {/* ── PROJECTS LIST ── */}
      <div
        ref={listRef}
        className="py-[clamp(3rem,6vw,5rem)] pb-[clamp(5rem,10vw,8rem)]"
      >
        <div className="container-main">
          {projects.length === 0 ? (
            <div className="text-center py-20 font-mono text-text-muted text-[0.82rem]">
              <p className="mb-2">
                <span className="text-accent">$</span> ls ./projects
              </p>
              <p>{"// nothing here yet. check back soon."}</p>
            </div>
          ) : (
            <m.div variants={staggerContainer} initial="hidden" animate={listInView ? "visible" : "hidden"}>
              {projects.map((project, i) => (
                <ProjectRow key={project.slug} project={project} index={i} />
              ))}
            </m.div>
          )}
        </div>
      </div>
    </>
  );
}
