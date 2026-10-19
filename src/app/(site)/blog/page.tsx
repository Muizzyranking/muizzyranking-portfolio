import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import PageHead from "@/components/layout/PageHead";
import DocSection from "@/components/ui/DocSection";
import { getAllCategories, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on backend systems, tooling, and how software gets built. Written by Muiz Oyebowale.",
  alternates: { canonical: `${site.url}/blog` },
};

export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  return (
    <>
      <PageHead
        crumb="writing"
        meta={`${posts.length} posts`}
        title="Writing."
        description="Notes on backend systems, tooling, and how software gets built."
      />
      <DocSection>
        <BlogIndex posts={posts} categories={categories} />
      </DocSection>
    </>
  );
}
