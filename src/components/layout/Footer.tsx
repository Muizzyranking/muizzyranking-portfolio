import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="container-main flex flex-col gap-3 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.72rem] text-text-muted">
          © {new Date().getFullYear()} {site.name} — designed &amp; built by hand
        </p>
        <nav className="flex items-center gap-5" aria-label="Social links">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.72rem] lowercase text-text-muted transition-colors duration-150 hover:text-text-primary"
            >
              {social.label.toLowerCase()}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-[0.72rem] lowercase text-text-muted transition-colors duration-150 hover:text-text-primary"
          >
            email
          </a>
        </nav>
      </div>
    </footer>
  );
}
