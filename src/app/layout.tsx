import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Muizzyranking — Backend Engineer",
    template: "%s | Muizzyranking",
  },
  description:
    "Backend engineer building systems that have to be correct. Python, Django, distributed systems, and a Neovim config that's never finished.",
  keywords: ["backend engineer", "Python", "Django", "API", "systems programming"],
  authors: [{ name: "Muiz Oyebowale" }],
  creator: "Muiz Oyebowale",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muizzyranking.dev",
    title: "Muizzyranking — Backend Engineer",
    description:
      "Backend engineer building systems that have to be correct.",
    siteName: "Muizzyranking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muizzyranking — Backend Engineer",
    description: "Backend engineer building systems that have to be correct.",
    creator: "@muizzyranking",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
