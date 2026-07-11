/**
 * Engine-wide configuration.
 *
 * Values live here instead of being hardcoded inside systems so that
 * platform tuning (e.g. lowering pixel ratio on weak devices) can be
 * done in one place, or eventually loaded from JSON.
 */
export interface EngineConfig {
  /** Enable MSAA on the default framebuffer. */
  readonly antialias: boolean;
  /**
   * Upper bound applied to `window.devicePixelRatio`. Modern phones
   * report DPRs of 3+, which quadruples fill-rate cost for little
   * visual gain; capping keeps the 60 FPS mobile target reachable.
   */
  readonly maxPixelRatio: number;
  /** Scene clear color as linear RGB (0–1 per channel). */
  readonly clearColor: { readonly r: number; readonly g: number; readonly b: number };
}

export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  antialias: true,
  maxPixelRatio: 2,
  clearColor: { r: 0.055, g: 0.102, b: 0.141 },
};
