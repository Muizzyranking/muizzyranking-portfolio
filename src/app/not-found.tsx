import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-main flex min-h-[100svh] flex-col items-center justify-center pb-20 pt-24 text-center">
      <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-text-muted mb-[clamp(2rem,5vw,3rem)]">404</p>

      <h1 className="font-display font-bold tracking-[-0.03em] leading-[1.05] text-text-primary text-[clamp(2.4rem,6vw,4.5rem)] mb-6">
        This page doesn&apos;t exist.
      </h1>

      <p className="text-text-secondary text-[clamp(1rem,1.8vw,1.2rem)] leading-[1.7] max-w-[44ch] mb-10">
        It never did, or it moved. Either way, the good stuff is still here.
      </p>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-[0.95rem] font-semibold text-accent-foreground transition-colors duration-150 hover:bg-accent-dim"
        >
          go home
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-6 py-3 text-[0.95rem] font-semibold text-text-primary transition-colors duration-150 hover:border-accent-dim"
        >
          see projects
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
