# Spotify Playlists — Setup Guide

A draft feature exists at `src/components/sections/homepage/SpotifyPlaylists.tsx`.
It is **not mounted anywhere** yet. This file explains how to connect your
Spotify account and turn the draft into a live "On rotation" section.

## What the draft expects

A `GET /api/spotify/playlists` endpoint returning:

```json
{
  "playlists": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "image": "https://... | null",
      "tracks": 12,
      "url": "https://open.spotify.com/playlist/..."
    }
  ]
}
```

The component already handles loading skeletons, error and empty states.

## Setup

### 1. Create a Spotify Developer app

1. Go to <https://developer.spotify.com/dashboard> and log in.
2. **Create app**. Name it anything (e.g. `portfolio`).
3. Add redirect URI: `http://localhost:3000/api/spotify/callback`
   (add your production URL too later, e.g. `https://muizzyranking.me/api/spotify/callback`).
4. Check **Web API** under "Which API/SDKs are you planning to use?".
5. Save — you get a **Client ID** and **Client secret**.

### 2. Get a refresh token (one-time, manual)

Spotify's Client Credentials flow can't read *your* personal playlists — you
need your own user token. Easiest path:

1. In the Developer Dashboard, open your app → **Use this app for testing**
   (or use any OAuth playground).
2. Visit this URL in a browser (fill in your client id, and make sure the
   redirect URI matches the app settings):

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/api/spotify/callback&scope=playlist-read-private%20playlist-read-collaborative
```

3. Log in and approve. You'll be redirected to your callback URL with a
   `?code=...` parameter. Copy that code.
4. Exchange it for a refresh token:

```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=THE_CODE_YOU_COPIED&redirect_uri=http://localhost:3000/api/spotify/callback&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET"
```

The response contains `refresh_token`. That value is the durable one — it
doesn't expire unless you revoke access.

### 3. Environment variables

Add to `.env.local` (never commit this file):

```
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

For production, set the same vars in your hosting dashboard.

### 4. The API route

Create `src/app/api/spotify/playlists/route.ts` along these lines:

```ts
import fs from "node:fs";
import { NextResponse } from "next/server";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1/me/playlists?limit=6";

let cached: { at: number; data: unknown } | null = null;
const HOUR = 1000 * 60 * 60;

async function accessToken(): Promise<string> {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=refresh_token&refresh_token=" + process.env.SPOTIFY_REFRESH_TOKEN,
  });
  const json = await res.json();
  return json.access_token;
}

export async function GET() {
  if (cached && Date.now() - cached.at < HOUR) {
    return NextResponse.json(cached.data);
  }
  try {
    const token = await accessToken();
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    const data = {
      playlists: (json.items ?? []).map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description ?? "",
        image: p.images?.[0]?.url ?? null,
        tracks: p.tracks?.total ?? 0,
        url: p.external_urls?.spotify ?? `https://open.spotify.com/playlist/${p.id}`,
      })),
    };
    cached = { at: Date.now(), data };
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ playlists: [] }, { status: 502 });
  }
}
```

Notes:

- The access token is refreshed server-side on every cold fetch; the response
  is cached in memory for an hour so you stay far under rate limits.
- `any` on `json.items` — type it properly when you wire it up (biome will
  remind you).

### 5. Mount it

In `src/app/page.tsx` (or wherever you want it):

```tsx
import SpotifyPlaylists from "@/components/sections/homepage/SpotifyPlaylists";

// inside the page, e.g. between BlogTeaser and Contact:
<SpotifyPlaylists />
```

Optionally pass a heading: `<SpotifyPlaylists heading="What I'm listening to." />`.

## Future ideas

- "Currently playing" via `/v1/me/player/currently-playing` — a live
  now-playing chip in the navbar next to the music icon.
- Top tracks instead of playlists (`/v1/me/top/tracks`).
- A dedicated `/music` page combining the ambient player + Spotify data.
