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
      {/* share line */}
      <div className="border-t border-border-subtle">
        <div className="container-main flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5">
          <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[0.7rem] lowercase text-text-muted">
            filed under
            {post.categories.length > 0 ? (
              post.categories.map((c) => (
                <Link key={c.slug} href={`/blog/category/${c.slug}`} className="text-accent transition-colors duration-150 hover:text-accent-bright">
                  {c.label}
                </Link>
              ))
            ) : (
              <span>nothing in particular</span>
            )}
          </p>
          <p className="flex items-center gap-5 font-mono text-[0.7rem] lowercase">
            <a href={shareX} target="_blank" rel="noopener noreferrer" className="text-text-muted transition-colors duration-150 hover:text-accent">
              share on x ↗
            </a>
            <a
              href={shareLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-colors duration-150 hover:text-accent"
            >
              linkedin ↗
            </a>
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section-band">
          <div className="container-main">
            <div className="mb-10 flex items-baseline justify-between gap-6">
              <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.14] tracking-[-0.01em] text-text-primary">
                Related writings.
              </h2>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 font-mono text-[0.74rem] lowercase text-text-muted transition-colors duration-150 hover:text-accent"
              >
                all writings
                <span className="transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
            <div className="border-t border-border-subtle">
              {related.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group grid items-baseline gap-x-8 gap-y-1 border-b border-border-subtle py-5 md:grid-cols-[minmax(0,1fr)_auto]"
                >
                  <span className="flex min-w-0 items-baseline gap-4">
                    <span className="font-mono text-[0.68rem] text-accent" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="truncate font-display text-[clamp(1.02rem,1.8vw,1.15rem)] leading-[1.35] font-semibold tracking-[-0.015em] text-text-primary transition-colors duration-200 group-hover:text-accent">
                      {p.title}
                    </h3>
                  </span>
                  <span className="font-mono text-[0.68rem] text-text-muted whitespace-nowrap">
                    {new Date(p.publishedAtIso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <nav className="border-t border-border-subtle" aria-label="Post navigation">
        <div className="container-main grid gap-8 py-12 sm:grid-cols-2">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="group min-w-0">
              <span className="mb-2 block font-mono text-[0.68rem] lowercase text-text-muted transition-colors duration-150 group-hover:text-accent">
                ← older
              </span>
              <span className="block font-display text-[1.05rem] font-semibold leading-[1.3] text-text-primary transition-colors duration-200 group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}

          {next ? (
            <Link href={`/blog/${next.slug}`} className="group min-w-0 sm:text-right">
              <span className="mb-2 block font-mono text-[0.68rem] lowercase text-text-muted transition-colors duration-150 group-hover:text-accent">
                newer →
              </span>
              <span className="block font-display text-[1.05rem] font-semibold leading-[1.3] text-text-primary transition-colors duration-200 group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </div>
      </nav>
    </>
  );
}
