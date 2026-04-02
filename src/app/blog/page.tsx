import type { Metadata } from "next";
import BlogIndex from "@/components/ui/BlogIndex";
import { getPosts,type HashnodePost } from "@/lib/hashnode";

export const metadata: Metadata = {
  title: "Writing — Muiz Oyebowale",
  description: "Things I've written about backend engineering, distributed systems, AI, and the occasional rant about tooling.",
};

export default async function BlogPage() {
  const posts = await getPosts(20);

  const byYear = posts.reduce<Record<string, HashnodePost[]>>((acc, post) => {
    const year = new Date(post.publishedAt).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
      <BlogIndex posts={posts} byYear={byYear} years={years} />
  );
}
