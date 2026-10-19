import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostList from "@/components/blog/PostList";
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
      <header className="container-main pt-[clamp(5rem,10vw,8rem)] pb-[clamp(3rem,6vw,4.5rem)] border-b border-border-subtle">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.08em] text-text-muted uppercase mb-8 hover:text-text-primary"
        >
          <span className="transition-transform duration-150 ease-out group-hover:-translate-x-1" aria-hidden="true">
            ←
          </span>
          all writing
        </Link>

        <p className="eyebrow mb-6">category</p>
        <h1 className="font-display font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(2.1rem,5vw,3.5rem)] text-text-primary mb-4">
          {category.label}
        </h1>
        <p className="font-mono text-[0.72rem] tracking-[0.06em] text-text-muted">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </header>

      <div className="container-main py-[clamp(2.5rem,5vw,4rem)] pb-[clamp(4rem,8vw,7rem)]">
        <PostList posts={posts} />
      </div>
    </>
  );
}
