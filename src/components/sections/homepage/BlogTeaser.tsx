"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { SOCIALS } from "@/lib/data";
import type { HashnodePost } from "@/lib/hashnode";
import { fadeUp, SCROLL_REVEAL } from "@/lib/motion";

type Props = {
  posts: HashnodePost[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export default function BlogTeaser({ posts }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      id="blog"
      style={{
        padding: "clamp(5rem, 10vw, 8rem) 0",
        borderTop: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container-main">
        <m.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>
            [  ]
          </span>
          Writing
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--color-border)",
            }}
          />
        </m.p>

        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <m.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            From the notebook
          </m.h2>

          <m.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Link
              href="/blog"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.76rem",
                color: "var(--color-accent)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.65";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
            >
              all posts →
            </Link>
          </m.div>
        </div>

        {/* Post list */}
        <div>
          {posts.map((post, i) => (
            <m.a
              key={post.id}
              href={`${SOCIALS.hashnode.href}/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{
                delay: 0.15 + i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ paddingLeft: "0.75rem" }}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "2rem",
                padding: "1.5rem 0",
                borderBottom: "1px solid var(--color-border-subtle)",
                textDecoration: "none",
                transition: "padding-left 0.2s ease",
                color: "inherit",
              }}
              className={i === 0 ? "blog-first-item" : ""}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "var(--color-text-primary)",
                    marginBottom: "0.35rem",
                    lineHeight: 1.4,
                    transition: "color 0.2s",
                  }}
                  className="blog-title"
                >
                  {post.title}
                </p>
                <p
                  style={{
                    fontSize: "0.855rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.55,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "56ch",
                  }}
                >
                  {post.brief}
                </p>
                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.35rem",
                      marginTop: "0.6rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.slug}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.63rem",
                          color: "var(--color-text-muted)",
                          border: "1px solid var(--color-border-subtle)",
                          borderRadius: "var(--radius-sm)",
                          padding: "0.15rem 0.45rem",
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right meta */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.35rem",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {formatDate(post.publishedAt)}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-accent)",
                  }}
                >
                  {post.readTimeInMinutes} min read
                </span>
              </div>
            </m.a>
          ))}
        </div>
      </div>

      <style>{`
        .blog-first-item { border-top: 1px solid var(--color-border-subtle); }
        a:hover .blog-title { color: var(--color-accent) !important; }

        @media (max-width: 600px) {
          /* Stack layout on mobile */
          .blog-row { flex-direction: column !important; gap: 0.5rem !important; }
        }
      `}</style>
    </section>
  );
}
