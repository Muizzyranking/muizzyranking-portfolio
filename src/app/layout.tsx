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
    default: "Muiz Oyebowale (Muizzyranking) — Backend Engineer",
    template: "%s | Muiz Oyebowale",
  },
  description:
    "I'm Muiz Oyebowale — a backend engineer focused on Python, Django, and distributed systems. I build things that have to work: APIs, queues, databases, and the plumbing no one sees but everyone depends on.",
  keywords: [
    "backend engineer",
    "Python",
    "Django",
    "FastAPI",
    "PostgreSQL",
    "Redis",
    "API development",
    "Lagos",
    "Nigeria",
    "software engineer",
  ],
  authors: [{ name: "Muiz Oyebowale" }, { name: "Muizzyranking" }],
  creator: "Muiz Oyebowale",
  icons: {
    icon: "/icon",
  },
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
    title: "Muiz Oyebowale (Muizzyranking) — Backend Engineer",
    description: "Backend engineer building reliable APIs and distributed systems with Python and Django",
    siteName: "Muizzyranking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muiz Oyebowale (Muizzyranking) — Backend Engineer",
    description: "Backend engineer building reliable APIs and distributed systems with Python and Django.",
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
