import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import CustomCursor from "@/components/layout/CustomCursor";
import MusicProvider from "@/components/music/MusicProvider";
import { fontVariables } from "@/lib/font";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: ["backend engineer", "Python", "Django", "FastAPI", "PostgreSQL", "Redis", "API development", "distributed systems", "software engineer"],
  authors: [{ name: site.name }, { name: site.handle }],
  creator: site.name,
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
    url: site.url,
    title: `${site.name} · ${site.title}`,
    description: site.description,
    siteName: site.handle,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.title}`,
    description: site.description,
    creator: "@muizzyranking",
  },
  alternates: {
    types: {
      "application/rss+xml": `${site.url}/blog/rss.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <body className="antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground focus:font-semibold"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <MotionConfig reducedMotion="user">
            <LazyMotion features={domAnimation} strict>
              <CustomCursor />
              <MusicProvider>{children}</MusicProvider>
            </LazyMotion>
          </MotionConfig>
        </ThemeProvider>
        {/** biome-ignore lint/style/noNonNullAssertion: env var is set in the deployment environment */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}
