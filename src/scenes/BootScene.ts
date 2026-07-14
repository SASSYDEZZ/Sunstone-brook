import Phaser from 'phaser';

/**
 * Loads shared assets before anything else runs. The prototype currently
 * generates all art procedurally, so this scene simply hands off to the
 * title screen — real asset loading lands with the Art Bible pipeline.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create(): void {
    this.scene.start('Title');
  }
}
