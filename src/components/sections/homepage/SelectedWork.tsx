"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { arrowNudge, fadeUp, SCROLL_REVEAL } from "@/lib/motion";
import type { Project } from "@/types";

const STATUS_STYLES: Record<Project["status"], { color: string; border: string; label: string }> = {
  complete: {
    color: "var(--color-success)",
    border: "var(--color-accent-dim)",
    label: "shipped",
  },
  "in-progress": {
    color: "#c9a84c",
    border: "#8a6f2e",
    label: "in progress",
  },
  archived: {
    color: "var(--color-text-muted)",
    border: "var(--color-border)",
    label: "archived",
  },
};

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const status = STATUS_STYLES[project.status];

  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative bg-bg-elevated border border-border rounded-lg p-7 flex flex-col gap-4 overflow-hidden transition-all duration-[250ms]"
      style={{
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        borderColor: hovered ? "var(--color-accent-dim)" : "var(--color-border)",
      }}
    >
      <m.div
        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        initial={{ scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent origin-top rounded-[2px]"
      />

      <div className="flex items-start justify-between gap-3">
        <p
          className="text-base font-semibold leading-[1.3] transition-colors duration-200"
          style={{
            color: hovered ? "var(--color-accent)" : "var(--color-text-primary)",
          }}
        >
          {project.title}
        </p>
        <span
          className="font-mono text-[0.62rem] tracking-[0.1em] uppercase whitespace-nowrap shrink-0 px-2 py-[0.18rem] rounded-sm"
          style={{
            color: status.color,
            border: `1px solid ${status.border}`,
          }}
        >
          {status.label}
        </span>
      </div>

      <p className="text-text-secondary text-[0.875rem] leading-[1.68] flex-1">{project.summary}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className="font-mono text-[0.68rem] text-text-muted bg-surface border border-border-subtle rounded-sm px-2 py-[0.2rem]">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-3 mt-auto border-t border-border-subtle">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.7rem] tracking-[0.08em] transition-colors duration-200"
            style={{
              color: hovered ? "var(--color-accent)" : "var(--color-text-muted)",
            }}
          >
            ↗ live
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.7rem] tracking-[0.08em] transition-colors duration-200"
            style={{
              color: hovered ? "var(--color-accent)" : "var(--color-text-muted)",
            }}
          >
            ⌥ source
          </a>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="ml-auto font-mono text-[0.7rem] tracking-[0.08em] text-accent inline-flex items-center gap-[0.35rem]"
        >
          read more
          <m.span variants={arrowNudge} animate={hovered ? "hover" : "rest"} className="inline-block">
            →
          </m.span>
        </Link>
      </div>
    </m.div>
  );
}

export default function SelectedWork({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section ref={ref} id="work" className="section-band">
      <div className="container-main">
        <m.p variants={fadeUp} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"} className="eyebrow mb-8">
          <span className="eyebrow__mark">[ 02 ]</span>
          Selected work
          <span className="eyebrow__rule" />
        </m.p>

        <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
          <m.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-display font-semibold tracking-[-0.04em] leading-[1.05] text-[clamp(1.9rem,4vw,2.75rem)]"
          >
            Things worth <em className="italic text-accent">pointing at.</em>
          </m.h2>

          <m.div variants={fadeUp} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <Link href="/projects" className="group inline-flex items-center gap-2 font-mono text-[0.76rem] text-accent tracking-[0.08em]">
              <span>all projects</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </m.div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
