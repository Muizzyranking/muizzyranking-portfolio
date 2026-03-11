import type { Metadata } from "next";
import AboutCraft from "@/components/sections/about/AboutCraft";
import AboutDirection from "@/components/sections/about/AboutDirection";
import AboutExperience from "@/components/sections/about/AboutExperience";
import AboutHuman from "@/components/sections/about/AboutHuman";
import AboutOpening from "@/components/sections/about/AboutOpening";
import AboutThinking from "@/components/sections/about/AboutThinking";
import Contact from "@/components/sections/Contact";
import { getAllExperience } from "@/lib/experience";

export const metadata: Metadata = {
  title: "About",
  description:
    "Backend engineer, systems thinker, Neovim user. This is who I am.",
};

export default function AboutPage() {
  const experiences = getAllExperience();
  return (
    <div
      style={{
        paddingBlockStart: "clamp(6rem, 14vw, 10rem)",
        paddingBlockEnd: "8rem",
      }}
    >
      <div className="container-main">
        <AboutOpening />
        <AboutThinking />
        <AboutCraft />
        <AboutExperience experiences={experiences} />
        <AboutDirection />
        <AboutHuman />
      </div>
      <Contact />
    </div>
  );
}
