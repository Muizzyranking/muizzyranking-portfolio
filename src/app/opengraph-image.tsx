import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muiz Oyebowale — Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0e0e0e",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.18,
          }}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#1f1f1f"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,124,89,0.12) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "monospace",
            fontSize: "15px",
            letterSpacing: "0.15em",
          }}
        >
          <span style={{ color: "#4a7c59", opacity: 0.8 }}>~/</span>
          <span style={{ color: "#7a7470" }}>muizzyranking.dev</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "13px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#4a7c59",
                opacity: 0.7,
              }}
            >
              [ 01 ]
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "13px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#7a7470",
              }}
            >
              Backend Engineer
            </span>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#2a2a2a",
              }}
            />
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: "0.92",
              letterSpacing: "-0.04em",
              fontWeight: 700,
            }}
          >
            <span
              style={{
                fontSize: "108px",
                color: "#4a7c59",
                fontFamily: "serif",
              }}
            >
              Muiz
            </span>
            <span
              style={{
                fontSize: "108px",
                color: "#f0ece4",
                fontFamily: "serif",
                fontStyle: "italic",
              }}
            >
              Oyebowale
            </span>
          </div>

          <div
            style={{
              display: "flex", // FIXED: Added explicit display: flex
              marginTop: "24px",
              fontFamily: "monospace",
              fontSize: "18px",
              color: "#b8b0a4",
              letterSpacing: "0.02em",
            }}
          >
            <span>I build the systems that hold everything together —</span>
            <span style={{ color: "#7a7470" }}> now teaching them to think.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {["Python", "FastAPI", "Django", "Redis", "Docker", "→ AI/ML"].map(
            (tag, i) => (
              <div
                key={tag}
                style={{
                  fontFamily: "monospace",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  color: i === 5 ? "#4a7c59" : "#7a7470",
                  border: `1px ${i === 5 ? "solid" : "solid"} ${
                    i === 5 ? "#2d5238" : "#2a2a2a"
                  }`,
                  borderRadius: "4px",
                  padding: "5px 12px",
                  background: i === 5 ? "#0e1a12" : "transparent",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        <div
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            bottom: "0",
            width: "3px",
            background:
              "linear-gradient(to bottom, #4a7c59, #2d5238, transparent)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
