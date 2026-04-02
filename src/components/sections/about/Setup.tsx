"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import {
  fadeUp,
  SCROLL_REVEAL,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

interface SetupItem {
  name: string;
  detail: string;
  primary?: boolean;
  exploring?: boolean;
}

interface SetupCategory {
  category: string;
  items: SetupItem[];
}


const SETUP: SetupCategory[] = [
  {
    category: "Editor",
    items: [
      {
        name: "Neovim",
        detail:
          "Yes, still. Yes, in 2026. The config is always being rewritten.",
        primary: true,
      },
      {
        name: "VsCode",
        detail: "Don't we all?",
      },
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
      {
        name: "lazygit",
        detail: "Git, but I can actually remember the keybindings.",
      },
      {
        name: "lazydocker",
        detail: "Because docker ps | grep is not a workflow.",
      },
    ],
  },
  {
    category: "Shell tools",
    items: [
      { name: "fzf", detail: "Fuzzy find everything. Everything." },
      { name: "ripgrep", detail: "grep, but it respects my time." },
      {
        name: "bat",
        detail: "cat with syntax highlighting. Can't unlearn it.",
      },
      {
        name: "curl / httpie",
        detail: "For when Postman feels like too much.",
      },
    ],
  },
  {
    category: "OS",
    items: [
      { name: "Linux (Arch btw)", detail: "Where I do real work.", primary: true },
      { name: "Ubuntu / Debian", detail: "Servers. Always." },
    ],
  },
  {
    category: "Backend daily",
    items: [
      {
        name: "Python",
        detail: "Primary language. FastAPI or Django depending on the job.",
      },
      { name: "PostgreSQL", detail: "The database. I don't debate this." },
      {
        name: "Redis",
        detail: "Cache, queue broker, pub/sub. Does a lot of lifting.",
      },
      {
        name: "Docker",
        detail: "Everything runs in a container. Non-negotiable.",
      },
      { name: "Celery", detail: "Async tasks. Beats cron jobs." },
    ],
  },
  {
    category: "Currently learning",
    items: [
      {
        name: "Rust",
        detail: "Borrow checker and I are building a relationship. Slowly.",
        exploring: true,
      },
      {
        name: "PyTorch",
        detail: "For the ML side of the pivot.",
        exploring: true,
      },
      {
        name: "MLflow",
        detail: "Experiment tracking. Starting to make sense.",
        exploring: true,
      },
    ],
  },
];

export default function Setup() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4.5rem, 9vw, 7rem) 0",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      <div className="container-main">
        <m.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
        >
          <span style={{ color: "var(--color-accent)", opacity: 0.7 }}>
            [  ]
          </span>
          Setup & uses
          <span
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--color-border)",
            }}
          />
        </m.p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <m.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            What I actually use
          </m.h2>

          <m.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
            }}
          >
            { "// dashed = still in the oven (let me cook)" }
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "flex", flexDirection: "column", gap: "1px" }}
        >
          {SETUP.map(({ category, items }) => (
            <m.div
              key={category}
              variants={staggerItem}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                borderTop: "1px solid var(--color-border-subtle)",
                paddingBlock: "1.5rem",
                gap: "2rem",
                alignItems: "start",
              }}
              className="setup-row"
            >
              {/* Category label */}
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  paddingTop: "0.15rem",
                }}
              >
                {category}
              </p>

              {/* Items */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {items.map(({ name, detail, primary, exploring }) => (
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
                        fontSize: "0.82rem",
                        fontWeight: primary ? 600 : 400,
                        color: primary
                          ? "var(--color-text-primary)"
                          : "var(--color-text-secondary)",
                        border: exploring
                          ? "1px dashed var(--color-border)"
                          : undefined,
                        borderRadius: exploring
                          ? "var(--radius-sm)"
                          : undefined,
                        padding: exploring ? "0.1em 0.4em" : undefined,
                        minWidth: "120px",
                        flexShrink: 0,
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
                            marginLeft: "0.4rem",
                            verticalAlign: "middle",
                          }}
                        />
                      )}
                    </span>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.5,
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
