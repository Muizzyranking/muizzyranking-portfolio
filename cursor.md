# cursor.md — The Custom Cursor, Explained

A standalone guide to how this portfolio's custom cursor is built and how it
works, written so you can recreate it in any project. Everything lives in one
component (`CustomCursor.tsx`) plus a few CSS blocks — no dependencies beyond
framer-motion (and even that is optional; see "Going dependency-free").

## What it does

A fixed circular ring replaces the native cursor on devices with a fine
pointer (mouse/trackpad). Three behaviors:

1. **Rest** — a 32px ring glides after the pointer with a spring (slight,
   natural lag).
2. **Hover** — when the pointer is over anything clickable, the ring
   "morphs" onto that element: it grows to the element's bounding box (plus
   a little padding) and wraps it like an extra border, matching the
   element's own corner radius. It stays glued to the element even while the
   page scrolls, and releases back to the pointer when the element leaves.
3. **Press** — clicking compresses the ring (scale 0.92) with a quick
   120ms ease.

Disabled entirely for touch devices and `prefers-reduced-motion` users —
they keep the native cursor.

## The core ideas

### 1. One fixed div, positioned by transform

The cursor is a single `position: fixed` div (`.cursor-dot`) with
`pointer-events: none` and a very high z-index. Everything is done through
its inline `transform`:

```
translate3d(x, y, 0) translate(-50%, -50%) scale(s)
```

`translate(-50%, -50%)` centers the ring on the point; `x, y` is either the
pointer position or the center of the hovered element. Never animate
`top`/`left` — transform-only keeps it on the compositor.

Size and radius are set as plain `width`/`height`/`border-radius` styles
(transitioned in CSS, see below). Transform is NOT transitioned in the base
state — the spring already smooths pointer-following, and a CSS transform
transition fighting the spring is what makes custom cursors feel laggy.

### 2. Spring follow, 1:1 wrap

Pointer following uses framer-motion's `useSpring`
(`{ stiffness: 900, damping: 70, mass: 0.5 }` — snappy, ~1 frame of lag).
Subscribe to the spring's `change` event and write the transform
imperatively. When the ring is wrapping an element, pointer-following is
suspended (the ring belongs to the element, not the pointer); on release it
resumes.

### 3. The wrap

On `mousemove`, resolve the hover target:

```js
const el = e.target.closest("a, button, [role='button'], input, textarea,
                             select, label, summary, [data-cursor]");
```

If it changed:
- **Wrapping**: read `getBoundingClientRect()`, set ring size to
  `rect + 2×7px padding`, position to the rect's center, and set
  `border-radius` to the element's computed radius + 4px (cache it per
  element in a `WeakMap` — don't call `getComputedStyle` every frame).
  Add a temporary `.cursor-glide` class that enables a 300ms transform/
  width/height transition so the morph animates; remove it after ~320ms so
  tracking stays instant afterwards.
- **Releasing**: same glide, back to the 32px dot at the pointer.

`data-cursor` is the escape hatch: any element (e.g. an SVG node that can't
be a real button) opts into wrapping by adding the attribute.

### 4. Frame-perfect tracking (the important part)

While wrapping, a `requestAnimationFrame` loop re-reads the element's rect
**every frame** and repositions the ring. This is what makes the ring stay
glued to the element when the page scrolls under a still pointer — scroll
events alone are not enough (they can be missed, and they don't fire for
layout shifts or animated elements).

The same loop handles release: when the element has completely left the
viewport (`rect.bottom < -40 || rect.top > innerHeight + 40`), release the
ring back to the dot at the pointer's last known position. Until then, the
ring follows the element even partially off-screen — a border around a card
should travel with the card, not stay clamped to the screen.

### 5. The edge clamp (small elements only)

Elements near the viewport top (navbar links) would push the ring's top arc
off-screen. Clamping **every** ring is wrong: for a tall element (a long
card), clamping pins the ring at the viewport edge while the element keeps
scrolling — the ring "sticks". The rule that works:

- If the ring height ≤ 80px, clamp its center so it stays fully on-screen
  (3px margin).
- Otherwise, position it exactly on the element and let it go off-screen
  naturally.

### 6. Graceful degradation

The component renders nothing until it confirms
`matchMedia("(pointer: fine)")` and **not** `prefers-reduced-motion`. Only
then does it add `html.custom-cursor-active`, and CSS hides the native
cursor **only under that class**:

```css
html.custom-cursor-active,
html.custom-cursor-active a,
html.custom-cursor-active button,
html.custom-cursor-active [role="button"],
html.custom-cursor-active [data-cursor],
html.custom-cursor-active svg [data-cursor] { cursor: none; }
```

No JS (or touch, or reduced motion) → native cursor untouched. Keyboard
users still get normal `:focus-visible` outlines.

### 7. Press feedback

`mousedown` → add `.cursor-press` (120ms transition, scale 0.92 + deeper
fill), `mouseup` → keep the class ~140ms so it eases back, then remove it
and resume 1:1 tracking.

## CSS that matters

```css
.cursor-dot {
  position: fixed;
  top: 0; left: 0;
  z-index: 9999;
  pointer-events: none;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  border: 1.5px solid var(--accent);
  opacity: 0;
  will-change: transform, width, height;
  /* no transform transition — the spring owns it */
  transition: width 260ms cubic-bezier(0.23,1,0.32,1),
              height 260ms cubic-bezier(0.23,1,0.32,1),
              border-radius 260ms cubic-bezier(0.23,1,0.32,1),
              background-color 180ms ease, opacity 200ms ease;
}
.cursor-dot[data-visible="true"] { opacity: 1; }
.cursor-dot[data-wrapped="true"] { background: color-mix(in srgb, var(--accent) 7%, transparent); border-width: 2px; }
.cursor-dot.cursor-glide { transition: transform 300ms cubic-bezier(0.23,1,0.32,1), /* + size props */ }
.cursor-dot.cursor-press  { transition: transform 120ms ease-out, background-color 120ms ease; }
@media (prefers-reduced-motion: reduce) { .cursor-dot { display: none; } }
```

## Pitfalls learned the hard way

1. **Never transition `transform` while following the pointer** — the CSS
   transition stacks with the spring and everything feels slow. Only enable
   it temporarily for the morph (`.cursor-glide`) and press.
2. **Don't clamp tall rings** — clamping any ring to the viewport makes it
   stick at the boundary while its element scrolls away. Clamp small rings
   only.
3. **Don't rely on `scroll` events** — use the rAF loop. Scroll events miss
   fast/smooth scrolling and never fire for layout shifts.
4. **Cache `getComputedStyle`** — reading border-radius on every mousemove
   is measurable jank. `WeakMap<HTMLElement, number>`.
5. **SVG nodes** — a `<g>` can't be a `<button>`; give it `role="button"`,
   `tabIndex={0}`, keyboard `onKeyDown` (Enter/Space), and `data-cursor`.
   Biome/ESLint will ask for a suppression comment — that's fine.
6. **Hydration** — the dot renders with `data-visible="false"` and
   `opacity: 0` server-side; nothing pointer-dependent happens until the
   effect runs client-side.
7. **Pointer events on hit-areas** — if you add invisible "hit area" shapes
   inside an SVG node, they inflate `getBoundingClientRect()` and the ring
   wraps empty space. Keep the wrap target's rect tight to its visuals.

## Going dependency-free

The spring is the only framer-motion piece. To drop the dependency, replace
`useSpring` with a tiny exponential-smoothing loop inside the same rAF:

```js
cx += (targetX - cx) * 0.18;   // per frame
```

Everything else (rect reads, wrap morph, classes) is already vanilla.
