"use client";

import Link from "next/link";
import type { AnimatedLinkProps } from "@/types";

export default function AnimatedLink({ href, style, children }: AnimatedLinkProps) {
  return (
    <Link
      href={href}
      style={style}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.7";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
    >
      {children}
    </Link>
  );
}
