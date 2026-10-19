"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { site } from "@/lib/site";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <m.div
      initial={false}
      animate={open ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -8, pointerEvents: "none" }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="md:hidden fixed inset-x-0 top-14 z-40 border-b border-border-subtle bg-background/95 backdrop-blur-md"
      aria-hidden={!open}
      inert={!open ? true : undefined}
    >
      <nav className="container-main flex flex-col py-3" aria-label="Mobile navigation">
        {site.nav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-baseline gap-3 border-b border-border-subtle py-3.5 last:border-b-0"
          >
            <span className="font-mono text-[0.68rem] text-accent" aria-hidden="true">
              0{i + 1}
            </span>
            <span className="font-mono text-[0.92rem] lowercase text-text-primary">{item.label}</span>
          </Link>
        ))}
        <a href={site.resume} target="_blank" rel="noopener noreferrer" onClick={onClose} className="flex items-baseline gap-3 py-3.5">
          <span className="font-mono text-[0.68rem] text-accent" aria-hidden="true">
            05
          </span>
          <span className="font-mono text-[0.92rem] lowercase text-text-primary">
            résumé<span className="ml-1 text-text-muted">↗</span>
          </span>
        </a>
      </nav>
    </m.div>
  );
}
