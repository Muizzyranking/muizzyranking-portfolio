import { site } from "@/lib/site";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.handle,
    url: site.url,
    jobTitle: site.title,
    description: site.description,
    image: `${site.url}/opengraph-image`,
    email: `mailto:${site.email}`,
    knowsAbout: [
      "Backend Engineering",
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Docker",
      "API Development",
      "Distributed Systems",
    ],
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data, content is static and self-generated
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
