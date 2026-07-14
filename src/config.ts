export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

/**
 * The warm-luxury palette from the Art Bible (docs/MasterProjectBible.md).
 * Hand-painted storybook tones: brass, candlelight, deep mahogany, velvet.
 */
export const PALETTE = {
  night: 0x1a1410,
  mahogany: 0x3d2b1f,
  walnut: 0x54382a,
  velvet: 0x7a2e2e,
  brass: 0xd4a35b,
  candlelight: 0xf3d9a4,
  cream: 0xf7ecd9,
  sage: 0x8a9a6b,
} as const;

export const FONTS = {
  heading: 'Georgia, "Times New Roman", serif',
  body: 'Georgia, "Times New Roman", serif',
} as const;
