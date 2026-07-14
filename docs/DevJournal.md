# Dev Journal — The Vane Grand Hotel

## 2026-07-14 — v0.0.1 Project Initialization

- Scaffolded the browser prototype: Vite + TypeScript (strict) + Phaser 3, with
  Howler.js, ESLint, and Prettier per the Technical Architecture.
- Established `docs/MasterProjectBible.md` as the single source of truth,
  consolidating the project handoff (v0.1).
- First playable: Boot → Title → Lobby scene flow. The lobby is drawn
  procedurally in the warm-luxury palette — checkerboard marble, chandelier
  with breathing glow, entrance doors, and the front desk with the guest
  ledger (the seed of Persistent Guest Memory). Elias Vane can walk the floor
  with the arrow keys; approaching the desk reveals a hint about Mara Bell.
- Honored the studio rule: verified `npm run build` and `npm run lint` pass
  before committing.

Next up (v0.1.0 Playable Lobby): parallax layers, first Mara Bell dialogue,
ambient audio via Howler.
