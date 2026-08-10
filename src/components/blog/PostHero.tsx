import Link from "next/link";
import type { PostMeta } from "@/types";

export default function PostHero({ post }: { post: PostMeta }) {
  const words = post.readingTime.words.toLocaleString("en-US");

  return (
    <header className="container-main pt-[clamp(5rem,10vw,8rem)] pb-[clamp(2.5rem,5vw,4rem)] border-b border-border-subtle">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.08em] text-text-muted uppercase mb-8 hover:text-text-primary"
      >
        <span className="transition-transform duration-150 ease-out group-hover:-translate-x-1" aria-hidden="true">
          ←
        </span>
        all writing
      </Link>

      {post.categories.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mb-5">
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
      )}

      <h1 className="font-display font-bold tracking-[-0.02em] leading-[1.06] text-[clamp(2.1rem,5vw,3.5rem)] text-text-primary mb-5 max-w-[24ch]">
        {post.title}
      </h1>

      {post.summary && <p className="text-text-secondary text-[clamp(1rem,1.8vw,1.15rem)] leading-[1.65] max-w-[62ch] mb-6">{post.summary}</p>}

      <p className="font-mono text-[0.72rem] tracking-[0.06em] text-text-muted">
        {post.publishedAt}
        <span className="mx-2 opacity-40" aria-hidden="true">
          ·
        </span>
        {post.readingTime.text}
        <span className="mx-2 opacity-40" aria-hidden="true">
          ·
        </span>
        {words} words
      </p>
    </header>
  );
}
