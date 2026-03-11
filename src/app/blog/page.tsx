import type { Metadata } from "next";
import BlogCard from "@/components/ui/BlogCard";
import HashnodeLink from "@/components/ui/HasnodeLink";
import { getPosts } from "@/lib/hashnode";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on backend engineering, systems, and everything I find interesting enough to write about.",
};

export default async function BlogPage() {
  const posts = await getPosts(20);

  return (
    <div style={{ paddingBlockStart: "clamp(6rem, 14vw, 10rem)", paddingBlockEnd: "8rem" }}>
      <div className="container-main">

        {/* Page header */}
        <div style={{ marginBlockEnd: "5rem" }}>

          {/* Accent rule */}
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, var(--color-accent), var(--color-border), transparent)",
            marginBlockEnd: "2.5rem",
          }} />

          {/* Eyebrow */}
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            margin: "0 0 1.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "nowrap",
          }}>
            <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ writing ]</span>
            All Posts
            <span style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--color-border)",
              verticalAlign: "middle",
              flexShrink: 0,
            }} />
            <span style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>
              {posts.length} total
            </span>
          </p>

          {/* Title */}
          <h1 style={{
            margin: "0 0 1.75rem",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--color-accent)",
          }}>
            Blog
          </h1>

          {/* Description */}
          <p style={{
            fontSize: "1.05rem",
            color: "var(--color-text-secondary)",
            margin: "0 0 0.75rem",
            maxWidth: "52ch",
            lineHeight: 1.8,
          }}>
            Thoughts on backend engineering, systems, and whatever I find
            interesting enough to write about.{" "}
            <span style={{ color: "var(--color-text-primary)" }}>No filler.</span>
          </p>

          
            <HashnodeLink/>

          {/* Bottom rule */}
          <div style={{
            marginBlockStart: "3rem",
            height: "1px",
            background: "linear-gradient(to right, var(--color-accent), var(--color-border-subtle), transparent)",
          }} />
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <p style={{
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
          }}>
            <span style={{ color: "var(--color-accent)" }}>$</span> no posts yet.
          </p>
        ) : (
          <div>
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
            <div style={{
              height: "1px",
              background: "linear-gradient(to right, var(--color-accent), var(--color-border-subtle), transparent)",
            }} />
          </div>
        )}

      </div>
    </div>
  );
}
