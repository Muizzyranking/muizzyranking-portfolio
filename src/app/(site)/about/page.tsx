import type { Metadata } from "next";
import AboutCTA from "@/components/sections/about/Cta";
import AboutHero from "@/components/sections/about/Hero";
import HowIWork from "@/components/sections/about/HowIWork";
import HumanSide from "@/components/sections/about/HumanSide";
import WhatIDo from "@/components/sections/about/WhatIDo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer. I understand the problem before I build the solution. I build things that hold together. I watch too many superhero films.",
  alternates: { canonical: `${site.url}/about` },
  openGraph: {
    title: "About Muiz Oyebowale",
    description: "How I work, the problems I enjoy, the stack I reach for, and what I'm learning.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhatIDo />
      <HowIWork />
      <HumanSide />
      <AboutCTA />
    </>
  );
}
