import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { domAnimation, LazyMotion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Muizzyranking — Backend Engineer",
    template: "%s | Muizzyranking",
  },
  description:
    "Backend engineer building systems that have to be correct. Python, Django, distributed systems, and a Neovim config that's never finished.",
  keywords: ["backend engineer", "Python", "Django", "FastAPI", "PostgreSQL", "Redis", "API development", "Lagos", "Nigeria", "software engineer"],
  authors: [{ name: "Muiz Oyebowale" }],
  creator: "Muiz Oyebowale",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muizzyranking.me",
    title: "Muizzyranking — Backend Engineer",
    description: "Backend engineer building systems that have to be correct.",
    siteName: "Muizzyranking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muizzyranking — Backend Engineer",
    description: "Backend engineer building systems that have to be correct.",
    creator: "@muizzyranking",
  },
  alternates: {
    canonical: "https://muizzyranking.me",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="antialiased">
        <LazyMotion features={domAnimation} strict>
          <Navbar />
          {children}
        </LazyMotion>
        <Footer />
        {/** biome-ignore lint/style/noNonNullAssertion: not null */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}
