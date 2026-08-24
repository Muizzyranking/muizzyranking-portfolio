import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ProjectEditor, { type ProjectEditorInitial } from "@/components/editor/ProjectEditor";
import { parseProjectContent } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

const projectsDir = path.join(process.cwd(), "content/projects");

export default async function EditProjectPage({ params }: Props) {
  const { slug } = await params;
  const filepath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) notFound();

  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  const parsed = parseProjectContent(content);

  const initial: ProjectEditorInitial = {
    mode: "edit",
    slug,
    frontmatter: {
      title: typeof data.title === "string" ? data.title : "",
      summary: typeof data.summary === "string" ? data.summary : "",
      status: data.status === "in-progress" || data.status === "archived" || data.status === "complete" ? data.status : "complete",
      year: data.year !== undefined ? String(data.year) : "",
      stack: Array.isArray(data.stack) ? data.stack.filter((s) => typeof s === "string") : [],
      repo: typeof data.repo === "string" ? data.repo : "",
      live: typeof data.live === "string" ? data.live : "",
      screenshots: Array.isArray(data.screenshots) ? data.screenshots.filter((s) => typeof s === "string") : [],
      featured: Boolean(data.featured),
      draft: Boolean(data.draft),
    },
    parsed,
  };

  return <ProjectEditor initial={initial} />;
}
