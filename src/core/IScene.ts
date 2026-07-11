import type { Engine } from '@babylonjs/core/Engines/engine';
import type { Scene } from '@babylonjs/core/scene';

import type { EngineConfig } from './config/EngineConfig';
import type { EventBus } from './events/EventBus';
import type { GameEvents } from './events/GameEvents';

/** Everything a scene needs from the engine, injected at creation time. */
export interface SceneContext {
  readonly engine: Engine;
  readonly canvas: HTMLCanvasElement;
  readonly events: EventBus<GameEvents>;
  readonly config: EngineConfig;
}

/**
 * Contract every game scene implements.
 *
 * The SceneManager drives the lifecycle: `create` once when the scene
 * becomes active, `update` every frame, `dispose` when it is replaced.
 */
export interface IScene {
  /** Unique key used to register and switch to this scene. */
  readonly key: string;

  /** Build the Babylon scene graph. May be async for asset loading. */
  create(context: SceneContext): Promise<Scene> | Scene;

  /** Per-frame logic. `deltaSeconds` is the time since the last frame. */
  update(deltaSeconds: number): void;

  /** Release all resources owned by the scene. */
  dispose(): void;
}
