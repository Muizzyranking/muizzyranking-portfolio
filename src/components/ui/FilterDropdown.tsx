"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

export type FilterOption = { key: string; label: string; count: number };

/** Dropdown filter used by the projects and writing indexes — a bordered
 *  mono trigger with an animated listbox beneath (outside click + ESC
 *  close, live counts per option). */
export default function FilterDropdown({
  idleLabel,
  ariaLabel,
  allLabel,
  allCount,
  options,
  value,
  onChange,
}: {
  idleLabel: string;
  ariaLabel: string;
  allLabel: string;
  allCount: number;
  options: FilterOption[];
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={value ? `${ariaLabel}: ${value}` : ariaLabel}
        className={`flex min-w-[11rem] items-center justify-between gap-3 border px-3 py-1.5 font-mono text-[0.74rem] transition-colors duration-150 ${
          value
            ? "border-accent bg-accent-subtle text-accent"
            : "border-border bg-surface-raised text-text-secondary hover:border-text-secondary hover:text-text-primary"
        }`}
      >
        <span className="truncate">{value ?? idleLabel}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 3.5 5 6.5 8 3.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            role="listbox"
            aria-label={ariaLabel}
            initial={{ opacity: 0, y: reduce ? 0 : -6, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : -4, scale: reduce ? 1 : 0.98, transition: { duration: 0.15, ease: EASE } }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute top-[calc(100%+0.4rem)] right-0 z-30 max-h-72 w-[min(20rem,calc(100vw-4rem))] overflow-y-auto border border-border bg-surface-raised p-1.5 shadow-[var(--shadow-lifted)] rounded-[var(--radius-sm)]"
          >
            <button
              type="button"
              role="option"
              aria-selected={value === null}
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 px-3 py-2 text-left font-mono text-[0.78rem] transition-colors duration-150 ${
                value === null ? "bg-accent-subtle text-accent" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
              }`}
            >
              <span>{allLabel}</span>
              <span className="text-[0.68rem] text-text-muted">{allCount}</span>
            </button>
            {options.map((option) => {
              const active = value === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(active ? null : option.key);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between gap-4 px-3 py-2 text-left font-mono text-[0.78rem] transition-colors duration-150 ${
                    active ? "bg-accent-subtle text-accent" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  <span className="text-[0.68rem] text-text-muted">{option.count}</span>
                </button>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
