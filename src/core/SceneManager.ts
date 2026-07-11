import type { Scene } from '@babylonjs/core/scene';

import type { IScene, SceneContext } from './IScene';

/**
 * Owns the set of registered scenes and which one is active.
 *
 * Only one scene is live at a time: switching disposes the previous
 * scene completely so memory is reclaimed — important on mobile.
 */
export class SceneManager {
  private readonly scenes = new Map<string, IScene>();
  private active: { scene: IScene; babylonScene: Scene } | null = null;

  constructor(private readonly context: SceneContext) {}

  register(scene: IScene): void {
    if (this.scenes.has(scene.key)) {
      throw new Error(`[SceneManager] scene "${scene.key}" is already registered`);
    }
    this.scenes.set(scene.key, scene);
  }

  async switchTo(key: string): Promise<void> {
    const next = this.scenes.get(key);
    if (!next) {
      throw new Error(`[SceneManager] unknown scene "${key}"`);
    }

    if (this.active) {
      this.active.scene.dispose();
      this.active.babylonScene.dispose();
      this.active = null;
    }

    const babylonScene = await next.create(this.context);
    this.active = { scene: next, babylonScene };
    this.context.events.emit('scene:changed', { sceneKey: key });
  }

  /** The Babylon scene currently being rendered, if any. */
  get activeBabylonScene(): Scene | null {
    return this.active?.babylonScene ?? null;
  }

  update(deltaSeconds: number): void {
    this.active?.scene.update(deltaSeconds);
  }

  dispose(): void {
    if (this.active) {
      this.active.scene.dispose();
      this.active.babylonScene.dispose();
      this.active = null;
    }
    this.scenes.clear();
  }
}
