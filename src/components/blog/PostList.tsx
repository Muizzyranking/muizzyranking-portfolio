"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";
import type { PostMeta } from "@/types";

function PostRow({ post }: { post: PostMeta }) {
  const [hovered, setHovered] = useState(false);
  const date = new Date(post.publishedAtIso);
  const dateLabel = date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return (
    <m.div variants={staggerItem} style={{ position: "relative" }}>
      <div style={{ height: "1px", backgroundColor: "var(--color-border-subtle)" }} />
      <Link
        href={`/blog/${post.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "1.5rem",
          paddingBlock: "1.5rem",
          paddingInline: "1rem",
          position: "relative",
          textDecoration: "none",
          color: "inherit",
          borderRadius: "var(--radius-md)",
          transition: "background-color 0.3s ease",
          backgroundColor: hovered ? "color-mix(in srgb, var(--color-accent) 4%, transparent)" : "transparent",
          alignItems: "start",
        }}
      >
        <m.div
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          initial={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: 0,
            top: "1.1rem",
            bottom: "1.1rem",
            width: "2px",
            backgroundColor: "var(--color-accent)",
            transformOrigin: "top",
            borderRadius: "2px",
          }}
        />

        <div style={{ minWidth: 0 }}>
          <m.h3
            animate={{ color: hovered ? "var(--color-accent)" : "var(--color-text-primary)" }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.1rem, 1.9vw, 1.35rem)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              margin: "0 0 0.4rem",
              lineHeight: 1.25,
            }}
          >
            {post.title}
          </m.h3>
          {post.summary && (
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                margin: "0 0 0.65rem",
                maxWidth: "64ch",
              }}
            >
              {post.summary}
            </p>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
              alignItems: "center",
            }}
          >
            {post.categories.slice(0, 3).map((c) => (
              <span
                key={c.slug}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.16rem 0.45rem",
                }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.35rem",
            flexShrink: 0,
            paddingTop: "0.2rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.06em",
            }}
          >
            {dateLabel}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--color-accent)",
              opacity: 0.85,
            }}
          >
            {post.readingTime.text}
          </span>
        </div>
      </Link>
      {/* Bottom reveal line */}
      <div style={{ position: "relative", height: "1px" }}>
        <m.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-accent)",
            transformOrigin: "left",
          }}
        />
      </div>
    </m.div>
  );
}

export default function PostList({ posts }: { posts: PostMeta[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  if (posts.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "5rem 0",
          fontFamily: "var(--font-mono)",
          color: "var(--color-text-muted)",
          fontSize: "0.82rem",
        }}
      >
        <p style={{ marginBottom: "0.5rem" }}>
          <span style={{ color: "var(--color-accent)" }}>$</span> ls ./posts
        </p>
        <p>{"// nothing here yet."}</p>
      </div>
    );
  }

  return (
    <m.div ref={ref} variants={staggerContainer} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {posts.map((post) => (
        <PostRow key={post.slug} post={post} />
      ))}
    </m.div>
  );
}
