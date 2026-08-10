import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="container-main flex flex-col items-center gap-3 py-8 md:flex-row md:justify-between">
        <p className="text-[0.85rem] text-text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex items-center gap-4 font-mono text-[0.78rem] text-text-muted">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-text-primary"
            >
              {social.label.toLowerCase()}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="transition-colors duration-150 hover:text-text-primary">
            email
          </a>
        </div>
      </div>
    </footer>
  );
}
