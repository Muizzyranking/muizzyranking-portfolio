import type { Metadata } from "next";
import AboutCta from "@/components/sections/homepage/AboutCta";
import BlogTeaser from "@/components/sections/homepage/BlogTeaser";
import Contact from "@/components/sections/homepage/Contact";
import ExperienceSection from "@/components/sections/homepage/Experience";
import Hero from "@/components/sections/homepage/Hero";
import SelectedWork from "@/components/sections/homepage/SelectedWork";
import StackMini from "@/components/sections/homepage/StackMini";
import { getRecentPosts } from "@/lib/blog";
import { getAllExperience } from "@/lib/experience";
import { getFeaturedProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: site.url },
};

export default function Home() {
  const projects = getFeaturedProjects().slice(0, 3);
  const experiences = getAllExperience();
  const posts = getRecentPosts(3);
  return (
    <>
      <Hero />
      <AboutCta />
      <SelectedWork projects={projects} />
      <ExperienceSection exp={experiences} />
      <StackMini />
      <BlogTeaser posts={posts} />
      <Contact />
    </>
  );
}
