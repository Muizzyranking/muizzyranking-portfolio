import { NextResponse } from "next/server";
import { getAllProjects } from "@/lib/projects";

const SITE_URL = "https://muizzyranking.me";

export const revalidate = 3600;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? Math.max(1, Math.min(50, Number(limitParam) || 10)) : undefined;
  const featuredOnly = url.searchParams.get("featured") === "true";

  const all = featuredOnly ? getAllProjects().filter((p) => p.featured) : getAllProjects();
  const projects = (limit ? all.slice(0, limit) : all).map((p) => ({
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    status: p.status,
    year: p.year,
    stack: p.stack,
    repo: p.repo,
    live: p.live,
    featured: p.featured,
    url: `${SITE_URL}/projects/${p.slug}`,
  }));

  return NextResponse.json({ count: projects.length, projects }, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" } });
}
