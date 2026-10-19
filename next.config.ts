import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Allow remote screenshot URLs pasted into project frontmatter
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
