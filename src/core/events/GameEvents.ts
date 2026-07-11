/**
 * Central registry of engine/game event names and their payload types.
 *
 * Every cross-system event must be declared here so that producers and
 * consumers share one contract. Add new entries as systems appear
 * (e.g. 'building:placed', 'citizen:created' in later phases).
 */
export interface GameEvents extends Record<string, unknown> {
  /** Fired once the render loop is running. */
  'engine:started': { timestampMs: number };
  /** Fired after the render loop stops. */
  'engine:stopped': { timestampMs: number };
  /** Fired whenever the render surface is resized. */
  'engine:resized': { width: number; height: number };
  /** Fired after the active scene changes. */
  'scene:changed': { sceneKey: string };
}
