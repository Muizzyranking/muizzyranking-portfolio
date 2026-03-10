import type { Metadata } from "next";
import BlogCard from "@/components/ui/BlogCard";
import { getPosts } from "@/lib/hashnode";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on backend engineering, systems, and everything I find interesting enough to write about.",
};

export default async function BlogPage() {
  const posts = await getPosts(20);

  return (
    <div
      style={{
        paddingBlockStart: "clamp(6rem, 14vw, 10rem)",
        paddingBlockEnd: "6rem",
      }}
    >
      <div className="container-main">
        {/* Page header */}
        <div
          style={{
            marginBlockEnd: "4rem",
            paddingBlockEnd: "3rem",
            borderBottom: "1px solid var(--color-border-subtle)",
          }}
        >
          <p className="mono-label" style={{ marginBlockEnd: "0.75rem" }}>
            Writing
          </p>
          <h1
            style={{
              margin: 0,
              marginBlockEnd: "1rem",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
            }}
          >
            Blog
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-secondary)",
              margin: 0,
              lineHeight: 1.8,
            }}
          >
            Thoughts on backend engineering, systems, and whatever I find
            interesting enough to write about.{" "}
            <a
              href="https://muizzyranking.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--color-accent)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationColor: "var(--color-accent-dim)",
              }}
            >
              Also on Hashnode.
            </a>
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>No posts yet.</p>
        ) : (
          <div>
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
            <div
              style={{
                height: "1px",
                backgroundColor: "var(--color-border-subtle)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
