"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SOCIAL_ICONS } from "@/components/ui/icons";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import { site } from "@/lib/site";

const ICON_KEY: Record<string, keyof typeof SOCIAL_ICONS> = {
  GitHub: "github",
  LinkedIn: "linkedin",
  "X / Twitter": "twitter",
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <section ref={ref} className="section section-band">
      <div className="container-main text-center">
        <m.p
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE }}
          className="eyebrow mb-7"
        >
          Contact
        </m.p>

        <m.h2
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.06 }}
          className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-[clamp(2rem,5vw,3rem)] text-text-primary max-w-[16ch] mx-auto mb-5"
        >
          Let&apos;s build something that has to work.
        </m.h2>

        <m.p
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.12 }}
          className="text-text-secondary text-[0.95rem] leading-[1.7] max-w-[46ch] mx-auto mb-10"
        >
          I&apos;m open to backend engineering roles. Production systems, APIs, and data pipelines that have to stay up. A good conversation about
          systems works too.
        </m.p>

        <m.div
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.18 }}
          className="flex items-center justify-center gap-3 flex-wrap mb-12"
        >
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-[0.95rem] font-medium text-accent-foreground transition-colors duration-150 hover:bg-accent-dim"
          >
            {site.email}
            <span aria-hidden="true">→</span>
          </a>
          <a
            href={site.resume}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-6 py-3 text-[0.95rem] font-medium text-text-primary transition-colors duration-150 hover:border-accent-dim"
          >
            Résumé
            <span aria-hidden="true">↗</span>
          </a>
        </m.div>

        <m.div
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.24 }}
          className="flex items-center justify-center gap-2 flex-wrap"
        >
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-border bg-bg-elevated px-4 py-2 text-text-secondary text-[0.85rem] transition-colors duration-150 hover:border-accent-dim hover:text-text-primary"
            >
              <span className="text-accent">{SOCIAL_ICONS[ICON_KEY[social.label]]}</span>
              {social.label}
            </a>
          ))}
        </m.div>
      </div>
    </section>
  );
}
