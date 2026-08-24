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
      className="group relative grid gap-2 py-6 border-b border-border-subtle md:grid-cols-[minmax(0,1fr)_auto] md:gap-8 items-baseline transition-colors duration-150"
    >
      <div className="min-w-0">
        <h3 className="font-display font-semibold tracking-[-0.01em] leading-[1.3] text-text-primary text-[clamp(1.2rem,2vw,1.45rem)] transition-colors duration-150 group-hover:text-accent">
          {post.title}
        </h3>
        {post.summary && <p className="text-text-secondary text-[0.95rem] leading-[1.65] mt-2 max-w-[64ch] line-clamp-2">{post.summary}</p>}
        {post.categories.length > 0 && (
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {post.categories.slice(0, 3).map((c) => (
              <span key={c.slug} className="chip">
                {c.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.08em] text-text-muted md:pt-1.5 whitespace-nowrap max-md:hidden">
        <span>{formatDate(post.publishedAtIso)}</span>
        <span aria-hidden="true" className="transition-transform duration-150 ease-out group-hover:translate-x-1 group-hover:text-accent">
          →
        </span>
      </div>
      <span className="font-mono text-[0.7rem] tracking-[0.08em] text-text-muted md:hidden">{formatDate(post.publishedAtIso)}</span>
    </Link>
  );
}
