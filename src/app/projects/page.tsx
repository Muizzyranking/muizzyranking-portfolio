import type { Metadata } from "next";
import ProjectsGrid from "@/components/ui/ProjectsGrid";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Muiz Oyebowale",
  description:
    "Things I've built. Backend systems, APIs, tools, and the occasional project that started because I was tired of doing something manually.",
};

export default async function ProjectsPage() {
  const projects = getAllProjects();

  const complete = projects.filter((p) => p.status === "complete").length;
  const inProgress = projects.filter((p) => p.status === "in-progress").length;

  return (
      <ProjectsGrid projects={projects} stats={{ total: projects.length, complete, inProgress }} />
  );
}
