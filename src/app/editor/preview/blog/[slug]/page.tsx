import Link from "next/link";
import { notFound } from "next/navigation";
import PostBody from "@/components/blog/PostBody";
import PostHero from "@/components/blog/PostHero";
import TableOfContents from "@/components/blog/TableOfContents";
import { getPostIncludingDrafts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export default async function BlogPreviewPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostIncludingDrafts(slug);
  if (!post) notFound();

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: "4rem",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "0.7rem 1.25rem",
          background: "var(--color-bg-elevated)",
          borderBottom: "1px solid var(--color-border-subtle)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
        }}
      >
        <Link
          href={`/editor/blog/${slug}`}
          style={{ color: "var(--color-accent)", textDecoration: "none" }}
        >
          ← back to editor
        </Link>
        <span style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>·</span>
        <span style={{ color: "var(--color-text-muted)" }}>preview · {slug}</span>
      </div>

      <PostHero post={post} />
      <div style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0 clamp(5rem, 10vw, 8rem)" }}>
        <div
          className="container-main post-layout"
          style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 220px", gap: "4rem" }}
        >
          <article style={{ minWidth: 0 }}>
            <PostBody source={post.body} />
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
      `}</style>
    </>
  );
}
