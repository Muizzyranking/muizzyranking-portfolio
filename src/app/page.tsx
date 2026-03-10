import { Suspense } from "react";
import ConsoleEasterEgg from "@/components/layout/ConsoleEastherEgg";
import BlogTeaser from "@/components/sections/BlogTeaser";
import Contact from "@/components/sections/Contact";
import Exp from "@/components/sections/Experience";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Exp />
      <Skills />
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
        <BlogTeaser />
      </Suspense>
      <Contact />
      <ConsoleEasterEgg />
    </>
  );
}
