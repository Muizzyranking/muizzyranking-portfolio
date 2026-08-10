"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import SectionHeader from "@/components/sections/homepage/SectionHeader";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import type { PostMeta } from "@/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

function PostRow({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-2 py-6 border-b border-border-subtle md:grid-cols-[1fr_auto] md:gap-8 items-baseline transition-colors duration-150"
    >
      <div>
        <h3 className="font-display font-semibold tracking-[-0.01em] leading-[1.3] text-text-primary text-[1.35rem] transition-colors duration-150 group-hover:text-accent">
          {post.title}
        </h3>
        {post.summary && <p className="text-text-secondary text-[1rem] leading-[1.65] mt-2 max-w-[64ch] line-clamp-2">{post.summary}</p>}
        {post.categories.length > 0 && (
          <div className="flex gap-1.5 mt-2.5 flex-wrap">
            {post.categories.slice(0, 3).map((c) => (
              <span key={c.slug} className="font-mono text-[0.68rem] text-text-muted border border-border-subtle rounded-sm px-2 py-[0.2rem]">
                {c.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-start md:items-end gap-1 font-mono text-[0.72rem] tracking-[0.08em] text-text-muted md:pt-1">
        <span>{formatDate(post.publishedAtIso)}</span>
        <span>{post.readingTime.text}</span>
      </div>
    </Link>
  );
}

export default function BlogTeaser({ posts }: { posts: PostMeta[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

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
          <m.div
            initial={{ opacity: 0, ...from }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
          >
            <div className="border-t border-border-subtle">
              {posts.map((post) => (
                <PostRow key={post.slug} post={post} />
              ))}
            </div>
          </m.div>
        )}
      </div>
    </section>
  );
}
