import { GameEngine } from './core/GameEngine';
import { SandboxScene } from './rendering/scenes/SandboxScene';

/**
 * Application entry point: wire the engine to the DOM and boot the
 * initial scene. All real behavior lives in the engine layers.
 */
async function bootstrap(): Promise<void> {
  const canvas = document.getElementById('render-canvas');
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('LivingCityEngine: #render-canvas element not found');
  }

  const engine = new GameEngine(canvas);
  engine.registerScene(new SandboxScene());
  await engine.start('sandbox');

  // Expose a dispose hook for HMR so dev reloads don't leak WebGL contexts.
  if (import.meta.hot) {
    import.meta.hot.dispose(() => engine.dispose());
  }
}

bootstrap().catch((error) => {
  console.error('LivingCityEngine failed to start:', error);
});
