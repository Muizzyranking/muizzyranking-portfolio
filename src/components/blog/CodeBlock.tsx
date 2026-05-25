"use client";

import { useRef, useState } from "react";

export default function CodeBlock({ children, ...rest }: React.HTMLAttributes<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = ref.current?.innerText ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — clipboard may be blocked
    }
  };

  return (
    <div className="code-block">
      <button type="button" onClick={handleCopy} aria-label={copied ? "Copied" : "Copy code"} className="code-block__copy" data-copied={copied}>
        {copied ? (
          <>
            <span aria-hidden>✓</span>
            <span>copied</span>
          </>
        ) : (
          <>
            <span aria-hidden style={{ display: "inline-flex", verticalAlign: "middle" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" role="presentation">
                <title>Copy</title>
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </span>
            <span>copy</span>
          </>
        )}
      </button>
      <pre ref={ref} {...rest}>
        {children}
      </pre>
    </div>
  );
}
