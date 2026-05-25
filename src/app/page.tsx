import About from "@/components/sections/homepage/About";
import BlogTeaser from "@/components/sections/homepage/BlogTeaser";
import Contact from "@/components/sections/homepage/Contact";
import ExperienceSection from "@/components/sections/homepage/Experience";
import Hero from "@/components/sections/homepage/Hero";
import SelectedWork from "@/components/sections/homepage/SelectedWork";
import { getRecentPosts } from "@/lib/blog";
import { getAllExperience } from "@/lib/experience";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const projects = getFeaturedProjects().slice(0, 3);
  const experiences = getAllExperience();
  const posts = getRecentPosts(3);
  return (
    <>
      <Hero />
      <About />
      <SelectedWork projects={projects} />
      <ExperienceSection exp={experiences} />
      <BlogTeaser posts={posts} />
      <Contact />
    </>
  );
}
