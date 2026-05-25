import type { Metadata } from "next";
import AboutCTA from "@/components/sections/about/Cta";
import AboutHero from "@/components/sections/about/Hero";
import HumanSide from "@/components/sections/about/HumanSide";
import Journey from "@/components/sections/about/Journey";
import Origin from "@/components/sections/about/Origin";
import Philosophy from "@/components/sections/about/Philosophy";
import Roadmap from "@/components/sections/about/Roadmap";
import { getJourney } from "@/lib/journey";

export const metadata: Metadata = {
  title: "About — Muiz Oyebowale",
  description:
    "Backend engineer pivoting into AI/ML. I ask why until it makes sense. I build things that hold together. I watch too many superhero films.",
  openGraph: {
    title: "About Muiz Oyebowale",
    description: "The full picture — origin, philosophy, journey, and what I'm building toward.",
  },
};

export default function AboutPage() {
  const milestones = getJourney();
  return (
    <>
      <AboutHero />
      <Origin />
      <Philosophy />
      <Journey milestones={milestones} />
      <Roadmap />
      <HumanSide />
      <AboutCTA />
    </>
  );
}
