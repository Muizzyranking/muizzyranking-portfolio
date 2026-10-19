import Link from "next/link";
import type { PostMeta } from "@/types";

export default function PostHero({ post }: { post: PostMeta }) {
  const words = post.readingTime.words.toLocaleString("en-US");

  return (
    <header className="container-main pt-[clamp(7rem,13vw,10rem)] pb-[clamp(2.5rem,5vw,4rem)]">
      <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border-subtle pb-5">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 font-mono text-[0.74rem] lowercase text-text-muted transition-colors duration-150 hover:text-accent"
        >
          <span className="transition-transform duration-200 ease-out group-hover:-translate-x-1" aria-hidden="true">
            ←
          </span>
          all writing
        </Link>

        {post.categories.length > 0 && (
          <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[0.7rem] text-text-muted">
            {post.categories.map((c) => (
              <Link key={c.slug} href={`/blog/category/${c.slug}`} className="lowercase transition-colors duration-150 hover:text-accent">
                {c.label}
              </Link>
            ))}
          </p>
        )}
      </div>

      <h1 className="mb-6 max-w-[26ch] font-display text-[clamp(2.1rem,5vw,3.7rem)] leading-[1.05] tracking-[-0.03em] text-text-primary">
        {post.title}
      </h1>

      {post.summary && <p className="mb-7 max-w-[62ch] text-[1.02rem] leading-[1.7] text-text-secondary">{post.summary}</p>}

      <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.72rem] lowercase text-text-muted">
        <time dateTime={post.publishedAtIso}>{post.publishedAt}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime.text}</span>
        <span aria-hidden="true">·</span>
        <span>{words} words</span>
      </p>
    </header>
  );
}
