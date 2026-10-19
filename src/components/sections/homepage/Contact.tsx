"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import DocSection from "@/components/ui/DocSection";
import { SOCIAL_ICONS } from "@/components/ui/icons";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";
import { site } from "@/lib/site";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 12 };

  return (
    <DocSection id="contact">
      <div ref={ref} className="text-center">
        <div className="mx-auto max-w-[56ch]">
          <m.h2
            initial={{ opacity: 0, ...from }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15] tracking-[-0.01em] text-text-primary"
          >
            Let's build something that has to work.
          </m.h2>

          <m.p
            initial={{ opacity: 0, ...from }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
            className="mt-4 text-[1.02rem] leading-[1.7] text-text-secondary"
          >
            Open to software engineering roles — or a good conversation about systems.
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.14 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a href={`mailto:${site.email}`} className="btn btn--primary">
            email me
            <span aria-hidden="true">→</span>
          </a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            résumé
            <span aria-hidden="true">↗</span>
          </a>
        </m.div>

        {/* Social links — icon + label, centered under the CTAs */}
        <m.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-2 border-t border-border-subtle pt-6"
        >
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-3 py-2 text-text-muted transition-colors duration-150 hover:text-accent"
            >
              {social.label === "GitHub" && SOCIAL_ICONS.github}
              {social.label === "LinkedIn" && SOCIAL_ICONS.linkedin}
              {social.label === "X / Twitter" && SOCIAL_ICONS.twitter}
              <span className="font-mono text-[0.76rem] lowercase">{social.label.toLowerCase()}</span>
            </a>
          ))}
        </m.div>
      </div>
    </DocSection>
  );
}
