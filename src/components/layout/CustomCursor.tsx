"use client";

import { useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const WRAP_SELECTOR = "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor]";
const IGNORE_SELECTOR = "[data-cursor-ignore]";

/** Resolve the wrap element for a pointer event. Containers may set
 *  [data-cursor-ignore] to opt the whole box out of wrapping; any
 *  [data-cursor] opt-in nested inside an ignored container still wraps. */
function pickWrapTarget(target: EventTarget | null): HTMLElement | null {
  const node = target as HTMLElement | null;
  const ignore = node?.closest?.(IGNORE_SELECTOR) as HTMLElement | null;
  const el = node?.closest?.(WRAP_SELECTOR) as HTMLElement | null;
  if (ignore && el === ignore) return null;
  return el;
}

const DOT_SIZE = 32;
const WRAP_PADDING = 7;
const PRESS_SCALE = 0.92;

/** [top-left, top-right, bottom-right, bottom-left] computed radii. */
type Radii = [number, number, number, number];

function cornerRadii(el: HTMLElement): Radii {
  const cs = window.getComputedStyle(el);
  const val = (v: string) => {
    const n = Number.parseFloat(v);
    return Number.isNaN(n) ? 8 : n;
  };
  return [val(cs.borderTopLeftRadius), val(cs.borderTopRightRadius), val(cs.borderBottomRightRadius), val(cs.borderBottomLeftRadius)];
}

/** The part of a rect that is actually visible on screen, intersected with
 *  an optional clipping ancestor (e.g. a horizontal gallery strip). */
function visibleRect(rect: DOMRect, clip: DOMRect | null) {
  const PAD = WRAP_PADDING + 3;
  const left = Math.max(Math.min(rect.left, rect.right), clip?.left ?? 0, PAD);
  const right = Math.min(Math.max(rect.left, rect.right), clip?.right ?? window.innerWidth, window.innerWidth - PAD);
  const top = Math.max(Math.min(rect.top, rect.bottom), clip?.top ?? 0, PAD);
  const bottom = Math.min(Math.max(rect.top, rect.bottom), clip?.bottom ?? window.innerHeight, window.innerHeight - PAD);
  return { left, top, right, bottom, width: right - left, height: bottom - top };
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);

  const x = useSpring(-100, { stiffness: 900, damping: 70, mass: 0.5 });
  const y = useSpring(-100, { stiffness: 900, damping: 70, mass: 0.5 });
  const target = useRef<HTMLElement | null>(null);
  const shown = useRef(false);
  const pressed = useRef(false);
  const pointer = useRef({ x: -100, y: -100 });
  const radiusCache = useRef(new WeakMap<HTMLElement, Radii>());

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const dot = dotRef.current;
    if (!dot) return;

    const render = (cx: number, cy: number) => {
      const scale = pressed.current ? PRESS_SCALE : 1;
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const positionHub = (cx: number, cy: number) => {
      const hub = hubRef.current;
      if (hub) hub.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
    };

    const applyDot = (cx: number, cy: number) => {
      dot.style.width = `${DOT_SIZE}px`;
      dot.style.height = `${DOT_SIZE}px`;
      dot.style.borderRadius = "999px";
      render(cx, cy);
    };

    const applyWrap = () => {
      const el = target.current;
      if (!el) return;
      const clip = el.closest("[data-cursor-clip]") as HTMLElement | null;
      const visible = visibleRect(el.getBoundingClientRect(), clip ? clip.getBoundingClientRect() : null);
      if (visible.width <= 0 || visible.height <= 0) return;

      const w = visible.width + WRAP_PADDING * 2;
      const h = visible.height + WRAP_PADDING * 2;
      const cx = visible.left + visible.width / 2;
      const cy = visible.top + visible.height / 2;

      dot.style.width = `${w}px`;
      dot.style.height = `${h}px`;

      // Mirror the element's own corners (slightly opened up by the padding
      // and clamped to the ring's half-size) so the wrap reads as the
      // element's border, not a generic pill.
      const half = Math.min(w, h) / 2;
      let radii = radiusCache.current.get(el);
      if (!radii) {
        radii = cornerRadii(el);
        radiusCache.current.set(el, radii);
      }
      dot.style.borderTopLeftRadius = `${Math.min(radii[0] + 2, half)}px`;
      dot.style.borderTopRightRadius = `${Math.min(radii[1] + 2, half)}px`;
      dot.style.borderBottomRightRadius = `${Math.min(radii[2] + 2, half)}px`;
      dot.style.borderBottomLeftRadius = `${Math.min(radii[3] + 2, half)}px`;

      render(cx, cy);
    };

    const release = (cx: number, cy: number) => {
      target.current = null;
      dot.dataset.wrapped = "false";
      glide(() => applyDot(cx, cy));
    };

    const glide = (apply: () => void) => {
      dot.classList.add("cursor-glide");
      apply();
      window.setTimeout(() => dot.classList.remove("cursor-glide"), 320);
    };

    const unsubX = x.on("change", () => {
      if (!target.current) applyDot(x.get(), y.get());
    });
    const unsubY = y.on("change", () => {
      if (!target.current) applyDot(x.get(), y.get());
    });

    let raf = 0;
    const track = () => {
      const el = target.current;
      if (el) {
        const clip = el.closest("[data-cursor-clip]") as HTMLElement | null;
        const visible = visibleRect(el.getBoundingClientRect(), clip ? clip.getBoundingClientRect() : null);
        const inside =
          pointer.current.x >= visible.left &&
          pointer.current.x <= visible.right &&
          pointer.current.y >= visible.top &&
          pointer.current.y <= visible.bottom;
        if (!inside) {
          release(pointer.current.x, pointer.current.y);
        } else {
          applyWrap();
        }
      }
      raf = requestAnimationFrame(track);
    };

    const onMove = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      positionHub(e.clientX, e.clientY);

      const next = pickWrapTarget(e.target);

      if (next !== target.current) {
        target.current = next;
        dot.dataset.wrapped = next ? "true" : "false";
        if (next) {
          glide(() => applyWrap());
        } else {
          glide(() => applyDot(e.clientX, e.clientY));
        }
      } else if (next) {
        applyWrap();
      }

      if (!shown.current) {
        shown.current = true;
        dot.dataset.visible = "true";
        if (hubRef.current) hubRef.current.dataset.visible = "true";
      }
    };

    const onPress = () => {
      pressed.current = true;
      dot.classList.add("cursor-press");
      hubRef.current?.classList.add("cursor-press");
      if (target.current) applyWrap();
      else applyDot(x.get(), y.get());
    };
    const onRelease = () => {
      pressed.current = false;
      dot.classList.add("cursor-press");
      hubRef.current?.classList.add("cursor-press");
      if (target.current) applyWrap();
      else applyDot(x.get(), y.get());
      window.setTimeout(() => {
        dot.classList.remove("cursor-press");
        hubRef.current?.classList.remove("cursor-press");
      }, 140);
    };

    const onLeave = () => {
      shown.current = false;
      dot.dataset.visible = "false";
      if (hubRef.current) hubRef.current.dataset.visible = "false";
    };

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onPress, { passive: true });
    window.addEventListener("mouseup", onRelease, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(track);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onPress);
      window.removeEventListener("mouseup", onRelease);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      unsubX();
      unsubY();
    };
  }, [x, y]);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot"
        data-visible="false"
        data-wrapped="false"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          ...(enabled ? undefined : { display: "none" }),
        }}
      />
      {/* Fixed 1:1 companion dot: marks the pointer inside (and outside) the wrap */}
      <div ref={hubRef} aria-hidden="true" className="cursor-hub" data-visible="false" style={enabled ? undefined : { display: "none" }} />
    </>
  );
}
