"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, SCROLL_REVEAL, staggerContainer, staggerItem } from "@/lib/motion";

interface Item {
  name: string;
  detail: string;
  primary?: boolean;
}

interface Category {
  category: string;
  items: Item[];
}

const SETUP: Category[] = [
  {
    category: "Editor",
    items: [
      {
        name: "Neovim",
        detail: "Yes, still. The config is always being rewritten.",
        primary: true,
      },
      { name: "VS Code", detail: "Don't we all?" },
    ],
  },
  {
    category: "Terminal",
    items: [
      {
        name: "Zsh",
        detail: "With enough plugins to make purists uncomfortable.",
        primary: true,
      },
      { name: "Tmux", detail: "Multiple panes. Always. Can't go back." },
      { name: "lazygit", detail: "Git, but I can actually remember the keybindings." },
      { name: "lazydocker", detail: "Because docker ps | grep is not a workflow." },
    ],
  },
  {
    category: "Shell tools",
    items: [
      { name: "fzf", detail: "Fuzzy-find everything. Everything." },
      { name: "ripgrep", detail: "grep, but it respects my time." },
      { name: "bat", detail: "cat with syntax highlighting. Can't unlearn it." },
      { name: "curl / httpie", detail: "For when Postman feels like too much." },
    ],
  },
  {
    category: "OS",
    items: [
      { name: "Linux (Arch btw)", detail: "Where I do real work.", primary: true },
      { name: "Ubuntu / Debian", detail: "Servers. Always." },
    ],
  },
];

export default function DailyDriver() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4.5rem, 9vw, 7rem) 0",
        background: "var(--color-bg-elevated)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container-main">
        <m.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="eyebrow"
          style={{ marginBottom: "2rem" }}
        >
          <span className="eyebrow__mark">[ 02 ]</span>
          Daily driver
          <span className="eyebrow__rule" />
        </m.p>

        <m.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: "3rem",
          }}
        >
          The setup
        </m.h2>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {SETUP.map(({ category, items }) => (
            <m.div
              key={category}
              variants={staggerItem}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                borderTop: "1px solid var(--color-border-subtle)",
                paddingBlock: "1.75rem",
                gap: "2rem",
                alignItems: "start",
              }}
              className="setup-row"
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  paddingTop: "0.15rem",
                }}
              >
                {category}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {items.map(({ name, detail, primary }) => (
                  <div
                    key={name}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        fontWeight: primary ? 600 : 400,
                        color: primary ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                        minWidth: "140px",
                        flexShrink: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      {name}
                      {primary && (
                        <span
                          style={{
                            display: "inline-block",
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: "var(--color-accent)",
                          }}
                        />
                      )}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.55,
                      }}
                    >
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .setup-row {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
