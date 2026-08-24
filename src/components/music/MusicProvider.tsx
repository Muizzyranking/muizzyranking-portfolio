"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/**
 * The playlist.
 */
export const MUSIC_TRACKS: { src: string; label: string; credit?: string }[] = [
  { src: "/audio/at-ease.mp3", label: "At ease - Hazelwood", credit: "https://freetouse.com/music" },
  { src: "/audio/day-off.mp3", label: "Day off - Tokyo music walker", credit: "https://www.chosic.com/free-music/all/" },
  { src: "/audio/enjoy.mp3", label: "Enjoy - Pufino", credit: "https://freetouse.com/music" },
  { src: "/audio/lovely.mp3", label: "Lovely - Alex Production", credit: "https://www.chosic.com/free-music/all/" },
  { src: "/audio/sunset-drive.mp3", label: "Sunset Drive - Tokyo Music Walker", credit: "https://www.chosic.com/free-music/all/" },
];

export type Playback = "stopped" | "playing" | "paused";
export type Panel = "closed" | "open" | "minimized";

type MusicContextValue = {
  playback: Playback;
  panel: Panel;
  trackIndex: number;
  volume: number;
  progress: { current: number; duration: number };
  togglePanel: () => void;
  setPanel: (p: Panel) => void;
  togglePlay: () => void;
  stop: () => void;
  selectTrack: (index: number) => void;
  cycleTrack: (dir: 1 | -1) => void;
  setVolume: (v: number) => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}

const VOLUME_KEY = "music-volume";

export default function MusicProvider({ children }: { children: React.ReactNode }) {
  const [playback, setPlayback] = useState<Playback>("stopped");
  const [panel, setPanel] = useState<Panel>("closed");
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolumeState] = useState(0.5);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackIndexRef = useRef(0);

  useEffect(() => {
    const stored = Number.parseFloat(localStorage.getItem(VOLUME_KEY) ?? "");
    const initial = Number.isFinite(stored) ? Math.min(1, Math.max(0, stored)) : 0.5;
    setVolumeState(initial);
    const audio = new Audio(MUSIC_TRACKS[0].src);
    audio.volume = initial;
    audio.preload = "none";
    // when a track ends, advance to the next one (wraps around).
    audio.addEventListener("ended", () => {
      const next = (trackIndexRef.current + 1) % MUSIC_TRACKS.length;
      trackIndexRef.current = next;
      setTrackIndex(next);
      audio.src = MUSIC_TRACKS[next].src;
      audio.play().catch(() => setPlayback("stopped"));
    });
    audio.addEventListener("timeupdate", () => {
      setProgress({ current: audio.currentTime, duration: audio.duration || 0 });
    });
    audio.addEventListener("loadedmetadata", () => {
      setProgress({ current: audio.currentTime, duration: audio.duration || 0 });
    });
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(() => {
    audioRef.current?.play().then(
      () => setPlayback("playing"),
      () => setPlayback("stopped"),
    );
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setProgress({ current: 0, duration: audio.duration || 0 });
    setPlayback("stopped");
    setPanel("closed");
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playback === "playing") {
      audio.pause();
      setPlayback("paused");
    } else {
      play();
    }
  }, [play, playback]);

  const togglePanel = useCallback(() => {
    setPanel((p) => (p === "open" ? "minimized" : "open"));
  }, []);

  /** Swap the audio source. Playing keeps playing; paused stays paused. */
  const switchTo = useCallback(
    (index: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const next = ((index % MUSIC_TRACKS.length) + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
      const wasPlaying = playback === "playing";
      trackIndexRef.current = next;
      setTrackIndex(next);
      setProgress({ current: 0, duration: 0 });
      audio.src = MUSIC_TRACKS[next].src;
      if (wasPlaying) play();
    },
    [play, playback],
  );

  const selectTrack = useCallback(
    (index: number) => {
      switchTo(index);
    },
    [switchTo],
  );

  const cycleTrack = useCallback(
    (dir: 1 | -1) => {
      switchTo(trackIndex + dir);
    },
    [switchTo, trackIndex],
  );

  const setVolume = useCallback((v: number) => {
    const clamped = Math.min(1, Math.max(0, v));
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
    localStorage.setItem(VOLUME_KEY, String(clamped));
  }, []);

  return (
    <MusicContext.Provider
      value={{
        playback,
        panel,
        trackIndex,
        volume,
        progress,
        togglePanel,
        setPanel,
        togglePlay,
        stop,
        selectTrack,
        cycleTrack,
        setVolume,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}
