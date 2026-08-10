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
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="py-3 text-[0.95rem] font-semibold lowercase text-text-secondary transition-colors duration-150 border-b border-border-subtle last:border-b-0 hover:text-text-primary"
          >
            {item.label}
          </Link>
        ))}
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="py-3 text-[0.95rem] font-medium text-text-primary transition-colors duration-150"
        >
          Résumé
          <span className="ml-1 text-accent" aria-hidden="true">
            ↗
          </span>
        </a>
      </nav>
    </m.div>
  );
}
