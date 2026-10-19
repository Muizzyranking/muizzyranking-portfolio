import Link from "next/link";
import type { PostMeta } from "@/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PostRow({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-2 py-6 border-b border-border-subtle md:grid-cols-[1fr_auto] md:gap-8 items-baseline transition-colors duration-150"
    >
      <div>
        <h3 className="font-display font-semibold tracking-[-0.01em] leading-[1.3] text-text-primary text-[1.35rem] transition-colors duration-150 group-hover:text-accent">
          {post.title}
        </h3>
        {post.summary && <p className="text-text-secondary text-[1rem] leading-[1.65] mt-2 max-w-[64ch] line-clamp-2">{post.summary}</p>}
        {post.categories.length > 0 && (
          <div className="flex gap-1.5 mt-2.5 flex-wrap">
            {post.categories.slice(0, 3).map((c) => (
              <span key={c.slug} className="font-mono text-[0.68rem] text-text-muted border border-border-subtle rounded-sm px-2 py-[0.2rem]">
                {c.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-start md:items-end gap-1 font-mono text-[0.72rem] tracking-[0.08em] text-text-muted md:pt-1">
        <span>{formatDate(post.publishedAtIso)}</span>
        <span>{post.readingTime.text}</span>
      </div>
    </Link>
  );
}
