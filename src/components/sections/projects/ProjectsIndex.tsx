"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "@/components/sections/projects/ProjectCard";
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
            <div ref={stackRef} className="relative">
              <button
                type="button"
                onClick={() => setStackOpen((o) => !o)}
                aria-expanded={stackOpen}
                aria-haspopup="listbox"
                aria-label={`Filter by technology${activeStack ? `: ${activeStack}` : ""}`}
                className={`flex min-w-[11rem] items-center justify-between gap-3 border px-3 py-1.5 font-mono text-[0.74rem] transition-colors duration-150 ${
                  activeStack
                    ? "border-accent bg-accent-subtle text-accent"
                    : "border-border bg-surface-raised text-text-secondary hover:border-text-secondary hover:text-text-primary"
                }`}
              >
                <span className="truncate">{activeStack ?? "technology"}</span>
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
                    className="absolute top-[calc(100%+0.4rem)] right-0 z-30 max-h-72 w-[min(20rem,calc(100vw-4rem))] overflow-y-auto border border-border bg-surface-raised p-1.5 shadow-[var(--shadow-lifted)] rounded-[var(--radius-sm)]"
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={activeStack === null}
                      onClick={() => {
                        setActiveStack(null);
                        setStackOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between gap-4 px-3 py-2 text-left font-mono text-[0.78rem] transition-colors duration-150 ${
                        activeStack === null ? "bg-accent-subtle text-accent" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                      }`}
                    >
                      <span>all technologies</span>
                      <span className="text-[0.68rem] text-text-muted">{projects.length}</span>
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
                          className={`flex w-full cursor-pointer items-center justify-between gap-4 px-3 py-2 text-left font-mono text-[0.78rem] transition-colors duration-150 ${
                            active ? "bg-accent-subtle text-accent" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                          }`}
                        >
                          <span className="truncate">{s}</span>
                          <span className="text-[0.68rem] text-text-muted">{stackCounts.get(s) ?? 0}</span>
                        </button>
                      );
                    })}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
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
