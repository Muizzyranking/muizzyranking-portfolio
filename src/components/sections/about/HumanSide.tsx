"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, SCROLL_REVEAL } from "@/lib/motion";

const DAD_JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "I told my computer I needed a break. Now it won't stop sending me Kit-Kat ads.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "Why did the developer go broke? Because he used up all his cache.",
  "I'm reading a book about anti-gravity. It's impossible to put down.",
];

const HOBBIES = [
  {
    label: "Watching",
    title: "Superhero films, sci-fi, animation.",
    body: "Marvel, DC, anime, anything with a good story. I have opinions about which Spider-Man was objectively the best. They are correct.",
    tags: ["MCU", "Into the Spider-Verse", "Arcane", "Invincible", "Studio Ghibli"],
  },
  {
    label: "Playing",
    title: "Video games.",
    body: "How I unwind after a long build. Good stories, good mechanics, the occasional rage quit.",
    tags: [],
  },
  {
    label: "Listening",
    title: "All kinds of music.",
    body: "I love all songs until I don't — then I go find new ones. Instruments fascinate me; learning one is next on the list.",
    tags: [],
  },
  {
    label: "Exploring",
    title: "Travel, nature, and rabbit holes.",
    body: "New places and fresh air with no laptop. At home: history, science and space documentaries I fall into at 1am.",
    tags: [],
  },
];

export default function HumanSide() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, SCROLL_REVEAL);
  const reduce = useReducedMotion();
  const from = reduce ? {} : { y: 14 };

  const [jokeIndex, setJokeIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setJokeIndex(Math.floor(Math.random() * DAD_JOKES.length));
    setReady(true);
  }, []);

  const joke = ready ? DAD_JOKES[jokeIndex] : "Hold on, while I think of a good one...";
  const cycleJoke = () => setJokeIndex((i) => (i + 1) % DAD_JOKES.length);

  return (
    <section ref={ref} className="section section-band">
      <div className="container-main">
        <m.p
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.45, ease: EASE }}
          className="eyebrow mb-6"
        >
          when not coding
        </m.p>

        <m.h2
          initial={{ opacity: 0, ...from }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
          className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] font-semibold text-text-primary mb-10"
        >
          What I like to do.
        </m.h2>

        <div className="grid gap-4 sm:grid-cols-2 overflow-x-clip">
          {HOBBIES.map((hobby, i) => (
            <m.div
              key={hobby.label}
              initial={{ opacity: 0, ...from }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.06 * i }}
              className="card flex flex-col gap-3 p-7"
            >
              <span className="eyebrow">{hobby.label}</span>
              <h3 className="text-[1.1rem] font-semibold text-text-primary">{hobby.title}</h3>
              <p className="text-[0.93rem] leading-relaxed text-text-secondary">{hobby.body}</p>
              {hobby.tags.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {hobby.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </m.div>
          ))}

          <m.div
            initial={{ opacity: 0, ...from }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, ...from }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.24 }}
            className="card group flex flex-col gap-4 border-accent/25 !bg-accent-subtle p-7 sm:col-span-2 sm:flex-row sm:items-center"
          >
            <div className="flex-1">
              <span className="eyebrow transition-colors duration-200 group-hover:text-white">dad joke free sample</span>
              <p className="mt-3 font-display text-[clamp(1.1rem,2vw,1.35rem)] leading-snug font-semibold text-text-primary">&ldquo;{joke}&rdquo;</p>
            </div>
            <button
              type="button"
              onClick={cycleJoke}
              aria-label="Show the next dad joke"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-accent/40 px-4 py-2 font-mono text-[0.72rem] font-semibold tracking-[0.08em] text-accent uppercase transition-colors duration-150 hover:bg-accent hover:text-accent-foreground sm:self-center"
            >
              another one
              <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:rotate-90">
                ↻
              </span>
            </button>
          </m.div>
        </div>
      </div>
    </section>
  );
}
