import { Engine } from '@babylonjs/core/Engines/engine';

import { DEFAULT_ENGINE_CONFIG, type EngineConfig } from './config/EngineConfig';
import { EventBus } from './events/EventBus';
import type { GameEvents } from './events/GameEvents';
import type { IScene } from './IScene';
import { SceneManager } from './SceneManager';

/**
 * Top-level engine lifecycle owner.
 *
 * Responsibilities (Core layer only — see ARCHITECTURE.md):
 *  - create and configure the Babylon `Engine`
 *  - own the shared `EventBus` and `SceneManager`
 *  - run the render loop and dispatch per-frame updates
 *  - react to resize / visibility changes
 *
 * It knows nothing about terrain, citizens, or gameplay; those layers
 * plug in as scenes and (later) systems.
 */
export class GameEngine {
  readonly events = new EventBus<GameEvents>();
  readonly config: EngineConfig;

  private readonly engine: Engine;
  private readonly sceneManager: SceneManager;
  private running = false;

  private readonly handleResize = (): void => {
    this.engine.resize();
    this.events.emit('engine:resized', {
      width: this.engine.getRenderWidth(),
      height: this.engine.getRenderHeight(),
    });
  };

  constructor(
    private readonly canvas: HTMLCanvasElement,
    config: Partial<EngineConfig> = {},
  ) {
    this.config = { ...DEFAULT_ENGINE_CONFIG, ...config };

    this.engine = new Engine(canvas, this.config.antialias, {
      // Survive brief GPU resets on mobile instead of white-screening.
      doNotHandleContextLost: false,
      powerPreference: 'high-performance',
      stencil: true,
    });

    // Cap the resolution on high-DPR phones: rendering at DPR 3 costs
    // ~2.25x the pixels of DPR 2 with little visible benefit.
    const effectiveRatio = Math.min(window.devicePixelRatio || 1, this.config.maxPixelRatio);
    this.engine.setHardwareScalingLevel(1 / effectiveRatio);

    this.sceneManager = new SceneManager({
      engine: this.engine,
      canvas: this.canvas,
      events: this.events,
      config: this.config,
    });
  }

  registerScene(scene: IScene): void {
    this.sceneManager.register(scene);
  }

  /** Build the given scene and start the render loop. */
  async start(initialSceneKey: string): Promise<void> {
    await this.sceneManager.switchTo(initialSceneKey);

    window.addEventListener('resize', this.handleResize);

    this.engine.runRenderLoop(() => {
      const scene = this.sceneManager.activeBabylonScene;
      if (!scene) {
        return;
      }
      this.sceneManager.update(this.engine.getDeltaTime() / 1000);
      scene.render();
    });

    this.running = true;
    this.events.emit('engine:started', { timestampMs: performance.now() });
  }

  stop(): void {
    if (!this.running) {
      return;
    }
    this.engine.stopRenderLoop();
    window.removeEventListener('resize', this.handleResize);
    this.running = false;
    this.events.emit('engine:stopped', { timestampMs: performance.now() });
  }

  dispose(): void {
    this.stop();
    this.sceneManager.dispose();
    this.events.clear();
    this.engine.dispose();
  }
}
