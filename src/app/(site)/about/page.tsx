import type { Metadata } from "next";
import AboutCTA from "@/components/sections/about/Cta";
import AboutHero from "@/components/sections/about/Hero";
import HumanSide from "@/components/sections/about/HumanSide";
import Stack from "@/components/sections/about/Stack";
import WhatIDo from "@/components/sections/about/WhatIDo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Backend engineer pivoting into AI/ML. I understand the problem before I build the solution. I build things that hold together. I watch too many superhero films.",
  alternates: { canonical: `${site.url}/about` },
  openGraph: {
    title: "About Muiz Oyebowale",
    description: "How I think, the problems I enjoy, the stack I reach for, and what I'm learning.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhatIDo />
      <Stack />
      <HumanSide />
      <AboutCTA />
    </>
  );
}
