"use client";
import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { SOCIAL_ICONS } from "@/components/ui/icons";
import { EMAIL, SOCIALS } from "@/lib/data";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

const socialsArray = (Object.keys(SOCIALS) as Array<keyof typeof SOCIALS>).map((key) => ({
  ...SOCIALS[key],
  icon: SOCIAL_ICONS[key],
}));

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      id="contact"
      className="py-[clamp(5rem,10vw,8rem)] bg-bg-elevated border-t border-border-subtle"
    >
      <div className="container-main">
        <m.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="eyebrow mb-8"
        >
          <span className="eyebrow__mark">[ 05 ]</span>
          Contact
          <span className="eyebrow__rule" />
        </m.p>

        <div className="contact-grid grid grid-cols-2 gap-20 items-start max-[860px]:grid-cols-1 max-[860px]:gap-12">
          <div>
            <m.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-display font-semibold tracking-[-0.04em] leading-[1.05] mb-5 text-[clamp(2rem,4vw,3rem)]"
            >
              Let&apos;s build something <em className="italic text-accent font-medium">interesting.</em>
            </m.h2>

            <m.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-text-secondary text-[0.95rem] leading-[1.78] max-w-[42ch] mb-7"
            >
              Open to backend roles, AI/ML adjacent work, interesting problems, conversations about systems, AI, conversations that don&apos;t start
              with &ldquo;circle back,&rdquo; or why Neovim is still relevant in {new Date().getFullYear()}.{" "}
              <span className="text-text-muted italic">
                (It is.)
              </span>
            </m.p>

            <m.div variants={fadeUp} custom={3} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 font-mono text-[0.88rem] text-accent no-underline border-b border-accent-dim pb-[0.15rem] tracking-[0.04em] transition-opacity duration-200 hover:opacity-65"
              >
                {EMAIL} →
              </a>
            </m.div>
          </div>

          {/* ── RIGHT — social links */}
          <div>
            <m.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-mono text-[0.63rem] tracking-[0.18em] uppercase text-text-muted mb-5"
            >
              Find me online
            </m.p>

            <m.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col gap-2"
            >
              {socialsArray.map(({ name, handle, href, icon }) => (
                <m.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={staggerItem}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="group flex items-center gap-[0.875rem] px-4 py-[0.875rem] bg-background border border-border rounded-md no-underline text-text-secondary transition-colors duration-200 hover:border-accent-dim"
                >
                  {/* Icon box */}
                  <div className="w-8 h-8 bg-surface border border-border rounded-sm flex items-center justify-center text-accent shrink-0">
                    {icon}
                  </div>

                  <div>
                    <p className="text-[0.85rem] font-medium text-text-primary mb-[0.1rem] leading-[1.3]">
                      {name}
                    </p>
                    <p className="font-mono text-[0.7rem] text-text-muted">
                      {handle}
                    </p>
                  </div>

                  <span className="ml-auto text-text-muted text-[0.82rem]">
                    →
                  </span>
                </m.a>
              ))}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
