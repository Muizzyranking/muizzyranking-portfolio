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
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full w-full min-w-0 flex-col gap-4 rounded-lg bg-bg-elevated border border-border p-7 transition-[transform,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-accent-dim"
    >
      <h3 className="font-display font-semibold tracking-[-0.01em] leading-[1.3] text-text-primary text-[1.25rem] truncate">{project.title}</h3>

      <span className="flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-text-muted">
        <span className={`inline-block size-1.5 rounded-full ${STATUS_DOT[project.status]}`} aria-hidden="true" />
        {project.year} · {STATUS_LABEL[project.status]}
      </span>

      <p className="text-text-secondary text-[0.95rem] leading-[1.65] flex-1">{project.summary}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((s) => (
          <span key={s} className="font-mono text-[0.72rem] text-text-muted bg-surface border border-border-subtle rounded-sm px-2 py-[0.2rem]">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 text-accent text-[0.85rem] font-medium border-t border-border-subtle pt-4">
        Read the case study
        <span className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}
