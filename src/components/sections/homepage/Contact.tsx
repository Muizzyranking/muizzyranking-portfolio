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
  const from = reduce ? {} : { y: 16 };

  return (
    <section ref={ref} className="section section-band relative overflow-hidden">
      {/* warm ember glow rising behind the closing statement */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-18rem] left-1/2 h-[30rem] w-[52rem] -translate-x-1/2 rounded-full opacity-[0.1] dark:opacity-[0.14]"
        style={{
          background: "radial-gradient(closest-side, var(--color-accent-bright), transparent)",
          filter: "blur(44px)",
        }}
      />

      <div className="container-main text-center relative">
        <m.p
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE }}
          className="eyebrow justify-center mb-7"
        >
          Contact
        </m.p>

        <m.h2
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
          className="font-display font-semibold tracking-[-0.03em] leading-[1.08] text-[clamp(2.25rem,5.5vw,3.75rem)] text-text-primary max-w-[20ch] mx-auto mb-6"
        >
          Let&rsquo;s build something that <em className="italic text-accent">has to work.</em>
        </m.h2>

        <m.p
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
          className="text-text-secondary text-[1rem] leading-[1.7] max-w-[48ch] mx-auto mb-10"
        >
          Open to backend engineering roles — or a good conversation about systems.
        </m.p>

        <m.div
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.18 }}
          className="flex items-center justify-center gap-3 flex-wrap mb-12"
        >
          <a href={`mailto:${site.email}`} className="btn btn--primary">
            {site.email}
            <span aria-hidden="true">→</span>
          </a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            Résumé
            <span aria-hidden="true">↗</span>
          </a>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.24 }}
          className="flex items-center justify-center gap-2 flex-wrap"
        >
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.handle}
              className="group inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface-raised text-text-muted transition-all duration-200 ease-out hover:border-accent hover:text-accent hover:-translate-y-0.5"
            >
              <span className="[&_svg]:size-[1.05rem]">{SOCIAL_ICONS[ICON_KEY[social.label]]}</span>
            </a>
          ))}
        </m.div>
      </div>
    </section>
  );
}
