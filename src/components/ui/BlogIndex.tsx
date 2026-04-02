"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { SOCIALS } from "@/lib/data";
import type { HashnodePost } from "@/lib/hashnode";
import { SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

type Props = {
  posts: HashnodePost[];
  byYear: Record<string, HashnodePost[]>;
  years: string[];
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function PostRow({ post }: { post: HashnodePost }) {
  const href = `${SOCIALS.hashnode.href}/${post.slug}`;

  return (
    <m.a
      variants={staggerItem}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ paddingLeft: "0.75rem" } as never}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: "2rem",
        padding: "1.375rem 0",
        borderBottom: "1px solid var(--color-border-subtle)",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: "0.97rem",
            fontWeight: 500,
            color: "var(--color-text-primary)",
            marginBottom: "0.3rem",
            lineHeight: 1.4,
            transition: "color 0.15s",
          }}
          className="post-title"
        >
          {post.title}
        </p>
        <p
          style={{
            fontSize: "0.845rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.55,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "60ch",
          }}
        >
          {post.brief}
        </p>
        {post.tags?.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "0.35rem",
              marginTop: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.slug}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.12rem 0.4rem",
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
          gap: "0.3rem",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.67rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.08em",
          }}
        >
          {formatDate(post.publishedAt)}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.63rem",
            color: "var(--color-accent)",
          }}
        >
          {post.readTimeInMinutes} min
        </span>
      </div>
    </m.a>
  );
}

export default function BlogIndex({ posts, byYear, years }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div
        ref={headerRef}
        style={{
          position: "relative",
          paddingTop: "clamp(6rem, 14vw, 10rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
          borderBottom: "1px solid var(--color-border-subtle)",
          overflow: "hidden",
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            opacity: 0.35,
            pointerEvents: "none",
            maskImage:
              "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
          }}
        />

        <m.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: "clamp(6rem, 14vw, 10rem)",
            left: "clamp(1.5rem, 5vw, 4rem)",
            right: "clamp(1.5rem, 5vw, 4rem)",
            height: "1px",
            background:
              "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)",
            transformOrigin: "left",
          }}
        />

        <div
          className="container-main"
          style={{ position: "relative", zIndex: 2 }}
        >
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
              ~/writing
            </span>
            <span
              style={{
                display: "inline-block",
                width: "32px",
                height: "1px",
                background: "var(--color-border)",
              }}
            />
            all posts
          </m.p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <m.h1
              initial={{ opacity: 0, y: 14 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              <span
                style={{ color: "var(--color-accent)", display: "block" }}
              >
                From the
              </span>
              <span
                style={{
                  color: "var(--color-text-primary)",
                  display: "block",
                  fontStyle: "italic",
                }}
              >
                notebook.
              </span>
            </m.h1>

            {/* Post count pill */}
            <m.div
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.4 }}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
              }}
            >
              <span
                style={{
                  padding: "0.3rem 0.6rem",
                  background: "var(--color-surface)",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.08em",
                  borderRight: "1px solid var(--color-border)",
                }}
              >
                posts
              </span>
              <span
                style={{
                  padding: "0.3rem 0.7rem",
                  color: "var(--color-text-secondary)",
                  fontWeight: 600,
                }}
              >
                {posts.length}
              </span>
            </m.div>
          </div>

          <m.p
            initial={{ opacity: 0, y: 8 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginTop: "1.5rem",
              fontSize: "0.92rem",
              color: "var(--color-text-muted)",
              maxWidth: "52ch",
              lineHeight: 1.7,
            }}
          >
            Things I figured out, things I got wrong, and things that took too long
            to find in the docs. Hosted on{" "}
            <a
              href="https://muiz.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--color-accent)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-accent-dim)",
                paddingBottom: "0.05rem",
              }}
            >
              Hashnode
            </a>
            .
          </m.p>
        </div>
      </div>

      {/* ── POSTS — grouped by year ── */}
      <div
        style={{
          padding: "clamp(3rem, 6vw, 5rem) 0 clamp(5rem, 10vw, 8rem)",
        }}
      >
        <div className="container-main">
          {years.map((year, yi) => (
            <YearGroup
              key={year}
              year={year}
              posts={byYear[year]}
              index={yi}
            />
          ))}

          {posts.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "5rem 0",
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-muted)",
                fontSize: "0.82rem",
              }}
            >
              <p>
                <span style={{ color: "var(--color-accent)" }}>$</span> cat
                ./posts
              </p>
              <p style={{ marginTop: "0.5rem" }}>
                {"// nothing published yet. the drafts folder is full though."}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        a:hover .post-title { color: var(--color-accent) !important; }

        @media (max-width: 560px) {
          a[style*="alignItems: baseline"] {
            flex-direction: column !important;
            gap: 0.5rem !important;
            align-items: flex-start !important;
          }
          a[style*="alignItems: baseline"] > div:last-child {
            align-items: flex-start !important;
            flex-direction: row !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}

function YearGroup({
  year,
  posts,
}: {
  year: string;
  posts: HashnodePost[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: "3rem",
        marginBottom: "3rem",
      }}
      className="year-group"
    >
      {/* Year label */}
      <m.div
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingTop: "1.5rem" }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--color-accent)",
            letterSpacing: "0.06em",
          }}
        >
          {year}
        </span>
      </m.div>

      {/* Posts */}
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Top border on first post only */}
        <div style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
          {posts.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </div>
      </m.div>

      <style>{`
        @media (max-width: 560px) {
          .year-group {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
