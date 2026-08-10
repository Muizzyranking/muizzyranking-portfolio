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
      screenshots: [],
      featured: false,
      draft: true,
    },
    parsed: {
      overview: "",
      challenges: [],
      outcomes: "",
      learned: "",
    },
  };
  return <ProjectEditor initial={initial} />;
}
