import Link from "next/link";
import type { PostMeta } from "@/types";

export default function PostHero({ post }: { post: PostMeta }) {
  const words = post.readingTime.words.toLocaleString("en-US");

  return (
    <header className="container-main pt-[clamp(5rem,10vw,8rem)] pb-[clamp(2.5rem,5vw,4rem)]">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 font-mono text-[0.75rem] font-semibold tracking-[0.08em] text-text-muted uppercase mb-9 transition-colors duration-150 hover:text-accent"
      >
        <span className="transition-transform duration-150 ease-out group-hover:-translate-x-1" aria-hidden="true">
          ←
        </span>
        all writing
      </Link>

      {post.categories.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          {post.categories.map((c) => (
            <Link key={c.slug} href={`/blog/category/${c.slug}`} className="chip">
              {c.label}
            </Link>
          ))}
        </div>
      )}

      <h1 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.03em] font-extrabold text-text-primary mb-6 max-w-[26ch]">
        {post.title}
      </h1>

      {post.summary && <p className="text-text-secondary text-[clamp(1rem,1.8vw,1.2rem)] leading-[1.65] max-w-[62ch] mb-7">{post.summary}</p>}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.72rem] tracking-[0.08em] text-text-muted uppercase">
        <span>{post.publishedAt}</span>
        <span aria-hidden="true" className="size-1 rounded-full bg-border">
          {" "}
        </span>
        <span>{post.readingTime.text}</span>
        <span aria-hidden="true" className="size-1 rounded-full bg-border">
          {" "}
        </span>
        <span>{words} words</span>
      </div>
    </header>
  );
}
