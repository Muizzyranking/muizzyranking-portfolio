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
        background: "#faf8f4",
        padding: "72px 84px",
        color: "#1c1917",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "84px",
          right: "84px",
          width: "14px",
          height: "14px",
          borderRadius: "999px",
          background: "#55702f",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontFamily: "monospace",
          fontSize: "22px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#625c4a",
        }}
      >
        <span style={{ color: "#55702f" }}>writing</span>
        <span style={{ width: "48px", height: "1px", background: "#e3ded4" }} />
        <span>muizzyranking.me</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            fontSize: "64px",
            color: "#1c1917",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "monospace",
          fontSize: "20px",
          letterSpacing: "0.1em",
          color: "#625c4a",
        }}
      >
        <span>Muiz Oyebowale</span>
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "999px", background: "#55702f" }} />
          {dateLabel}
        </span>
      </div>
    </div>,
    { ...size },
  );
}
