import Link from "next/link";
import AnimatedLink from "@/components/ui/AnimatedLink";
import BlogCard from "@/components/ui/BlogCard";
import { getPosts } from "@/lib/hashnode";

export default async function BlogTeaser() {
  const posts = await getPosts(3);

  return (
    <section className="section">
      <div className="container-main">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBlockEnd: "3rem",
          }}
        >
          <div>
            <p className="mono-label" style={{ marginBlockEnd: "0.5rem" }}>
              Writing
            </p>
            <h2 style={{ margin: 0 }}>Blog</h2>
          </div>

          <AnimatedLink
            href="/blog"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--color-accent)",
              letterSpacing: "0.04em",
              transition: "opacity 0.2s ease",
              whiteSpace: "nowrap",
              marginBlockEnd: "0.25rem",
            }}
          >
            View all →
          </AnimatedLink>
        </div>

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
    </section>
  );
}
