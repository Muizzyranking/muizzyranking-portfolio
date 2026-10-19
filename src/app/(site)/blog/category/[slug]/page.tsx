import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostList from "@/components/blog/PostList";
import PageHead from "@/components/layout/PageHead";
import DocSection from "@/components/ui/DocSection";
import { getAllCategories, getCategoryBySlug, getPostsByCategory } from "@/lib/blog";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Not found" };

  return {
    title: `${category.label} · Writing`,
    description: `Posts tagged ${category.label} on ${site.name}'s writing.`,
    alternates: { canonical: `${site.url}/blog/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);

  return (
    <>
      <PageHead crumb="writing" meta={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`} title={category.label} />
      <DocSection>
        <PostList posts={posts} />
      </DocSection>
    </>
  );
}
