# LivingCityEngine — Setup Guide

This guide covers getting the project running locally, on a phone for
real-device testing, and building for production.

## Prerequisites

- **Node.js 20+** (developed against Node 22)
- **npm 10+** (bundled with Node)
- A browser with WebGL2 support (all modern desktop and mobile browsers)

## Install

```bash
npm install
```

## Run the dev server

```bash
npm run dev
```

Vite prints a local URL (default `http://localhost:5173`). Open it in a
browser — you should see the Sprint 1 sandbox scene: a ground plane, a
grid of placeholder blocks, and a rotating orange beacon at the origin.

### Controls

| Input | Action |
| --- | --- |
| Left-drag / one-finger drag | Orbit the camera |
| Mouse wheel / two-finger pinch | Zoom |
| Right-drag / two-finger drag | Pan |

### Testing on a phone

The dev server listens on all network interfaces (`server.host: true`).
With your phone on the same network, open `http://<your-machine-ip>:5173`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot module reload |
| `npm run build` | Typecheck (strict) then produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Run the TypeScript compiler with no emit |

A build is only considered good if `npm run build` passes — it runs the
strict typecheck first.

## Project structure

```
index.html              Entry page: fullscreen canvas + viewport/PWA meta
public/                 Static assets served as-is
src/
  main.ts               Bootstrap: wires GameEngine to the DOM
  style.css             Fullscreen canvas + mobile gesture handling
  core/                 Engine lifecycle, scene management, events, config
    GameEngine.ts       Owns the Babylon Engine, render loop, resize
    SceneManager.ts     Registers scenes; one active scene at a time
    IScene.ts           Contract every scene implements
    config/             EngineConfig (pixel-ratio cap, clear color, …)
    events/             Typed EventBus + GameEvents registry
  rendering/            Visuals: scenes, cameras, lighting, materials
    scenes/SandboxScene.ts   Sprint 1 runnable scene
  world/                (reserved — Phase 2: terrain, weather, day/night)
  simulation/           (reserved — Phase 4: citizens, economy, traffic)
  gameplay/             (reserved — Phase 3: buildings, roads, zoning)
  ui/                   (reserved — menus, HUD, touch controls)
docs/                   Project documentation
```

The layer boundaries mirror `ARCHITECTURE.md`. Systems communicate
through the typed `EventBus` (`src/core/events/`) rather than direct
references; every cross-system event is declared in `GameEvents.ts`.

## Mobile performance notes (Sprint 1 decisions)

- **Pixel-ratio cap** — `EngineConfig.maxPixelRatio` (default `2`)
  bounds the render resolution on high-DPR phones via
  `setHardwareScalingLevel`; DPR 3 rendering costs ~2.25× the pixels of
  DPR 2 with little visual gain.
- **Tree-shaken Babylon imports** — all engine code imports from deep
  `@babylonjs/core/...` paths, keeping the vendor chunk at ~324 KB
  gzipped instead of the multi-megabyte full bundle.
- **Vendor chunk splitting** — Babylon.js ships in its own chunk so
  browsers cache it across app updates (`vite.config.ts`).
- **Scene disposal** — `SceneManager` fully disposes the previous scene
  on switch so GPU/CPU memory is reclaimed.
- **Touch-first canvas** — `touch-action: none`, no page scrolling or
  rubber-banding; Babylon receives all gestures.

## What Sprint 1 deliberately does NOT include

No gameplay systems: no terrain generation, citizens, economy, building
placement, or UI. Those arrive in the phases defined in `ROADMAP.md`.
PWA packaging (manifest + service worker) is also deferred; the HTML
meta tags are already mobile-app friendly so it can be layered on
without restructuring.
