import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post preview";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  const title = post?.title ?? "Writing";
  const dateLabel = post ? new Date(post.publishedAtIso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#080808",
        padding: "72px 96px",
        fontFamily: "sans-serif",
        color: "#f5f3ef",
        position: "relative",
      }}
    >
      {/* top eyebrow */}
      <div
        style={{
          fontSize: "22px",
          color: "#9a948a",
          letterSpacing: "4px",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <span style={{ color: "#9fbf6b" }}>~/blog</span>
        <span style={{ width: "60px", height: "1px", background: "#2f2f2f" }} />
        <span>muizzyranking.me</span>
      </div>

      {/* title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "82px",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          color: "#f5f3ef",
        }}
      >
        {title}
      </div>

      {/* bottom row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "24px",
          color: "#9a948a",
          letterSpacing: "1px",
        }}
      >
        <span style={{ color: "#c9c3b8" }}>Muiz Oyebowale</span>
        <span>{dateLabel}</span>
      </div>

      {/* accent corner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "8px",
          height: "100%",
          background: "linear-gradient(to bottom, #9fbf6b, transparent)",
        }}
      />
    </div>,
    { ...size },
  );
}
