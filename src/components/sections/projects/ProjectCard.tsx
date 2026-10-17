"use client";

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
  const visibleStack = project.stack.slice(0, 4);
  const remaining = project.stack.length - visibleStack.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full w-full min-w-0 flex-col gap-3 rounded-[var(--radius-lg)] border border-border bg-surface-raised p-6 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)]"
    >
      <span className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">
          <span className={`inline-block size-1.5 rounded-full ${STATUS_DOT[project.status]}`} aria-hidden="true" />
          {project.year} · {STATUS_LABEL[project.status]}
        </span>
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-all duration-200 ease-out group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"
        >
          <span className="transition-transform duration-200 ease-out group-hover:translate-x-px group-hover:-translate-y-px">→</span>
        </span>
      </span>

      <h3 className="font-display text-[1.3rem] leading-[1.25] tracking-[-0.01em] font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">
        {project.title}
      </h3>

      <p className="text-[0.93rem] leading-[1.65] text-text-secondary line-clamp-3">{project.summary}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {visibleStack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
        {remaining > 0 && (
          <span className="chip" title={`${remaining} more technologies`}>
            +{remaining}
          </span>
        )}
      </div>
    </Link>
  );
}
