# Dev Journal — The Vane Grand Hotel

## 2026-07-18 — Brand identity foundation (palette + typography)

- Synced `src/config.ts` to the **official Brand Bible palette** — the ten
  locked swatches (Ivory, Warm Cream, Brass Gold, Antique Bronze, Walnut;
  Burgundy, Forest Green, Deep Teal, Midnight Blue, Slate Gray) now live as
  the `BRAND` map, with `PALETTE` keeping the prototype's semantic scene roles
  as aliases onto it. Retired the eyeballed approximate colours.
- Introduced a `TEXT_COLOR` map so Phaser text styles pull from the official
  palette instead of scattered hex literals; updated the Title and Lobby
  scenes to use it. Background night is now the official Midnight Blue.
- Vendored the Brand Bible typefaces **Cinzel** SemiBold and **Lora**
  (regular + italic) as self-hosted WOFF2 in `public/fonts/` — no external
  CDN, CSP-safe — wired via `@font-face` in `index.html`, replacing Georgia.
  `main.ts` now waits on the CSS Font Loading API (with a 3s guard) before
  starting Phaser so headings never render in the serif fallback.
- Verified `npm run lint` and `npm run build` pass; confirmed Vite copies the
  fonts into `dist/fonts/`.

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
