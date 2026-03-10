export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muiz Oyebowale",
    alternateName: "Muizzyranking",
    url: "https://muizzyranking.dev",
    jobTitle: "Backend Engineer",
    description:
      "Backend engineer building systems that have to be correct. Python, Django, distributed systems.",
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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    sameAs: [
      "https://github.com/Muizzyranking",
      "https://linkedin.com/in/muizzyranking",
      "https://x.com/muizzyranking",
      "https://muizzyranking.hashnode.dev",
    ],
  };

  return (
    <script
      type="application/ld+json"
    // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data, content is static and self-generated
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
