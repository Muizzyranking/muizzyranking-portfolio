import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostList from "@/components/blog/PostList";
import { getAllCategories, getCategoryBySlug, getPostsByCategory } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = "https://muizzyranking.me";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Not found" };

  return {
    title: `${category.label} — Writing | Muiz Oyebowale`,
    description: `Posts tagged ${category.label} on Muiz Oyebowale's writing.`,
    alternates: { canonical: `${SITE_URL}/blog/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);

  return (
    <>
      <div
        style={{
          position: "relative",
          paddingTop: "clamp(6rem, 14vw, 10rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
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
          <p className="eyebrow" style={{ marginBottom: "2rem" }}>
            <Link href="/blog" className="eyebrow__mark" style={{ textDecoration: "none" }}>
              ~/blog
            </Link>
            <span className="eyebrow__rule" />
            <span>category</span>
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 4.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1,
              marginBottom: "0.75rem",
            }}
          >
            <span style={{ color: "var(--color-accent)" }}>#</span>{" "}
            <span style={{ color: "var(--color-text-primary)", fontStyle: "italic" }}>{category.label}</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.06em",
              color: "var(--color-text-muted)",
            }}
          >
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>
      </div>

      <div style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0 clamp(5rem, 10vw, 8rem)" }}>
        <div className="container-main">
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}
