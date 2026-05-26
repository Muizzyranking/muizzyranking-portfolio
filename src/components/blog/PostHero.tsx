import Link from "next/link";
import type { PostMeta } from "@/types";

export default function PostHero({ post }: { post: PostMeta }) {
  return (
    <div
      style={{
        position: "relative",
        paddingTop: "clamp(6rem, 14vw, 10rem)",
        paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
        borderBottom: "1px solid var(--color-border-subtle)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
              linear-gradient(var(--color-border-subtle) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)
            `,
          backgroundSize: "48px 48px",
          opacity: 0.3,
          pointerEvents: "none",
          maskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      <div className="container-main" style={{ position: "relative", zIndex: 2 }}>
        <div className="eyebrow" style={{ marginBottom: "2rem" }}>
          <Link href="/blog" className="eyebrow__mark" style={{ textDecoration: "none" }}>
            ~/blog
          </Link>
          <span className="eyebrow__rule" />
          <span>{post.publishedAt}</span>
          <span style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>·</span>
          <span>{post.readingTime.text}</span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.1rem, 5vw, 3.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 1.05,
            maxWidth: "22ch",
            marginBottom: "1.25rem",
            color: "var(--color-text-primary)",
          }}
        >
          {post.title}
        </h1>

        {post.summary && (
          <p
            style={{
              fontSize: "clamp(1rem, 1.9vw, 1.15rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              maxWidth: "58ch",
              marginBottom: "1.5rem",
            }}
          >
            {post.summary}
          </p>
        )}

        {post.categories.length > 0 && (
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {post.categories.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.66rem",
                  color: "var(--color-text-muted)",
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.18rem 0.5rem",
                  textDecoration: "none",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                className="cat-chip"
              >
                {c.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .cat-chip:hover {
          color: var(--color-text-primary) !important;
          border-color: var(--color-accent-dim) !important;
        }
      `}</style>
    </div>
  );
}
