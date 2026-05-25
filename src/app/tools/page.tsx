import type { Metadata } from "next";
import DailyDriver from "@/components/sections/tools/DailyDriver";
import Exploring from "@/components/sections/tools/Exploring";
import ToolsHero from "@/components/sections/tools/Hero";
import Stack from "@/components/sections/tools/Stack";

export const metadata: Metadata = {
  title: "Tools — Muiz Oyebowale",
  description:
    "The languages, frameworks, and tools I actually use. Not a buzzword list — what I'd install on a fresh machine within the first hour.",
};

export default function ToolsPage() {
  return (
    <>
      <ToolsHero />
      <Stack />
      <DailyDriver />
      <Exploring />
    </>
  );
}
