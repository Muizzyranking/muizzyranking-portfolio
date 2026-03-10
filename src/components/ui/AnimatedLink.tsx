"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

type Props = {
  href: string;
  style?: CSSProperties;
  children: React.ReactNode;
};

export default function AnimatedLink({ href, style, children }: Props) {
  return (
    <Link
      href={href}
      style={style}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7";}}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1";}}
    >
      {children}
    </Link>
  );
}
