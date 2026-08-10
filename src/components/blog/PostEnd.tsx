import Link from "next/link";
import { site } from "@/lib/site";
import type { PostMeta } from "@/types";

export default function PostEnd({
  post,
  related,
  prev,
  next,
}: {
  post: PostMeta;
  related: PostMeta[];
  prev: PostMeta | null;
  next: PostMeta | null;
}) {
  const url = `${site.url}/blog/${post.slug}`;
  const encodedTitle = encodeURIComponent(post.title);
  const shareX = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodedTitle}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <>
      <div className="container-main flex items-center justify-between gap-4 flex-wrap py-6 border-t border-border-subtle">
        <div className="flex gap-1.5 flex-wrap">
          {post.categories.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/category/${c.slug}`}
              className="font-mono text-[0.66rem] text-text-muted border border-border-subtle rounded-sm px-2 py-[0.2rem] transition-colors duration-150 hover:text-text-primary hover:border-accent-dim"
            >
              {c.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.08em]">
          <a
            href={shareX}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted uppercase transition-colors duration-150 hover:text-accent"
          >
            share on X ↗
          </a>
          <a
            href={shareLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted uppercase transition-colors duration-150 hover:text-accent"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section-band border-t border-border-subtle">
          <div className="container-main">
            <div className="flex items-baseline justify-between gap-4 mb-8">
              <h2 className="font-display font-semibold tracking-[-0.015em] leading-[1.15] text-text-primary text-[clamp(1.4rem,2.6vw,1.9rem)]">
                Related reading
              </h2>
              <Link href="/blog" className="group inline-flex items-center gap-2 font-mono text-[0.75rem] tracking-[0.08em] text-accent uppercase">
                All writing
                <span className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
            <div className="border-t border-border-subtle">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group grid gap-2 py-6 border-b border-border-subtle md:grid-cols-[1fr_auto] md:gap-8 items-baseline transition-colors duration-150"
                >
                  <h3 className="font-display font-semibold tracking-[-0.01em] leading-[1.3] text-text-primary text-[1.0625rem] transition-colors duration-150 group-hover:text-accent">
                    {p.title}
                  </h3>
                  <span className="font-mono text-[0.68rem] tracking-[0.08em] text-text-muted md:text-right">
                    {new Date(p.publishedAtIso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <nav className="container-main py-[clamp(2.5rem,5vw,4rem)] border-t border-border-subtle" aria-label="Post navigation">
        <div className="flex items-stretch justify-between gap-6 flex-wrap">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex-1 min-w-[16rem] rounded-lg border border-border p-6 transition-colors duration-150 hover:border-accent-dim"
            >
              <span className="block font-mono text-[0.65rem] uppercase tracking-[0.1em] text-text-muted mb-3">← older</span>
              <span className="block font-display font-semibold text-[1.05rem] text-text-primary leading-[1.3] group-hover:text-accent transition-colors duration-150">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span className="flex-1 min-w-[16rem] hidden md:block" />
          )}

          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex-1 min-w-[16rem] rounded-lg border border-border p-6 text-right transition-colors duration-150 hover:border-accent-dim"
            >
              <span className="block font-mono text-[0.65rem] uppercase tracking-[0.1em] text-text-muted mb-3">newer →</span>
              <span className="block font-display font-semibold text-[1.05rem] text-text-primary leading-[1.3] group-hover:text-accent transition-colors duration-150">
                {next.title}
              </span>
            </Link>
          ) : (
            <span className="flex-1 min-w-[16rem] hidden md:block" />
          )}
        </div>
      </nav>
    </>
  );
}
