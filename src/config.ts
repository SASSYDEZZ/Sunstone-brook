export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

/**
 * The official Vane Grand Hotel palette, synced to the locked Brand Bible.
 * These ten swatches are the single source of colour truth — every scene,
 * prop, and UI element draws from them so code and painted art stay aligned.
 * (Earlier builds carried eyeballed approximations; those are retired here.)
 */
export const BRAND = {
  // Primary — warm & inviting
  ivory: 0xf3e9d6,
  warmCream: 0xead7b8,
  brassGold: 0xc7a35a,
  antiqueBronze: 0x7a6338,
  walnut: 0x5b3a22,
  // Accent
  burgundy: 0x7a1f2b,
  forestGreen: 0x1f3b2e,
  deepTeal: 0x12325e,
  midnightBlue: 0x1a2232,
  slateGray: 0x6a6b70,
} as const;

/**
 * Semantic aliases used by the prototype scenes, mapped onto the official
 * Brand Bible swatches above. New code should prefer a semantic role here;
 * if none fits, reach for a named BRAND swatch rather than a raw hex.
 */
export const PALETTE = {
  night: BRAND.midnightBlue, // deepest backgrounds, shadow
  mahogany: BRAND.walnut, // dark wall wood, desk body
  walnut: BRAND.antiqueBronze, // lighter wainscoting, furniture
  velvet: BRAND.burgundy, // upholstery, Elias's placeholder coat
  brass: BRAND.brassGold, // fixtures, accents (never chrome)
  candlelight: BRAND.warmCream, // light sources, warm glow, headings
  cream: BRAND.ivory, // marble, parchment, body text
  sage: BRAND.forestGreen, // plants, foliage
} as const;

/**
 * CSS colour strings for Phaser text styles, which take `#rrggbb` rather
 * than the numeric form Graphics uses. Kept in lockstep with PALETTE.
 */
export const TEXT_COLOR = {
  heading: '#f3e9d6', // ivory
  candlelight: '#ead7b8', // warm cream — warm marquee/heading glow
  brass: '#c7a35a', // brass gold — subtitles, labels
  body: '#f3e9d6', // ivory — body copy
  walnut: '#5b3a22', // walnut — footer / recessed text
  muted: '#6a6b70', // slate gray — secondary hints
} as const;

/**
 * Typography from the Brand Bible: Cinzel SemiBold for headings/signage,
 * Lora for body. Both are self-hosted (see index.html @font-face) — no CDN,
 * CSP-safe — with a serif stack as the fallback while they load.
 */
export const FONTS = {
  heading: '"Cinzel", "Times New Roman", serif',
  body: '"Lora", Georgia, "Times New Roman", serif',
} as const;
