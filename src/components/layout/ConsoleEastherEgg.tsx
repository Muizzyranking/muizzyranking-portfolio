"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%c muizzyranking.dev ",
      "background: #c9a84c; color: #0e0e0e; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 3px;"
    );
    console.log(
      "%c oh, you inspect things. i respect that. ",
      "color: #c9a84c; font-size: 11px; font-family: monospace;"
    );
    console.log(
      "%c built with Next.js, Tailwind v4, Framer Motion, and an unreasonable amount of attention to detail. ",
      "color: #7a7470; font-size: 10px; font-family: monospace;"
    );
    console.log(
      "%c :wq ",
      "color: #5a5550; font-size: 10px; font-family: monospace;"
    );
  }, []);

  return null;
}
