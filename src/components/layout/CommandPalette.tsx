"use client";

import { AnimatePresence, m } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";

type PaletteItem =
  | { kind: "action"; label: string; hint?: string; href: string; external?: boolean }
  | { kind: "project"; label: string; hint?: string; href: string }
  | { kind: "post"; label: string; hint?: string; href: string };

export default function CommandPalette({
  open,
  onClose,
  projects,
  posts,
}: {
  open: boolean;
  onClose: () => void;
  projects: { slug: string; title: string }[];
  posts: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const base = useMemo<PaletteItem[]>(() => {
    const actions: PaletteItem[] = [
      { kind: "action", label: "go home", hint: "/", href: "/" },
      { kind: "action", label: "about me", hint: "who am i", href: "/about" },
      { kind: "action", label: "projects", hint: "case studies", href: "/projects" },
      { kind: "action", label: "writing", hint: "blog", href: "/blog" },
      { kind: "action", label: "résumé", hint: "download", href: site.resume, external: true },
    ];
    return [
      ...actions,
      ...projects.map<PaletteItem>((p) => ({ kind: "project", label: p.title, hint: "project", href: `/projects/${p.slug}` })),
      ...posts.map<PaletteItem>((p) => ({ kind: "post", label: p.title, hint: "post", href: `/blog/${p.slug}` })),
    ];
  }, [projects, posts]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter((item) => item.label.toLowerCase().includes(q) || (item.hint ?? "").toLowerCase().includes(q));
  }, [base, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const go = (item: PaletteItem) => {
    onClose();
    if (item.kind === "action" && item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  };

  const scrollIntoView = (index: number) => {
    listRef.current?.children[index]?.scrollIntoView({ block: "nearest" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => {
        const next = Math.min(i + 1, items.length - 1);
        scrollIntoView(next);
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => {
        const next = Math.max(i - 1, 0);
        scrollIntoView(next);
        return next;
      });
    } else if (e.key === "Enter") {
      if (e.target === inputRef.current) {
        e.preventDefault();
        const item = items[activeIndex];
        if (item) go(item);
      }
    } else if (e.key === "Tab") {
      const nodes = [inputRef.current, ...(listRef.current ? Array.from(listRef.current.querySelectorAll("[data-result]")) : [])].filter(
        (n): n is HTMLElement => Boolean(n),
      );
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first?.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last?.focus();
      }
    }
  };

  const renderLabel = (label: string) => {
    const q = query.trim().toLowerCase();
    if (!q) return label;
    const idx = label.toLowerCase().indexOf(q);
    if (idx === -1) return label;
    return (
      <>
        {label.slice(0, idx)}
        <span className="text-accent">{label.slice(idx, idx + q.length)}</span>
        {label.slice(idx + q.length)}
      </>
    );
  };

  let lastKind = "";

  return (
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-background/70 px-4 pt-[clamp(6rem,15vh,10rem)] backdrop-blur-sm"
          onClick={onClose}
        >
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Search projects, posts and quick actions"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[560px] overflow-hidden rounded-lg border border-border bg-surface-raised shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-text-muted)"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Search projects, posts, pages…"
                className="h-12 w-full bg-transparent text-[0.95rem] text-text-primary placeholder:text-text-muted focus:outline-none"
                aria-label="Search"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-text-muted hover:text-text-primary transition-colors duration-150"
              >
                esc
              </button>
            </div>

            <ul ref={listRef} className="max-h-[min(60vh,26rem)] overflow-y-auto py-2" aria-label="Search results">
              {items.map((item, index) => {
                const section = item.kind === "action" ? "quick actions" : item.kind === "project" ? "projects" : "writing";
                const showHeader = section !== lastKind;
                lastKind = section;
                const active = index === activeIndex;
                return (
                  <li key={`${item.kind}-${item.href}`}>
                    {showHeader && <p className="px-4 pt-3 pb-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-text-muted">{section}</p>}
                    <button
                      type="button"
                      data-result
                      onClick={() => go(item)}
                      onMouseMove={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                        active ? "bg-accent-subtle" : ""
                      }`}
                    >
                      <span className="truncate text-[0.9rem] text-text-primary">{renderLabel(item.label)}</span>
                      <span className="flex items-center gap-2 shrink-0">
                        {item.hint && <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-text-muted">{item.hint}</span>}
                        {active && (
                          <span className="text-accent" aria-hidden="true">
                            →
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}

              {items.length === 0 && (
                <li className="px-4 py-8 text-center">
                  <p className="text-text-muted text-[0.9rem]">No matches for “{query}”.</p>
                  <p className="font-mono text-[0.65rem] text-text-muted mt-2">{"// the search is better than the site's 404 page."}</p>
                </li>
              )}
            </ul>

            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-text-muted">
              <span>↑↓ navigate</span>
              <span>enter select</span>
              <span>esc close</span>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
