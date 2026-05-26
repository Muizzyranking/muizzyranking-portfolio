import EditorShell from "@/components/editor/EditorShell";
import { listAllPostsForEditor } from "@/lib/blog";
import { listAllProjectsForEditor } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default function EditorHome() {
  const posts = listAllPostsForEditor().map((p) => ({
    slug: p.meta.slug,
    title: p.meta.title,
    year: p.meta.year,
    month: p.meta.month,
    day: p.meta.day,
    publishedAt: p.meta.publishedAt,
    draft: p.draft,
  }));
  const projects = listAllProjectsForEditor().map((p) => ({
    slug: p.slug,
    title: p.title,
    year: p.year,
    status: p.status,
    featured: p.featured,
    draft: p.draft,
  }));

  return <EditorShell posts={posts} projects={projects} />;
}
