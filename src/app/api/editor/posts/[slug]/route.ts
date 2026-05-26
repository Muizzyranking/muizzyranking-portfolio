import fs from "node:fs";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { clearBlogCache, listAllPostsForEditor } from "@/lib/blog";
import { buildPostFrontmatter, type PostFrontmatterInput } from "@/lib/editor-write";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const entry = listAllPostsForEditor().find((p) => p.meta.slug === slug);
  if (!entry) {
    return new NextResponse("Post not found", { status: 404 });
  }

  const raw = fs.readFileSync(entry.meta.filepath, "utf8");
  const { data, content } = matter(raw);

  return NextResponse.json({
    slug: entry.meta.slug,
    filepath: entry.meta.filepath,
    year: entry.meta.year,
    month: entry.meta.month,
    frontmatter: data,
    body: content,
  });
}

type UpdateBody = {
  year: number;
  month: number;
  slug: string;
  frontmatter: PostFrontmatterInput;
  body: string;
};

export async function PUT(req: Request, { params }: Params) {
  const { slug: urlSlug } = await params;
  const data = (await req.json()) as UpdateBody;

  const entry = listAllPostsForEditor().find((p) => p.meta.slug === urlSlug);
  if (!entry) {
    return new NextResponse("Post not found", { status: 404 });
  }

  const newSlug = (data.slug || "").trim();
  if (newSlug && newSlug !== urlSlug) {
    return new NextResponse("Slug rename is not supported. Delete the old file manually and create a new post.", { status: 400 });
  }
  if (Number(data.year) !== entry.meta.year || Number(data.month) !== entry.meta.month) {
    return new NextResponse("Year/month change would move the file. Delete the old file manually and create a new post in the new month.", {
      status: 400,
    });
  }

  const content = matter.stringify(data.body || "", buildPostFrontmatter(data.frontmatter, urlSlug));
  fs.writeFileSync(entry.meta.filepath, content, "utf8");
  clearBlogCache();

  return NextResponse.json({ slug: urlSlug, filepath: entry.meta.filepath });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { slug } = await params;
  const entry = listAllPostsForEditor().find((p) => p.meta.slug === slug);
  if (!entry) {
    return new NextResponse("Post not found", { status: 404 });
  }
  fs.unlinkSync(entry.meta.filepath);
  clearBlogCache();
  return NextResponse.json({ slug });
}
