import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { slugify } from "@/lib/blog";
import { assembleProjectBody, buildProjectFrontmatter, type ProjectFrontmatterInput, type ProjectParsed } from "@/lib/editor-write";

const projectsDir = path.join(process.cwd(), "content/projects");

export async function GET() {
  if (!fs.existsSync(projectsDir)) {
    return NextResponse.json({ projects: [] });
  }

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));
  const projects = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filepath = path.join(projectsDir, filename);
    const raw = fs.readFileSync(filepath, "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title ?? "",
      summary: data.summary ?? "",
      status: data.status ?? "complete",
      year: data.year ?? "",
      featured: Boolean(data.featured),
      draft: Boolean(data.draft),
      filepath,
    };
  });

  projects.sort((a, b) => Number(b.year) - Number(a.year));

  return NextResponse.json({ projects });
}

type CreateBody = {
  slug: string;
  frontmatter: ProjectFrontmatterInput;
  parsed: ProjectParsed;
};

export async function POST(req: Request) {
  const data = (await req.json()) as CreateBody;

  if (!data.frontmatter?.title?.trim()) {
    return new NextResponse("Title is required", { status: 400 });
  }
  const slug = slugify(data.slug || data.frontmatter.title);
  if (!slug) {
    return new NextResponse("Slug is required", { status: 400 });
  }

  fs.mkdirSync(projectsDir, { recursive: true });
  const filepath = path.join(projectsDir, `${slug}.mdx`);
  if (fs.existsSync(filepath)) {
    return new NextResponse(`Project "${slug}" already exists`, { status: 409 });
  }

  const body = assembleProjectBody(data.parsed);
  const content = matter.stringify(body, buildProjectFrontmatter(data.frontmatter));
  fs.writeFileSync(filepath, content, "utf8");

  return NextResponse.json({ slug, filepath });
}
