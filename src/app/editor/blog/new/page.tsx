import BlogEditor, { type BlogEditorInitial } from "@/components/editor/BlogEditor";

export const dynamic = "force-dynamic";

export default function NewBlogPostPage() {
  const now = new Date();
  const initial: BlogEditorInitial = {
    mode: "new",
    slug: "",
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    frontmatter: {
      title: "",
      summary: "",
      day: now.getDate(),
      time: "08:00",
      categories: [],
      draft: true,
      slug: "",
      inject: [],
    },
    body: "",
  };
  return <BlogEditor initial={initial} />;
}
