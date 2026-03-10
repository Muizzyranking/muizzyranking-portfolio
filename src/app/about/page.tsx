import type { Metadata } from "next";
import AboutMe from "@/components/sections/AboutMe";
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
    <>
      <AboutMe experiences={experiences} />
      ;)
      <Contact />
    </>
  );
}
