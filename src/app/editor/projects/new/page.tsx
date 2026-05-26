import ProjectEditor, { type ProjectEditorInitial } from "@/components/editor/ProjectEditor";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  const initial: ProjectEditorInitial = {
    mode: "new",
    slug: "",
    frontmatter: {
      title: "",
      summary: "",
      status: "complete",
      year: String(new Date().getFullYear()),
      stack: [],
      repo: "",
      live: "",
      featured: false,
      draft: true,
    },
    parsed: {
      overview: "",
      challenges: [],
      learned: "",
    },
  };
  return <ProjectEditor initial={initial} />;
}
