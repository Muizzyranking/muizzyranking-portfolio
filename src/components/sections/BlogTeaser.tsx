import AnimatedLink from "@/components/ui/AnimatedLink";
import BlogCard from "@/components/ui/BlogCard";
import { getPosts } from "@/lib/hashnode";

const MAX_BLOG_POSTS = 3;

export default async function BlogTeaser() {
  const posts = await getPosts(MAX_BLOG_POSTS);

  return (
    <section className="section">
      <div className="container-main">

        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBlockEnd: "3rem",
          }}
        >
          <div>
            <p
              className="mono-label"
              style={{
                marginBlockEnd: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ color: "var(--color-accent)", opacity: 0.6, whiteSpace: "nowrap" }}>[ 05 ]</span>
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
    </section>
  );
}
