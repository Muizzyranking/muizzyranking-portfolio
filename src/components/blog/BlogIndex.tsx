"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { fadeUp } from "@/lib/motion";
import type { Category, PostMeta } from "@/types";
import PostList from "./PostList";

export default function BlogIndex({ posts, categories }: { posts: PostMeta[]; categories: (Category & { count: number })[] }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div
        ref={headerRef}
        className="relative pt-[clamp(6rem,14vw,10rem)] pb-[clamp(3rem,6vw,5rem)] border-b border-border-subtle overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            opacity: 0.35,
            maskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
          }}
        />
        <m.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[clamp(6rem,14vw,10rem)] left-[clamp(1.5rem,5vw,4rem)] right-[clamp(1.5rem,5vw,4rem)] h-px origin-left"
          style={{
            background: "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)",
          }}
        />

        <div className="container-main relative z-[2]">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-8"
          >
            <span className="eyebrow__mark">~/blog</span>
            <span className="eyebrow__rule" />
            things I&apos;ve written
          </m.p>

          <m.h1
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold tracking-[-0.045em] leading-[0.95] mb-5 text-[clamp(2.5rem,6vw,4.5rem)]"
          >
            <span className="block text-accent">From</span>
            <span className="block italic text-text-primary">the notebook.</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(0.95rem,1.7vw,1.05rem)] text-text-secondary leading-[1.65] max-w-[58ch]"
          >
            Notes on backend systems, AI/ML as I learn it, occasional rants about tooling.
          </m.p>
        </div>
      </div>

      {/* ── CATEGORY CHIPS ── */}
      {categories.length > 0 && (
        <div className="border-b border-border-subtle py-6">
          <div className="container-main">
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex gap-2 items-center flex-wrap"
            >
              <span className="font-mono text-[0.66rem] tracking-[0.16em] uppercase text-text-muted mr-2">
                categories:
              </span>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}`}
                  className="font-mono text-[0.72rem] text-text-secondary border border-border rounded-sm px-[0.6rem] py-[0.22rem] no-underline transition-[border-color,color] duration-200 hover:border-accent-dim hover:text-text-primary"
                >
                  {c.label} <span className="text-text-muted opacity-70">· {c.count}</span>
                </Link>
              ))}
            </m.div>
          </div>
        </div>
      )}

      {/* ── POST LIST ── */}
      <div className="py-[clamp(2rem,5vw,4rem)] pb-[clamp(5rem,10vw,8rem)]">
        <div className="container-main">
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}
