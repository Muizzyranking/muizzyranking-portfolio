import { Suspense } from "react";
import About from "@/components/sections/homepage/About";
import BlogTeaser from "@/components/sections/homepage/BlogTeaser";
import Contact from "@/components/sections/homepage/Contact";
import ExperienceSection from "@/components/sections/homepage/Experience";
import FeaturedProjects from "@/components/sections/homepage/FeaturedProjects";
import Hero from "@/components/sections/homepage/Hero";
import Skills from "@/components/sections/homepage/Skills";
import { getAllExperience } from "@/lib/experience";
import { getPosts } from "@/lib/hashnode";
import { getFeaturedProjects } from "@/lib/projects";

export default async function Home() {
  const projects = getFeaturedProjects().slice(0, 3);
  const experiences = getAllExperience();
  const posts = await getPosts(3);
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects projects={projects} />
      <ExperienceSection experiences={experiences} />
      <Suspense
        fallback={
          <section className="section">
            <div className="container-main">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                }}
              >
                Loading posts...
              </p>
            </div>
          </section>
        }
      >
        <BlogTeaser posts ={posts}/>
      </Suspense>
      <Contact />
    </>
  );
}
