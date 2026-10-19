import Link from "next/link";
import type { Project } from "@/types";

const STATUS_LABEL: Record<Project["status"], string> = {
  complete: "complete",
  "in-progress": "in progress",
  archived: "archived",
};

const STATUS_DOT: Record<Project["status"], string> = {
  complete: "bg-success",
  "in-progress": "bg-accent",
  archived: "bg-text-muted",
};

/** Project card — bordered, text-only. Screenshots live on the case-study page. */
export default function ProjectCard({ project, n }: { project: Project; n?: number }) {
  const visibleStack = project.stack.slice(0, 4);
  const remaining = project.stack.length - visibleStack.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card group flex h-full flex-col p-6 transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[var(--shadow-lifted)] md:p-7"
    >
      <div className="flex items-center justify-between gap-4 font-mono text-[0.72rem] text-text-muted">
        <span className="inline-flex items-center gap-3">
          {n !== undefined && <span className="font-medium text-accent">{String(n).padStart(2, "0")}</span>}
          <span className="inline-flex items-center gap-2">
            <span className={`inline-block size-[5px] rounded-full ${STATUS_DOT[project.status]}`} aria-hidden="true" />
            {project.year} · {STATUS_LABEL[project.status]}
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 transition-colors duration-200 group-hover:text-accent" aria-hidden="true">
          <span className="hidden sm:inline">case study</span>
          <span className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </span>
      </div>

      <h3 className="mt-5 font-display text-[clamp(1.4rem,2.6vw,1.75rem)] leading-[1.22] tracking-[-0.02em] font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">
        {project.title}
      </h3>

      {project.summary && <p className="mt-3 text-[0.98rem] leading-[1.7] text-text-secondary line-clamp-3">{project.summary}</p>}

      <p className="meta-line mt-auto truncate pt-8">
        {visibleStack.join(" · ")}
        {remaining > 0 && <span title={`${remaining} more`}>{` +${remaining}`}</span>}
      </p>
    </Link>
  );
}
