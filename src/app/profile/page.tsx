import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LINK_ICONS, LINKS } from "@/lib/links";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Profile Card",
  description: "Find me everywhere else — GitHub, LinkedIn, résumé and more, all in one place.",
  alternates: { canonical: `${site.url}/links` },
  openGraph: {
    title: "Muiz Oyebowale · Links",
    description: "Find me everywhere else — GitHub, LinkedIn, résumé and more.",
    url: `${site.url}/links`,
  },
};

export default function ProfileCard() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-14">
      {/* warm ember glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.12] dark:opacity-[0.16]"
        style={{ background: "radial-gradient(closest-side, var(--color-accent-bright), transparent)", filter: "blur(44px)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/2 h-[26rem] w-[34rem] -translate-x-1/2 rounded-full opacity-[0.09] dark:opacity-[0.13]"
        style={{ background: "radial-gradient(closest-side, var(--color-accent-bright), transparent)", filter: "blur(48px)" }}
      />

      <div className="relative w-full max-w-sm">
        {/* profile card */}
        <div className="flex flex-col items-center text-center">
          <div className="portrait-frame relative mb-5">
            <div aria-hidden="true" className="absolute inset-0 translate-x-1 translate-y-1 rounded-[var(--radius-xl)] border-2 border-accent/50" />
            <div className="relative size-24 overflow-hidden rounded-[var(--radius-xl)] border border-border bg-bg-elevated">
              <Image src="/muizzy.jpg" alt="Muiz Oyebowale" fill sizes="96px" className="object-cover" priority />
              <div className="portrait-grain" aria-hidden="true" />
            </div>
          </div>

          <h1 className="font-display text-[1.65rem] leading-tight font-extrabold tracking-[-0.02em] text-text-primary">
            Muiz <em className="italic text-accent">Oyebowale</em>
          </h1>

          <p className="mt-2 max-w-[30ch] text-[0.9rem] leading-relaxed text-text-secondary">
            Backend-heavy fullstack engineer. I build the part of the software nobody sees.
          </p>

          <Link
            href="/"
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.68rem] font-semibold tracking-[0.1em] text-text-muted lowercase transition-colors duration-150 hover:text-accent"
          >
            muizzyranking.me
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* links */}
        <nav aria-label="My links" className="mt-8 flex flex-col gap-3">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group card flex items-center gap-4 p-4 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[var(--shadow-lifted)]"
            >
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-white"
                style={{ background: link.tone }}
              >
                {LINK_ICONS[link.icon]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.95rem] font-semibold text-text-primary transition-colors duration-150 group-hover:text-accent">
                  {link.label}
                </span>
                {link.note && <span className="block truncate text-[0.78rem] text-text-muted">{link.note}</span>}
              </span>
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-all duration-200 ease-out group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"
              >
                →
              </span>
            </a>
          ))}
        </nav>

        <p className="mt-8 text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-text-muted/70">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </main>
  );
}
