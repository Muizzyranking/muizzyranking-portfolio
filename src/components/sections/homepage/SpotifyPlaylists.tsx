"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Playlist = {
  id: string;
  name: string;
  description: string;
  image: string | null;
  tracks: number;
  url: string;
};

type State = { status: "loading" } | { status: "error"; message: string } | { status: "ready"; playlists: Playlist[] };

function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <a
      href={playlist.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group card flex min-w-0 flex-col overflow-hidden transition-[border-color,box-shadow] duration-200 hover:border-accent/40 hover:shadow-[var(--shadow-lifted)]"
    >
      <div className="relative aspect-square w-full overflow-hidden border-b border-border-subtle bg-bg-elevated">
        {playlist.image ? (
          <Image
            src={playlist.image}
            alt={`${playlist.name} cover`}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-text-muted/50"
              aria-hidden="true"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        <p className="truncate font-display text-[1rem] font-bold text-text-primary transition-colors duration-150 group-hover:text-accent">
          {playlist.name}
        </p>
        {playlist.description && <p className="line-clamp-2 text-[0.82rem] leading-relaxed text-text-secondary">{playlist.description}</p>}
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-text-muted">{playlist.tracks} tracks · Spotify ↗</p>
      </div>
    </a>
  );
}

export default function SpotifyPlaylists({ heading = "On rotation." }: { heading?: string }) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    fetch("/api/spotify/playlists")
      .then((res) => {
        if (!res.ok) throw new Error(`Spotify API returned ${res.status}`);
        return res.json() as Promise<{ playlists: Playlist[] }>;
      })
      .then((data) => setState({ status: "ready", playlists: data.playlists }))
      .catch((e: Error) => setState({ status: "error", message: e.message }));
  }, []);

  return (
    <section className="section section-band">
      <div className="container-main">
        <p className="eyebrow mb-6">soundtrack</p>
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.12] font-bold text-text-primary mb-10">{heading}</h2>

        {state.status === "loading" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="card overflow-hidden">
                <div className="aspect-square w-full animate-pulse bg-bg-elevated" />
                <div className="flex flex-col gap-2 p-5">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-bg-elevated" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-bg-elevated" />
                </div>
              </div>
            ))}
          </div>
        )}

        {state.status === "error" && (
          <p className="font-mono text-[0.78rem] text-text-muted">
            Playlists unavailable right now <span className="text-text-muted/60">({state.message})</span>.
          </p>
        )}

        {state.status === "ready" && state.playlists.length === 0 && (
          <p className="font-mono text-[0.78rem] text-text-muted">No public playlists yet.</p>
        )}

        {state.status === "ready" && state.playlists.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-x-clip">
            {state.playlists.map((p) => (
              <PlaylistCard key={p.id} playlist={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
