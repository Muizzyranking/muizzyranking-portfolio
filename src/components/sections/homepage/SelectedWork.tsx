"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import SectionHeader from "@/components/sections/homepage/SectionHeader";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import type { Project } from "@/types";

export default function SelectedWork({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <section ref={ref} className="section section-band">
      <div className="container-main">
        <SectionHeader
          eyebrow="Selected work"
          title="Projects as case studies."
          right={
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-mono text-[0.8rem] font-semibold tracking-[0.08em] text-accent uppercase"
            >
              All projects
              <span className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          }
        />

        {projects.length > 0 && (
          <m.div
            initial={{ opacity: 0, ...from }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 overflow-x-clip"
          >
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </m.div>
        )}
      </div>
    </section>
  );
}
