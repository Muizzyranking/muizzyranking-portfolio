import type { Metadata } from "next";
import PageHead from "@/components/layout/PageHead";
import { Contributions, OtherProjects } from "@/components/sections/projects/FlatLists";
import ProjectsIndex from "@/components/sections/projects/ProjectsIndex";
import DocSection from "@/components/ui/DocSection";
import { getAllProjects, getContributions, getOtherProjects, getProjectStackList } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Systems, APIs, and tools, each one written up as a case study.",
  alternates: { canonical: `${site.url}/projects` },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const stack = getProjectStackList();
  const other = getOtherProjects();
  const contributions = getContributions();

  return (
    <>
      <PageHead
        crumb="projects"
        meta={`${projects.length} case studies`}
        title="Projects."
        description="Systems, APIs, and tools. Each substantial one written up as a case study."
      />
      <DocSection>
        <ProjectsIndex projects={projects} stack={stack} />
      </DocSection>
      <DocSection title="Other projects.">
        <p className="mb-8 max-w-[60ch] text-[0.95rem] leading-[1.65] text-text-secondary">
          Smaller builds and shapes that didn&rsquo;t get a full write-up — but shipped, and taught me something.
        </p>
        <OtherProjects items={other} />
      </DocSection>
      <DocSection title="Contributions.">
        <p className="mb-8 max-w-[60ch] text-[0.95rem] leading-[1.65] text-text-secondary">
          Projects I use and give back to — in code, issues, and docs.
        </p>
        <Contributions items={contributions} />
      </DocSection>
    </>
  );
}
