"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import PostRow from "@/components/blog/PostRow";
import FilterDropdown from "@/components/ui/FilterDropdown";
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
    <div className="min-w-0">
      {/* toolbar: search + topic dropdown + live count */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-border pb-4">
        <label className="group relative block w-full max-w-[20rem]">
          <span className="sr-only">Search writing</span>
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-3 -translate-y-1/2 text-text-muted transition-colors duration-150 group-focus-within:text-text-primary"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="presentation">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search writing"
            className="w-full border border-border bg-surface-raised py-1.5 pr-3 pl-9 font-mono text-[0.78rem] text-text-primary transition-colors duration-150 outline-none rounded-[var(--radius-sm)] placeholder:text-text-muted focus:border-text-secondary"
          />
        </label>

        <div className="flex items-center gap-4">
          {categories.length > 0 && (
            <FilterDropdown
              idleLabel="topics"
              ariaLabel="Filter by topic"
              allLabel="all topics"
              allCount={posts.length}
              options={categories.map((c) => ({ key: c.slug, label: c.label, count: c.count }))}
              value={activeCategory ? (categories.find((c) => c.slug === activeCategory)?.label ?? activeCategory) : null}
              onChange={setActiveCategory}
            />
          )}
          <span className="font-mono text-[0.7rem] text-text-muted" aria-live="polite">
            {filtered.length} / {posts.length}
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border-t border-border-subtle py-20 text-center">
          <p className="mb-2 font-mono text-[0.8rem] text-text-muted">No posts match.</p>
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
        <div className="border-t border-border-subtle overflow-x-clip">
          <m.div layout={!reduce} initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.35, ease: EASE }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <m.div
                  key={post.slug}
                  layout={!reduce}
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <PostRow post={post} n={i + 1} />
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>
        </div>
      )}
    </div>
  );
}
