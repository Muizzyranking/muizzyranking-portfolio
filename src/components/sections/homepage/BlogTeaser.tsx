"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import DocSection, { DocLink } from "@/components/ui/DocSection";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import type { PostMeta } from "@/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function PostRow({ post, n, inView, reduce }: { post: PostMeta; n: number; inView: boolean; reduce: boolean }) {
  const from = reduce ? {} : { y: 12 };

  return (
    <Link href={`/blog/${post.slug}`} className="group block border-b border-border-subtle py-7">
      <m.div
        initial={{ opacity: 0, ...from }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.06 * n }}
        className="grid items-baseline gap-x-10 gap-y-2 md:grid-cols-[minmax(0,1fr)_auto]"
      >
        <div className="min-w-0">
          <div className="flex items-baseline gap-4 font-mono text-[0.7rem] text-text-muted">
            <span className="font-medium text-accent">{String(n + 1).padStart(2, "0")}</span>
            <time dateTime={post.publishedAtIso}>{formatDate(post.publishedAtIso)}</time>
            <span>{post.readingTime.text}</span>
          </div>

          <h3 className="mt-2.5 font-display text-[clamp(1.2rem,2vw,1.4rem)] leading-[1.25] tracking-[-0.02em] font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">
            {post.title}
          </h3>

          <p className="mt-1.5 max-w-[64ch] text-[0.92rem] leading-[1.6] text-text-secondary line-clamp-1">{post.summary}</p>
        </div>

        <span
          className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-text-muted transition-colors duration-200 group-hover:text-accent max-md:hidden"
          aria-hidden="true"
        >
          read
          <span className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
        </span>
      </m.div>
    </Link>
  );
}

export default function BlogTeaser({ posts }: { posts: PostMeta[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();

  return (
    <DocSection title="Things I've written." action={<DocLink href="/blog">all writings</DocLink>}>
      {posts.length > 0 && (
        <div ref={ref} className="border-t border-border-subtle">
          {posts.map((post, i) => (
            <PostRow key={post.slug} post={post} n={i} inView={inView} reduce={Boolean(reduce)} />
          ))}
        </div>
      )}
    </DocSection>
  );
}
