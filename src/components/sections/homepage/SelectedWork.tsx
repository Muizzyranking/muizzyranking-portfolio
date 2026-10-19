"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import DocSection, { DocLink } from "@/components/ui/DocSection";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import type { Project } from "@/types";

export default function SelectedWork({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 14 };

  return (
    <DocSection title="Things I've built." action={<DocLink href="/projects">all projects</DocLink>}>
      {projects.length > 0 && (
        <div ref={ref} className="grid gap-5 overflow-x-clip sm:grid-cols-2">
          {projects.map((project, i) => (
            <m.div
              key={project.slug}
              initial={{ opacity: 0, ...from }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.06 * i }}
              className="min-w-0"
            >
              <ProjectCard project={project} n={i + 1} />
            </m.div>
          ))}
        </div>
      )}
    </DocSection>
  );
}
