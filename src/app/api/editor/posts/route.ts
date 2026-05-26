import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { clearBlogCache, listAllPostsForEditor, slugify } from "@/lib/blog";
import { buildPostFrontmatter, type PostFrontmatterInput } from "@/lib/editor-write";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function GET() {
  const posts = listAllPostsForEditor().map((p) => ({
    slug: p.meta.slug,
    title: p.meta.title,
    year: p.meta.year,
    month: p.meta.month,
    day: p.meta.day,
    publishedAt: p.meta.publishedAt,
    publishedAtIso: p.meta.publishedAtIso,
    draft: p.draft,
    filepath: p.meta.filepath,
  }));

  return NextResponse.json({ posts });
}

type CreateBody = {
  year: number;
  month: number;
  slug: string;
  frontmatter: PostFrontmatterInput;
  body: string;
};

export async function POST(req: Request) {
  const data = (await req.json()) as CreateBody;

  if (!data.frontmatter?.title?.trim()) {
    return new NextResponse("Title is required", { status: 400 });
  }
  const slug = slugify(data.slug || data.frontmatter.slug || data.frontmatter.title);
  if (!slug) {
    return new NextResponse("Slug is required", { status: 400 });
  }
  const year = Number(data.year);
  const month = Number(data.month);
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return new NextResponse("Invalid year or month", { status: 400 });
  }

  if (listAllPostsForEditor().some((p) => p.meta.slug === slug)) {
    return new NextResponse(`Slug "${slug}" is already in use`, { status: 409 });
  }

  const monthDir = path.join(BLOG_DIR, String(year), String(month).padStart(2, "0"));
  fs.mkdirSync(monthDir, { recursive: true });
  const filepath = path.join(monthDir, `${slug}.mdx`);

  if (fs.existsSync(filepath)) {
    return new NextResponse(`File already exists at ${filepath}`, { status: 409 });
  }

  const content = matter.stringify(data.body || "", buildPostFrontmatter(data.frontmatter, slug));
  fs.writeFileSync(filepath, content, "utf8");
  clearBlogCache();

  return NextResponse.json({ slug, filepath });
}
