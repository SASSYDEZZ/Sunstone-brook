import Phaser from 'phaser';
import { FONTS, GAME_HEIGHT, GAME_WIDTH, PALETTE } from '../config';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create(): void {
    const cx = GAME_WIDTH / 2;

    this.add.rectangle(cx, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, PALETTE.night);

    // Warm glow behind the marquee, like the hotel's facade lamps at dusk.
    const glow = this.add.circle(cx, 250, 320, PALETTE.brass, 0.08);
    this.tweens.add({
      targets: glow,
      alpha: 0.16,
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.add
      .text(cx, 190, 'THE VANE GRAND HOTEL', {
        fontFamily: FONTS.heading,
        fontSize: '64px',
        color: '#f3d9a4',
      })
      .setOrigin(0.5);

    this.add
      .text(cx, 265, 'Every guest has a story. Every room has a purpose.', {
        fontFamily: FONTS.body,
        fontSize: '22px',
        fontStyle: 'italic',
        color: '#d4a35b',
      })
      .setOrigin(0.5);

    const prompt = this.add
      .text(cx, 480, 'Press SPACE or click to step inside', {
        fontFamily: FONTS.body,
        fontSize: '24px',
        color: '#f7ecd9',
      })
      .setOrigin(0.5);
    this.tweens.add({
      targets: prompt,
      alpha: 0.35,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.add
      .text(cx, GAME_HEIGHT - 40, 'TriandTru Games — prototype v0.0.1', {
        fontFamily: FONTS.body,
        fontSize: '16px',
        color: '#54382a',
      })
      .setOrigin(0.5);

    const enter = (): void => {
      this.scene.start('Lobby');
    };
    this.input.keyboard?.once('keydown-SPACE', enter);
    this.input.once('pointerdown', enter);
  }
}
