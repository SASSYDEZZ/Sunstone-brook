# The Vane Grand Hotel

> Every guest has a story. Every room has a purpose. Every player leaves with a memory.

A cozy narrative hotel management simulator by **TriandTru Games**. Restore the
Vane Grand Hotel as Elias Vane, meet guests who remember you (and whom the
hotel remembers), and keep the doors open forever after the story ends.

This repository holds the **browser prototype** built with Vite + TypeScript +
Phaser 3. The single source of truth for design, story, art, and tech is
[`docs/MasterProjectBible.md`](docs/MasterProjectBible.md).

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check and produce a production build in dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint
npm run format   # Prettier
```

## Current state — v0.0.1 Project Initialization

Boot → Title → Lobby. Press SPACE on the title screen, then walk Elias around
the lobby with the arrow keys. Approach the front desk to find the guest
ledger — the seed of the Persistent Guest Memory feature.

## Development philosophy

- Every milestone ends with something playable.
- Nothing merges into main unless it runs.

See the [production roadmap](docs/MasterProjectBible.md#8-production-roadmap)
for milestones, and [`docs/DevJournal.md`](docs/DevJournal.md) for progress notes.
