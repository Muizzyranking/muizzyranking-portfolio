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
  const [showAllTopics, setShowAllTopics] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeCategory && !post.categories.some((c) => c.slug === activeCategory)) return false;
      if (!q) return true;
      const haystack = [post.title, post.summary, ...post.categories.map((c) => c.label)].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, activeCategory]);

  const visibleCategories = showAllTopics ? categories : categories.slice(0, 8);
  const hiddenCount = categories.length - visibleCategories.length;

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
        {/* Filter panel */}
        <div className="card mb-10 p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <label className="relative block w-full max-w-[22rem]">
              <span className="sr-only">Search writing</span>
              <span aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
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
                className="w-full rounded-full border border-border bg-bg-elevated py-2.5 pr-4 pl-10 font-mono text-[0.8rem] text-text-primary placeholder:text-text-muted outline-none transition-colors duration-150 focus:border-accent"
              />
            </label>
            <span className="font-mono text-[0.72rem] font-medium tracking-[0.06em] text-text-secondary uppercase">
              {filtered.length} {filtered.length === 1 ? "post" : "posts"}
            </span>
          </div>

          {categories.length > 0 && (
            <fieldset>
              <legend className="sr-only">Filter by topic</legend>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  aria-pressed={activeCategory === null}
                  className={`rounded-full px-4 py-2 font-mono text-[0.75rem] font-semibold tracking-[0.04em] transition-colors duration-150 ${
                    activeCategory === null
                      ? "bg-accent text-accent-foreground shadow-[0_6px_16px_-8px_color-mix(in_srgb,var(--color-accent)_70%,transparent)]"
                      : "border border-border bg-surface-raised text-text-secondary hover:border-accent hover:text-accent"
                  }`}
                >
                  All
                </button>
                {visibleCategories.map((c) => {
                  const active = activeCategory === c.slug;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setActiveCategory(active ? null : c.slug)}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.75rem] font-semibold tracking-[0.04em] transition-colors duration-150 ${
                        active
                          ? "bg-accent text-accent-foreground shadow-[0_6px_16px_-8px_color-mix(in_srgb,var(--color-accent)_70%,transparent)]"
                          : "border border-border bg-surface-raised text-text-secondary hover:border-accent hover:text-accent"
                      }`}
                    >
                      {c.label}
                      <span
                        className={`rounded-full px-1.5 py-px text-[0.62rem] ${
                          active ? "bg-accent-foreground/20 text-accent-foreground" : "bg-bg-elevated text-text-muted"
                        }`}
                      >
                        {c.count}
                      </span>
                    </button>
                  );
                })}
                {hiddenCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAllTopics(true)}
                    className="rounded-full px-3 py-2 font-mono text-[0.75rem] font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-150 hover:decoration-accent"
                  >
                    +{hiddenCount} more topics
                  </button>
                )}
                {showAllTopics && categories.length > 8 && (
                  <button
                    type="button"
                    onClick={() => setShowAllTopics(false)}
                    className="rounded-full px-3 py-2 font-mono text-[0.75rem] font-semibold text-text-muted transition-colors duration-150 hover:text-text-primary"
                  >
                    show less
                  </button>
                )}
              </div>
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
