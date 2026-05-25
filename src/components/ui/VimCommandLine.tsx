"use client";

import { AnimatePresence, m } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { COMMAND_NAMES, COMMANDS, completeCommand, HINT_KEY } from "@/lib/vim-commands";

export default function VimCommandLine() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<{ kind: "info" | "error"; text: string } | null>(null);
  const [hintVisible, setHintVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Show the discovery hint after a short delay on first visit.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(HINT_KEY) === "1") return;
    const t = setTimeout(() => setHintVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const dismissHint = () => {
    setHintVisible(false);
    if (typeof window !== "undefined") localStorage.setItem(HINT_KEY, "1");
  };

  const openPalette = () => {
    dismissHint();
    setOpen(true);
    setInput("");
    setStatus(null);
  };

  // Global `:` and Esc handler.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return;
      }

      if (e.key === ":" && !open) {
        e.preventDefault();
        setHintVisible(false);
        if (typeof window !== "undefined") localStorage.setItem(HINT_KEY, "1");
        setOpen(true);
        setInput("");
        setStatus(null);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
        setStatus(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) {
      setOpen(false);
      return;
    }
    if (cmd === "help") {
      setStatus({ kind: "info", text: `commands: ${COMMAND_NAMES.filter((n) => n !== "writing").join(", ")}` });
      setInput("");
      return;
    }
    if (cmd === "q") {
      setOpen(false);
      return;
    }
    const entry = COMMANDS[cmd];
    if (entry) {
      entry.run(router);
      setOpen(false);
    } else {
      setStatus({ kind: "error", text: `E492: not an editor command: ${cmd}` });
      setInput("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const completed = completeCommand(input.toLowerCase());
      if (completed) setInput(completed);
    }
  };

  return (
    <>
      {/* Discovery hint */}
      <AnimatePresence>
        {hintVisible && !open && (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="vim-hint fixed left-5 bottom-5 z-50 inline-flex items-stretch bg-[rgba(15,15,15,0.85)] border border-border rounded-md font-mono text-[0.7rem] backdrop-blur-sm shadow-[0_6px_18px_rgba(0,0,0,0.25)] overflow-hidden"
          >
            <button
              type="button"
              onClick={openPalette}
              aria-label="Open command mode"
              className="inline-flex items-center gap-2 py-[0.4rem] pl-2 pr-[0.7rem] bg-transparent border-0 text-text-muted font-inherit tracking-[0.04em] cursor-pointer"
            >
              <kbd className="font-mono text-[0.78rem] text-accent bg-bg-elevated border border-border rounded-[3px] px-[0.4rem] py-[0.05rem] leading-none">
                :
              </kbd>
              <span>for commands</span>
            </button>
            <button
              type="button"
              onClick={dismissHint}
              aria-label="Dismiss hint"
              className="inline-flex items-center justify-center px-[0.55rem] bg-transparent border-0 border-l border-border text-text-muted opacity-55 text-[0.7rem] leading-none cursor-pointer transition-[opacity,color] duration-150 hover:opacity-100 hover:text-text-primary"
            >
              ✕
            </button>
          </m.div>
        )}
      </AnimatePresence>

      {/* Command line */}
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 right-0 bottom-0 z-[200] bg-[rgba(8,8,8,0.95)] backdrop-blur-[14px] border-t border-border px-[clamp(1rem,4vw,3rem)] py-[0.7rem] font-mono"
          >
            <form onSubmit={submit} className="flex items-center gap-[0.6rem]">
              <span className="text-accent text-base">:</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="vim command"
                className="flex-1 bg-transparent border-0 outline-none text-text-primary font-inherit text-[0.92rem] caret-accent"
                placeholder="tools · projects · about · blog · help · q"
              />
              <span className="text-text-muted text-[0.7rem] tracking-[0.08em]">TAB to complete · ESC to close</span>
            </form>
            {status && (
              <p
                className="text-[0.78rem] mt-[0.45rem] ml-[1.2rem]"
                style={{
                  color: status.kind === "error" ? "var(--color-error)" : "var(--color-text-muted)",
                }}
              >
                {status.text}
              </p>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
