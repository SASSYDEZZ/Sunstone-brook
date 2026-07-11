# LivingCityEngine

A modular, mobile-first city simulation engine built with **TypeScript**,
**Babylon.js**, and **Vite**.

This repository hosts the engine implementation. The project vision,
architecture, and roadmap are documented in the LivingCityEngine design
docs (`AGENTS.md`, `ARCHITECTURE.md`, `GAME_DESIGN.md`, `ROADMAP.md`,
`AI_STUDIO.md` in the [LivingCityEngine](https://github.com/SASSYDEZZ/LivingCityEngine) repository).

## Quick start

```bash
npm install
npm run dev
```

Then open the printed URL. Full instructions, project structure, and
Sprint 1 design decisions: **[docs/SETUP.md](docs/SETUP.md)**.

## Status

**Sprint 1 — Foundation** (Phase 1 of the roadmap):

- ✅ TypeScript (strict) + Vite project setup
- ✅ Babylon.js integration with tree-shaken imports
- ✅ Layered folder structure (`core` / `rendering` / `world` / `simulation` / `gameplay` / `ui`)
- ✅ Engine lifecycle: `GameEngine`, `SceneManager`, typed `EventBus`
- ✅ First runnable scene (`SandboxScene`) with orbit/touch camera
- ✅ Mobile-first defaults: pixel-ratio cap, fullscreen touch canvas

No gameplay systems yet — by design. See `ROADMAP.md` for what comes next.
