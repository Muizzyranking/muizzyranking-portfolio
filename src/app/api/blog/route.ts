import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const revalidate = 3600;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? Math.max(1, Math.min(50, Number(limitParam) || 10)) : undefined;

  const all = getAllPosts();
  const posts = (limit ? all.slice(0, limit) : all).map((p) => ({
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    url: `${site.url}/blog/${p.slug}`,
    publishedAt: p.publishedAt,
    publishedAtIso: p.publishedAtIso,
    categories: p.categories.map((c) => c.label),
    readingTime: p.readingTime.text,
  }));

  return NextResponse.json({ count: posts.length, posts }, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" } });
}
