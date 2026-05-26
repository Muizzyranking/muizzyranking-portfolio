import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { assembleProjectBody, buildProjectFrontmatter, type ProjectFrontmatterInput, type ProjectParsed } from "@/lib/editor-write";
import { parseProjectContent } from "@/lib/projects";

const projectsDir = path.join(process.cwd(), "content/projects");

type Params = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const filepath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) {
    return new NextResponse("Project not found", { status: 404 });
  }

  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  const parsed = parseProjectContent(content);

  return NextResponse.json({
    slug,
    filepath,
    frontmatter: data,
    body: content,
    parsed,
  });
}

type UpdateBody = {
  slug: string;
  frontmatter: ProjectFrontmatterInput;
  parsed: ProjectParsed;
};

export async function PUT(req: Request, { params }: Params) {
  const { slug: urlSlug } = await params;
  const data = (await req.json()) as UpdateBody;

  const filepath = path.join(projectsDir, `${urlSlug}.mdx`);
  if (!fs.existsSync(filepath)) {
    return new NextResponse("Project not found", { status: 404 });
  }

  const newSlug = (data.slug || "").trim();
  if (newSlug && newSlug !== urlSlug) {
    return new NextResponse("Slug rename is not supported. Delete the old file manually and create a new project.", { status: 400 });
  }

  const body = assembleProjectBody(data.parsed);
  const content = matter.stringify(body, buildProjectFrontmatter(data.frontmatter));
  fs.writeFileSync(filepath, content, "utf8");

  return NextResponse.json({ slug: urlSlug, filepath });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { slug } = await params;
  const filepath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) {
    return new NextResponse("Project not found", { status: 404 });
  }
  fs.unlinkSync(filepath);
  return NextResponse.json({ slug });
}
