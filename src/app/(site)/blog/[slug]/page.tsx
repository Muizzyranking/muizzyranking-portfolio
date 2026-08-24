import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostBody from "@/components/blog/PostBody";
import PostEnd from "@/components/blog/PostEnd";
import PostHero from "@/components/blog/PostHero";
import TableOfContents from "@/components/blog/TableOfContents";
import ReadingProgress from "@/components/ui/ReadingProgress";
import { getAdjacentPosts, getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };

  const url = `${site.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url,
      publishedTime: post.publishedAtIso,
      authors: [site.name],
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

  const url = `${site.url}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAtIso,
    dateModified: post.publishedAtIso,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.categories.map((c) => c.label).join(", "),
  };

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <>
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: trusted JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ReadingProgress />
      <PostHero post={post} />

      <div className="py-[clamp(2.5rem,5vw,4rem)] pb-[clamp(3.5rem,7vw,6rem)]">
        <div className="container-main post-layout">
          <article className="min-w-0">
            <PostBody source={post.body} />
          </article>

          <TableOfContents items={post.toc} />
        </div>
      </div>

      <PostEnd post={post} related={getRelatedPosts(slug)} prev={prev} next={next} />
    </>
  );
}
