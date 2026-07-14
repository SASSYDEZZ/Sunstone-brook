# The Vane Grand Hotel — Master Project Bible

> **This document is the repository's single source of truth.**
> All future design, story, art, and technical decisions are recorded here first.
> The other files in `docs/` are satellite documents that expand on sections below.

---

## 1. Studio

- **Studio Name:** TriandTru Games
- **Motto:** _Every guest has a story. Every room has a purpose. Every player leaves with a memory._
- **Philosophy:** Create games with heart, memorable characters, lived-in worlds, and craftsmanship.

---

## 2. Project Overview

- **Title:** The Vane Grand Hotel
- **Genre:** Cozy narrative hotel management simulator · story-rich tycoon · life simulation · emotional management game
- **Launch platforms:**
  1. Browser prototype — Vite + TypeScript + Phaser 3 _(this repository)_
  2. Mobile — Unity
  3. Future — Roblox
  4. Possible — Fortnite/UEFN social experience

### Core Vision

Ship a **complete premium game at Version 1.0**. Post-launch content expands the
world with new stories rather than finishing an incomplete game. Players should
finish the story feeling satisfied, then continue managing the hotel forever.

### Guiding Principle

**Build a hotel players wish existed in real life.**

---

## 3. Game Design (GDD)

### Gameplay Pillars

1. **Restore** — bring the hotel back to life, room by room
2. **Build** — expand the hotel across multiple wings
3. **Decorate** — furnish and personalize every space
4. **Guest Memories** — the signature feature (see below)
5. **Staff Relationships** — staff grow, bond, and remember
6. **Story Choices** — player decisions shape the narrative
7. **Multiple Endings** — choices matter at the finale
8. **Endless Hotel Mode** — the hotel stays open after the credits

### Signature Feature: Persistent Guest Memory

Important guests remember:

- favorite rooms
- meals
- previous visits
- conversations
- milestones

**The hotel remembers them too.** In the prototype, the guest ledger at the
front desk is the visual anchor for this system.

---

## 4. Story Bible

### Player Character

- **Elias Vane** — inheritor and restorer of the Vane Grand Hotel

### Major Characters

| Character     | Role notes                          |
| ------------- | ----------------------------------- |
| Mara Bell     | Front desk / heart of the hotel     |
| Ivy           | TBD                                 |
| Theo Grant    | TBD                                 |
| Oliver Finch  | TBD                                 |
| Arthur Vane I | Founder; his legacy drives the plot |

### Major Story Beats

1. Restore the Vane Grand Hotel
2. Discover the Five Keys
3. Multiple hotel expansions
4. Room Zero
5. Complete ending
6. Young Traveler arrives
7. Endless mode begins

---

## 5. Art Bible

- **Style:** Hand-painted storybook; painterly 2D with layered depth/parallax; warm luxury; cozy cinematic lighting
- **Inspirations (tone only):** Ni no Kuni, Spiritfarer, Grand Budapest Hotel, historic luxury hotels
- **Prototype palette** (mirrored in `src/config.ts`):

| Name        | Hex       | Use                       |
| ----------- | --------- | ------------------------- |
| night       | `#1a1410` | Deep shadows, backgrounds |
| mahogany    | `#3d2b1f` | Walls, wood               |
| walnut      | `#54382a` | Wainscoting, furniture    |
| velvet      | `#7a2e2e` | Upholstery, Elias's coat  |
| brass       | `#d4a35b` | Fixtures, accents         |
| candlelight | `#f3d9a4` | Light sources, headings   |
| cream       | `#f7ecd9` | Marble, text, highlights  |
| sage        | `#8a9a6b` | Plants, garden accents    |

---

## 6. UI/UX Bible

- Serif typography (Georgia family in the prototype) for the storybook feel
- Gentle pulsing/fading tweens instead of hard cuts
- Diegetic anchors where possible (the ledger _is_ the memory UI)

---

## 7. Technical Architecture

### Prototype stack (this repo)

- **Vite** — dev server and bundler
- **TypeScript** — strict mode
- **Phaser 3** — game engine
- **Howler.js** — audio (not yet wired in)
- **ESLint + Prettier** — code quality

### Hosting

- GitHub (source), Vercel (deployment)

### Later

- Unity port for mobile
- Cloud saves

### Scene flow (current)

```
BootScene → TitleScene → LobbyScene
```

---

## 8. Production Roadmap

| Milestone | Deliverable            | Status         |
| --------- | ---------------------- | -------------- |
| v0.0.1    | Project Initialization | ✅ this commit |
| v0.1.0    | Playable Lobby         | in progress    |
| v0.2.0    | Guest Check-In         | planned        |
| v0.3.0    | Room Restoration       | planned        |
| v0.5.0    | Vertical Slice         | planned        |
| v0.8.0    | Alpha                  | planned        |
| v0.9.0    | Beta                   | planned        |
| v1.0.0    | Launch                 | planned        |

### Development Philosophy

- Every milestone ends with something playable.
- **Nothing merges into main unless it runs.**

---

## 9. Live Service Roadmap (post-1.0)

Base Game (Book One) → Credits → Hotel stays open → Seasonal Events →
Major Expansions → New Hotels → Community Features

---

## 10. Economy, Audio, World Bible

_To be drafted. Update this document first, then expand into satellite docs._
