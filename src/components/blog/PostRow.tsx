import Link from "next/link";
import type { PostMeta } from "@/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Ledger row for a post — numbered, mono metadata, quiet summary. */
export default function PostRow({ post, n }: { post: PostMeta; n?: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block border-b border-border-subtle py-7">
      <div className="grid items-baseline gap-x-10 gap-y-2 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[0.7rem] text-text-muted">
            {n !== undefined && <span className="font-medium text-accent">{String(n).padStart(2, "0")}</span>}
            <time dateTime={post.publishedAtIso}>{formatDate(post.publishedAtIso)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime.text}</span>
          </div>

          <h3 className="mt-2.5 font-display text-[clamp(1.35rem,2.4vw,1.7rem)] leading-[1.25] tracking-[-0.02em] font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">
            {post.title}
          </h3>

          {post.summary && <p className="mt-2 max-w-[64ch] text-[0.98rem] leading-[1.65] text-text-secondary line-clamp-2">{post.summary}</p>}
        </div>

        <span
          className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-text-muted transition-colors duration-200 group-hover:text-accent max-md:hidden"
          aria-hidden="true"
        >
          read
          <span className="transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
