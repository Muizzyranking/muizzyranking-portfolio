"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import SectionHeader from "@/components/sections/homepage/SectionHeader";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import type { PostMeta } from "@/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function PostRow({ post, index }: { post: PostMeta; index: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-x-8 gap-y-1 border-b border-border-subtle py-6 transition-colors duration-200 md:grid-cols-[2.5rem_minmax(0,1fr)_auto] md:items-baseline"
    >
      <span
        className="font-mono text-[0.75rem] tracking-[0.1em] text-text-muted transition-colors duration-200 group-hover:text-accent"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="min-w-0">
        <h3 className="font-display text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.3] font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-200 group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-1.5 max-w-[64ch] text-[0.95rem] leading-[1.65] text-text-secondary line-clamp-1">{post.summary}</p>
        {post.categories.length > 0 && (
          <span className="mt-2 flex flex-wrap gap-1.5">
            {post.categories.slice(0, 3).map((c) => (
              <span key={c.slug} className="chip">
                {c.label}
              </span>
            ))}
          </span>
        )}
      </span>

      <span className="flex items-center gap-4 font-mono text-[0.7rem] tracking-[0.08em] text-text-muted whitespace-nowrap max-md:hidden">
        <span>{formatDate(post.publishedAtIso)}</span>
        <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-accent">
          →
        </span>
      </span>
    </Link>
  );
}

export default function BlogTeaser({ posts }: { posts: PostMeta[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 14 };

  return (
    <section ref={ref} className="section section-band">
      <div className="container-main">
        <SectionHeader
          eyebrow="Writing"
          title="Notes from the field."
          right={
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-[0.8rem] font-semibold tracking-[0.08em] text-accent uppercase"
            >
              All writing
              <span className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          }
        />

        {posts.length > 0 && (
          <div className="border-t border-border-subtle">
            {posts.map((post, i) => (
              <m.div
                key={post.slug}
                initial={{ opacity: 0, ...from }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.06 * i }}
              >
                <PostRow post={post} index={i} />
              </m.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
