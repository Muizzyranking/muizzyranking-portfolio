import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";
import Navbar from "@/components/layout/Navbar";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";

/** Chrome for all regular pages. The /links page lives outside this group so
 *  it renders without navbar/footer (it's a standalone share page). Motion
 *  providers come from the root layout. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd />
      <Navbar
        projects={getAllProjects().map((p) => ({ slug: p.slug, title: p.title }))}
        posts={getAllPosts().map((p) => ({ slug: p.slug, title: p.title }))}
      />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
