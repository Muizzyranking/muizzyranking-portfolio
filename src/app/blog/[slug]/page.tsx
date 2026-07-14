import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostBody from "@/components/blog/PostBody";
import PostHero from "@/components/blog/PostHero";
import TableOfContents from "@/components/blog/TableOfContents";
import { getAllPosts, getPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = "https://muizzyranking.me";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} — Muiz Oyebowale`,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url,
      publishedTime: post.publishedAtIso,
      authors: ["Muiz Oyebowale"],
      tags: post.categories.map((c) => c.label),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      creator: "@muizzyranking",
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAtIso,
    dateModified: post.publishedAtIso,
    author: {
      "@type": "Person",
      name: "Muiz Oyebowale",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Muiz Oyebowale",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.categories.map((c) => c.label).join(", "),
  };

  return (
    <>
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: trusted JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PostHero post={post} />

      {/* ── BODY + TOC ── */}
      <div style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0 clamp(5rem, 10vw, 8rem)" }}>
        <div
          className="container-main post-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 220px",
            gap: "4rem",
          }}
        >
          <article style={{ minWidth: 0 }}>
            <PostBody source={post.body} />

            <div
              style={{
                marginTop: "3.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--color-border-subtle)",
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/blog"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  color: "var(--color-text-muted)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
                className="group"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
                <span>all writing</span>
              </Link>
              <a
                href="https://twitter.com/intent/tweet"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  color: "var(--color-accent)",
                }}
              >
                share →
              </a>
            </div>
          </article>

          <div>
            <TableOfContents items={post.toc} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .post-layout {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 0 !important;
          }
        }
        .cat-chip:hover {
          color: var(--color-text-primary) !important;
          border-color: var(--color-accent-dim) !important;
        }
      `}</style>
    </>
  );
}
