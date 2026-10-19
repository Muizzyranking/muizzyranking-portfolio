import type { Metadata } from "next";
import AboutBlurb from "@/components/sections/homepage/AboutBlurb";
import BlogTeaser from "@/components/sections/homepage/BlogTeaser";
import Contact from "@/components/sections/homepage/Contact";
import ExperienceSection from "@/components/sections/homepage/Experience";
import Hero from "@/components/sections/homepage/Hero";
import SelectedWork from "@/components/sections/homepage/SelectedWork";
import Stack from "@/components/sections/homepage/Stack";
import { getRecentPosts } from "@/lib/blog";
import { getAllExperience } from "@/lib/experience";
import { getFeaturedProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: site.url },
};

export default function Home() {
  const projects = getFeaturedProjects().slice(0, 4);
  const experiences = getAllExperience();
  const posts = getRecentPosts(3);
  return (
    <>
      <Hero />
      <SelectedWork projects={projects} />
      <Stack />
      <ExperienceSection exp={experiences} />
      <BlogTeaser posts={posts} />
      <AboutBlurb />
      <Contact />
    </>
  );
}
