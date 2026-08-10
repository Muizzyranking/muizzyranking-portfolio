"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import PostRow from "@/components/blog/PostRow";
import { EASE } from "@/lib/motion";
import type { Category, PostMeta } from "@/types";

export default function BlogIndex({ posts, categories }: { posts: PostMeta[]; categories: (Category & { count: number })[] }) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeCategory && !post.categories.some((c) => c.slug === activeCategory)) return false;
      if (!q) return true;
      const haystack = [post.title, post.summary, ...post.categories.map((c) => c.label)].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, activeCategory]);

  return (
    <>
      <header className="container-main pt-[clamp(5rem,10vw,8rem)] pb-[clamp(3rem,6vw,4.5rem)]">
        <p className="eyebrow mb-6">writing</p>
        <h1 className="font-display font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6vw,4.5rem)] text-text-primary mb-6">Writing.</h1>
        <p className="text-text-secondary text-[clamp(1rem,1.8vw,1.15rem)] leading-[1.65] max-w-[52ch]">
          Notes on backend systems, tooling, and how software gets built.
        </p>
      </header>

      <div className="container-main pb-[clamp(4rem,8vw,7rem)]">
        <div className="flex flex-col gap-5 border-t border-border-subtle pt-7 mb-10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <label className="relative block w-full max-w-[22rem]">
              <span className="sr-only">Search writing</span>
              <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="presentation">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search writing..."
                className="w-full bg-surface border border-border rounded-sm pl-9 pr-3 py-2 font-mono text-[0.78rem] text-text-primary placeholder:text-text-muted outline-none transition-colors duration-150 focus:border-accent-dim"
              />
            </label>
            <span className="font-mono text-[0.7rem] text-text-muted">
              {filtered.length} {filtered.length === 1 ? "post" : "posts"}
            </span>
          </div>

          {categories.length > 0 && (
            <fieldset className="flex flex-wrap gap-2">
              <legend className="sr-only">Filter by category</legend>
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                aria-pressed={activeCategory === null}
                className={`font-mono text-[0.72rem] tracking-[0.06em] rounded-sm px-3 py-1.5 transition-colors duration-150 ${
                  activeCategory === null
                    ? "bg-accent text-accent-foreground"
                    : "text-text-muted border border-border hover:border-accent-dim hover:text-text-primary"
                }`}
              >
                All
              </button>
              {categories.map((c) => {
                const active = activeCategory === c.slug;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setActiveCategory(active ? null : c.slug)}
                    aria-pressed={active}
                    className={`font-mono text-[0.72rem] tracking-[0.06em] rounded-sm px-3 py-1.5 transition-colors duration-150 ${
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-text-muted border border-border hover:border-accent-dim hover:text-text-primary"
                    }`}
                  >
                    {c.label}
                    <span className="opacity-70 ml-1.5">{c.count}</span>
                  </button>
                );
              })}
            </fieldset>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-mono text-[0.8rem] text-text-muted mb-2">No posts match.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory(null);
              }}
              className="font-mono text-[0.75rem] text-accent underline underline-offset-4 hover:text-accent-dim"
            >
              clear filters
            </button>
          </div>
        ) : (
          <m.div layout initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: EASE }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((post) => (
                <m.div
                  key={post.slug}
                  layout={!reduce}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <PostRow post={post} />
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>
        )}
      </div>
    </>
  );
}
