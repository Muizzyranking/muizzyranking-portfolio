"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import { EASE } from "@/lib/motion";
import type { Project } from "@/types";

const STATUS_FILTERS: { key: "all" | Project["status"]; label: string }[] = [
  { key: "all", label: "All" },
  { key: "complete", label: "Complete" },
  { key: "in-progress", label: "In progress" },
  { key: "archived", label: "Archived" },
];

export default function ProjectsIndex({ projects, stack }: { projects: Project[]; stack: string[] }) {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"all" | Project["status"]>("all");
  const [activeStack, setActiveStack] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (activeStack && !p.stack.includes(activeStack)) return false;
      return true;
    });
  }, [projects, status, activeStack]);

  return (
    <>
      <header className="container-main pt-[clamp(5rem,10vw,8rem)] pb-[clamp(3rem,6vw,4.5rem)]">
        <p className="eyebrow mb-6">case studies</p>
        <h1 className="font-display font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)] text-text-primary mb-6">Projects.</h1>
        <p className="text-text-secondary text-[clamp(1rem,1.8vw,1.15rem)] leading-[1.65] max-w-[52ch]">
          Backend systems, APIs, and tools. Each one written up as a case study.
        </p>
      </header>

      <div className="container-main pb-[clamp(4rem,8vw,7rem)]">
        <div className="card mb-10 p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <fieldset className="flex flex-wrap gap-2">
              <legend className="sr-only">Filter by status</legend>
              {STATUS_FILTERS.map((f) => {
                const active = status === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setStatus(f.key)}
                    aria-pressed={active}
                    className={`rounded-full px-4 py-2 font-mono text-[0.75rem] font-semibold tracking-[0.04em] transition-colors duration-150 ${
                      active
                        ? "bg-accent text-accent-foreground shadow-[0_6px_16px_-8px_color-mix(in_srgb,var(--color-accent)_70%,transparent)]"
                        : "border border-border bg-surface-raised text-text-secondary hover:border-accent hover:text-accent"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </fieldset>
            <span className="font-mono text-[0.72rem] font-medium tracking-[0.06em] text-text-secondary uppercase">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {stack.length > 0 && (
            <fieldset>
              <legend className="sr-only">Filter by stack</legend>
              <div className="flex flex-wrap gap-2">
                {stack.map((s) => {
                  const active = activeStack === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setActiveStack(active ? null : s)}
                      aria-pressed={active}
                      className={`rounded-full px-3.5 py-1.5 font-mono text-[0.72rem] font-semibold transition-colors duration-150 ${
                        active
                          ? "bg-accent text-accent-foreground"
                          : "border border-border bg-surface-raised text-text-secondary hover:border-accent hover:text-accent"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-mono text-[0.8rem] text-text-muted mb-2">No projects match these filters.</p>
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
            layout
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative overflow-x-clip"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <m.div
                  key={project.slug}
                  layout={!reduce}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="h-full min-w-0"
                >
                  <ProjectCard project={project} />
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>
        )}
      </div>
    </>
  );
}
