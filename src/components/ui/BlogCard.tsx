"use client";

import { m } from "framer-motion";
import { useState } from "react";
import type { HashnodePost } from "@/lib/hashnode";

type Props = {
  post: HashnodePost;
  index: number;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({ post, index }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ position: "relative" }}
    >
      {/* Top border */}
      <div style={{ position: "relative", height: "1px" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-border-subtle)",
          }}
        />
        <m.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-accent)",
            transformOrigin: "left",
          }}
        />
      </div>
      <a
        href={`https://muizzyranking.hashnode.dev/${post.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "3rem 1fr auto",
          gap: "1.5rem",
          alignItems: "center",
          paddingBlock: "1.75rem",
          paddingInline: "1rem",
          backgroundColor: hovered ? "var(--color-surface)" : "transparent",
          borderRadius: "var(--radius-md)",
          transition: "background-color 0.25s ease",
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        {/* Index */}
        <m.span
          animate={{
            color: hovered ? "var(--color-accent)" : "var(--color-text-muted)",
          }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            userSelect: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </m.span>

        {/* Content */}
        <div style={{ minWidth: 0 }}>
          <m.h3
            animate={{
              color: hovered
                ? "var(--color-accent)"
                : "var(--color-text-primary)",
            }}
            transition={{ duration: 0.2 }}
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              margin: 0,
              marginBlockEnd: "0.4rem",
            }}
          >
            {post.title}
          </m.h3>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              margin: 0,
              lineHeight: 1.6,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "60ch",
            }}
          >
            {post.brief}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                marginBlockStart: "0.6rem",
                flexWrap: "wrap",
              }}
            >
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.slug}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-muted)",
                    backgroundColor: "var(--color-surface)",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--color-border-subtle)",
                  }}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right — date + read time + arrow */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.4rem",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            {formatDate(post.publishedAt)}
          </span>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--color-text-muted)",
              opacity: 0.6,
            }}
          >
            {post.readTimeInMinutes} min read
          </span>

          <m.span
            animate={{
              x: hovered ? 4 : 0,
              opacity: hovered ? 1 : 0.25,
              color: hovered
                ? "var(--color-accent)"
                : "var(--color-text-muted)",
            }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: "0.85rem" }}
          >
            →
          </m.span>
        </div>
      </a>

      {/* Bottom reveal line */}
      <div style={{ position: "relative", height: "1px" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-border-subtle)",
          }}
        />
        <m.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
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
