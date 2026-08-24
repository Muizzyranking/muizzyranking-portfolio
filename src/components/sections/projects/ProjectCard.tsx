"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

const STATUS_DOT: Record<Project["status"], string> = {
  complete: "bg-success",
  "in-progress": "bg-accent",
  archived: "bg-text-muted",
};

const STATUS_LABEL: Record<Project["status"], string> = {
  complete: "complete",
  "in-progress": "in progress",
  archived: "archived",
};

export default function ProjectCard({ project }: { project: Project }) {
  // const reduce = useReducedMotion();
  const splash = project.screenshots?.[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface-raised transition-[border-color,box-shadow] duration-200 ease-out hover:border-accent/60 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)]"
    >
      {/* Splash */}
      <div className="relative w-full overflow-hidden border-b border-border-subtle bg-bg-elevated" style={{ aspectRatio: "16 / 10" }}>
        {splash ? (
          <Image
            src={splash}
            alt={`${project.title} splash`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="project-splash object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[2rem] font-bold text-text-muted/40">{project.title.slice(0, 1)}</span>
          </div>
        )}
        <span
          aria-hidden="true"
          className="absolute right-4 bottom-4 flex size-9 translate-y-1 items-center justify-center rounded-full bg-accent text-accent-foreground opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
        >
          →
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">
          <span className={`inline-block size-1.5 rounded-full ${STATUS_DOT[project.status]}`} aria-hidden="true" />
          {project.year} · {STATUS_LABEL[project.status]}
        </span>

        <h3 className="font-display text-[1.3rem] leading-[1.25] tracking-[-0.01em] font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">
          {project.title}
        </h3>

        <p className="text-[0.93rem] leading-[1.65] text-text-secondary line-clamp-2">{project.summary}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

// hover zoom on the splash via group-hover (CSS-only; kept out of inline styles)
