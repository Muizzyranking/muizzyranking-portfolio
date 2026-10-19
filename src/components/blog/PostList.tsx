import type { PostMeta } from "@/types";
import PostRow from "./PostRow";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="py-16 text-center font-mono text-[0.8rem] text-text-muted">No posts in this category yet.</p>;
  }

  return (
    <div className="border-t border-border-subtle">
      {posts.map((post) => (
        <PostRow key={post.slug} post={post} />
      ))}
    </div>
  );
}
