import type { Metadata } from "next";
import ProjectsIndex from "@/components/sections/projects/ProjectsIndex";
import { getAllProjects, getProjectStackList } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Backend systems, APIs, and tools, each one written up as a case study.",
  alternates: { canonical: `${site.url}/projects` },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const stack = getProjectStackList();

  return <ProjectsIndex projects={projects} stack={stack} />;
}
