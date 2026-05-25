import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import { getAllCategories, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing — Muiz Oyebowale",
  description: "Notes on backend systems, AI/ML, and the occasional rant about tooling. Written and maintained by Muiz Oyebowale.",
  alternates: { canonical: "https://muizzyranking.me/blog" },
};

export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  return <BlogIndex posts={posts} categories={categories} />;
}
