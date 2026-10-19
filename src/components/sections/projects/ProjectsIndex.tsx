"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import FilterDropdown from "@/components/ui/FilterDropdown";
import { EASE } from "@/lib/motion";
import type { Project } from "@/types";

const STATUS_FILTERS: { key: "all" | Project["status"]; label: string }[] = [
  { key: "all", label: "all" },
  { key: "complete", label: "complete" },
  { key: "in-progress", label: "in progress" },
  { key: "archived", label: "archived" },
];

export default function ProjectsIndex({ projects, stack }: { projects: Project[]; stack: string[] }) {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"all" | Project["status"]>("all");
  const [activeStack, setActiveStack] = useState<string | null>(null);

  const stackCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      for (const s of p.stack) {
        counts.set(s, (counts.get(s) ?? 0) + 1);
      }
    }
    return counts;
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (activeStack && !p.stack.includes(activeStack)) return false;
      return true;
    });
  }, [projects, status, activeStack]);

  return (
    <div className="min-w-0">
      {/* filter line — quiet mono toolbar, not a control card */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-border pb-4">
        <fieldset className="flex flex-wrap items-baseline gap-x-5 gap-y-2" aria-label="Filter by status">
          <legend className="sr-only">Filter by status</legend>
          {STATUS_FILTERS.map((f) => {
            const active = status === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setStatus(f.key)}
                aria-pressed={active}
                className="relative py-0.5 font-mono text-[0.74rem] lowercase transition-colors duration-150"
                style={{ color: active ? "var(--color-text-primary)" : "var(--color-text-muted)" }}
              >
                {f.label}
                {active && <span className="absolute inset-x-0 -bottom-1 h-px bg-accent" aria-hidden="true" />}
              </button>
            );
          })}
        </fieldset>

        <div className="flex items-center gap-4">
          {stack.length > 0 && (
            <FilterDropdown
              idleLabel="technology"
              ariaLabel="Filter by technology"
              allLabel="all technologies"
              allCount={projects.length}
              options={stack.map((s) => ({ key: s, label: s, count: stackCounts.get(s) ?? 0 }))}
              value={activeStack}
              onChange={setActiveStack}
            />
          )}
          <span className="font-mono text-[0.7rem] text-text-muted" aria-live="polite">
            {filtered.length} / {projects.length}
          </span>
        </div>
      </div>

      {activeStack && (
        <p className="mb-4 mt-4 font-mono text-[0.72rem] text-text-muted">
          filtered by {activeStack}
          <button type="button" onClick={() => setActiveStack(null)} className="ml-3 text-accent underline underline-offset-4 hover:text-accent-dim">
            clear
          </button>
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="border-t border-border-subtle py-20 text-center">
          <p className="mb-2 font-mono text-[0.8rem] text-text-muted">No projects match these filters.</p>
          <button
            type="button"
            onClick={() => {
              setStatus("all");
              setActiveStack(null);
            }}
            className="font-mono text-[0.75rem] text-accent underline underline-offset-4 hover:text-accent-dim"
          >
            clear filters
          </button>
        </div>
      ) : (
        <m.div
          layout={!reduce}
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="grid gap-5 overflow-x-clip sm:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <m.div
                key={project.slug}
                layout={!reduce}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="min-w-0"
              >
                <ProjectCard project={project} n={i + 1} />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      )}
    </div>
  );
}
