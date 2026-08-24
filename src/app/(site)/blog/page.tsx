import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
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
  return <BlogIndex posts={posts} categories={categories} />;
}
