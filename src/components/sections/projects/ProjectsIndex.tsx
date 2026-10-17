"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [stackOpen, setStackOpen] = useState(false);
  const stackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!stackOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (stackRef.current && !stackRef.current.contains(e.target as Node)) {
        setStackOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStackOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [stackOpen]);

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
            <div className="flex flex-wrap items-center gap-3">
              <span id="stack-filter-label" className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.08em] text-text-muted">
                Technology
              </span>
              <div ref={stackRef} className="relative">
                <button
                  type="button"
                  onClick={() => setStackOpen((o) => !o)}
                  aria-expanded={stackOpen}
                  aria-haspopup="listbox"
                  aria-label={`Filter by technology${activeStack ? `: ${activeStack}` : ""}`}
                  className={`flex min-w-[12rem] items-center justify-between gap-3 rounded-full border px-4 py-2 font-mono text-[0.75rem] font-semibold transition-colors duration-150 ${
                    activeStack
                      ? "border-accent bg-accent text-accent-foreground shadow-[0_6px_16px_-8px_color-mix(in_srgb,var(--color-accent)_70%,transparent)]"
                      : "border-border bg-surface-raised text-text-secondary hover:border-accent hover:text-accent"
                  }`}
                >
                  <span className="truncate">{activeStack ?? "All technologies"}</span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    aria-hidden="true"
                    className={`shrink-0 transition-transform duration-200 ${stackOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M2 3.5 5 6.5 8 3.5" />
                  </svg>
                </button>

                <AnimatePresence>
                  {stackOpen && (
                    <m.div
                      role="listbox"
                      aria-label="Filter by technology"
                      initial={{ opacity: 0, y: reduce ? 0 : -6, scale: reduce ? 1 : 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: reduce ? 0 : -4, scale: reduce ? 1 : 0.98, transition: { duration: 0.15, ease: EASE } }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="absolute top-[calc(100%+0.5rem)] left-0 z-30 max-h-72 w-[min(20rem,calc(100vw-4rem))] overflow-y-auto rounded-[var(--radius-md)] border border-border bg-surface-raised p-1.5 shadow-[var(--shadow-lifted)]"
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={activeStack === null}
                        onClick={() => {
                          setActiveStack(null);
                          setStackOpen(false);
                        }}
                        className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-[calc(var(--radius-md)-6px)] px-3 py-2 text-left text-[0.85rem] transition-colors duration-150 ${
                          activeStack === null
                            ? "bg-accent-subtle font-semibold text-accent"
                            : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                        }`}
                      >
                        <span>All technologies</span>
                        <span className="font-mono text-[0.68rem] text-text-muted">{projects.length}</span>
                      </button>
                      {stack.map((s) => {
                        const active = activeStack === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            role="option"
                            aria-selected={active}
                            onClick={() => {
                              setActiveStack(active ? null : s);
                              setStackOpen(false);
                            }}
                            className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-[calc(var(--radius-md)-6px)] px-3 py-2 text-left text-[0.85rem] transition-colors duration-150 ${
                              active
                                ? "bg-accent-subtle font-semibold text-accent"
                                : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                            }`}
                          >
                            <span className="truncate">{s}</span>
                            <span className="font-mono text-[0.68rem] text-text-muted">{stackCounts.get(s) ?? 0}</span>
                          </button>
                        );
                      })}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
              {activeStack && (
                <button
                  type="button"
                  onClick={() => setActiveStack(null)}
                  className="font-mono text-[0.72rem] text-accent underline underline-offset-4 hover:text-accent-dim"
                >
                  clear
                </button>
              )}
            </div>
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
