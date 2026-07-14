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
        name: "kitty",
        detail: "Reliable enough that the shiny new terminals still want to be it.",
        primary: true,
      },
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
              className="setup-row"
            >
              <p className="setup-row__category">
                {category}
              </p>

              <div className="setup-row__items">
                {items.map(({ name, detail, primary }) => (
                  <div
                    key={name}
                    className="setup-item"
                  >
                    <span className={`setup-item__name ${primary ? "setup-item__name--primary" : ""}`}>
                      {name}
                      {primary && (
                        <span className="setup-item__dot" />
                      )}
                    </span>
                    <span className="setup-item__detail">
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
        .setup-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          border-top: 1px solid var(--color-border-subtle);
          padding-block: 1.75rem;
          gap: 2rem;
          align-items: start;
        }
        .setup-row__category {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-accent);
          padding-top: 0.15rem;
        }
        .setup-row__items {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .setup-item {
          display: flex;
          align-items: baseline;
          gap: 1rem;
        }
        .setup-item__name {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--color-text-secondary);
          min-width: 140px;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }
        .setup-item__name--primary {
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .setup-item__dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-accent);
        }
        .setup-item__detail {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.55;
        }

        @media (max-width: 700px) {
          .setup-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
            padding-block: 1.25rem !important;
          }
          .setup-row__category {
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--color-border-subtle);
          }
          .setup-item {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0.5rem 1rem;
            align-items: baseline;
          }
          .setup-item__name {
            min-width: auto !important;
            white-space: nowrap;
          }
          .setup-item__detail {
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
}
