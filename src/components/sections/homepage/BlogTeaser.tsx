"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL } from "@/lib/motion";
import type { PostMeta } from "@/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export default function BlogTeaser({ posts }: { posts: PostMeta[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      id="blog"
      className="py-[clamp(5rem,10vw,8rem)] border-t border-border-subtle"
    >
      <div className="container-main">
        <m.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="eyebrow mb-8"
        >
          <span className="eyebrow__mark">[ 04 ]</span>
          Writing
          <span className="eyebrow__rule" />
        </m.p>

        <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
          <m.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-display font-semibold tracking-[-0.04em] leading-[1.05] text-[clamp(1.9rem,4vw,2.75rem)]"
          >
            From the notebook
          </m.h2>

          <m.div variants={fadeUp} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-[0.76rem] text-accent tracking-[0.08em]"
            >
              <span>all posts</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </m.div>
        </div>

        {posts.length === 0 ? (
          <div className="py-12 font-mono text-text-muted text-[0.82rem]">
            <p className="mb-2">
              <span className="text-accent">$</span> ls ./posts
            </p>
            <p>{"// nothing here yet. check back soon."}</p>
          </div>
        ) : (
          <div>
            {posts.map((post, i) => (
              <m.div
                key={post.slug}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-baseline justify-between gap-8 py-6 border-b border-border-subtle no-underline text-inherit transition-[padding-left] duration-200 ease-out hover:pl-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-text-primary mb-[0.35rem] leading-[1.3] transition-colors duration-200 group-hover:text-accent">
                      {post.title}
                    </p>
                    {post.summary && (
                      <p className="text-[0.85rem] text-text-muted leading-[1.55] overflow-hidden text-ellipsis whitespace-nowrap max-w-[56ch]">
                        {post.summary}
                      </p>
                    )}
                    {post.categories.length > 0 && (
                      <div className="flex gap-[0.35rem] mt-[0.6rem] flex-wrap">
                        {post.categories.slice(0, 3).map((c) => (
                          <span
                            key={c.slug}
                            className="font-mono text-[0.63rem] text-text-muted border border-border-subtle rounded-sm px-[0.45rem] py-[0.15rem]"
                          >
                            {c.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-[0.35rem] shrink-0">
                    <span className="font-mono text-[0.68rem] text-text-muted tracking-[0.08em]">
                      {formatDate(post.publishedAtIso)}
                    </span>
                    <span className="font-mono text-[0.65rem] text-accent">
                      {post.readingTime.text}
                    </span>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
