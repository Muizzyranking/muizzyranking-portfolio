import fs from "node:fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import BlogEditor, { type BlogEditorInitial } from "@/components/editor/BlogEditor";
import { listAllPostsForEditor } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const entry = listAllPostsForEditor().find((p) => p.meta.slug === slug);
  if (!entry) notFound();

  const raw = fs.readFileSync(entry.meta.filepath, "utf8");
  const { data, content } = matter(raw);

  const injectMap = (data.inject && typeof data.inject === "object" ? data.inject : {}) as Record<string, unknown>;
  const injectEntries = Object.entries(injectMap).map(([key, value]) => ({ key, value: String(value) }));

  const categoriesRaw = Array.isArray(data.categories) ? data.categories.filter((c) => typeof c === "string") : [];

  const initial: BlogEditorInitial = {
    mode: "edit",
    slug,
    year: entry.meta.year,
    month: entry.meta.month,
    frontmatter: {
      title: typeof data.title === "string" ? data.title : "",
      summary: typeof data.summary === "string" ? data.summary : "",
      day: typeof data.day === "number" ? data.day : entry.meta.day,
      time: typeof data.time === "string" ? data.time : "08:00",
      categories: categoriesRaw,
      draft: Boolean(data.draft),
      slug: typeof data.slug === "string" ? data.slug : slug,
      inject: injectEntries,
    },
    body: content,
  };

  return <BlogEditor initial={initial} />;
}
