import Phaser from 'phaser';
import { FONTS, GAME_HEIGHT, GAME_WIDTH, PALETTE } from '../config';

const WALK_SPEED = 260;
const FLOOR_Y = 560;

/**
 * The first playable space: a procedurally drawn lobby where Elias can walk
 * between the entrance and the front desk. This is the seed of the v0.1.0
 * "Playable Lobby" milestone — layered painterly art replaces these shapes
 * once the art pipeline exists.
 */
export class LobbyScene extends Phaser.Scene {
  private elias!: Phaser.GameObjects.Container;
  private eliasBody!: Phaser.GameObjects.Graphics;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private deskHint!: Phaser.GameObjects.Text;

  constructor() {
    super('Lobby');
  }

  create(): void {
    this.drawRoom();
    this.drawFrontDesk();
    this.elias = this.createElias(220, FLOOR_Y);

    if (!this.input.keyboard) {
      throw new Error('Keyboard input is required for the lobby prototype');
    }
    this.cursors = this.input.keyboard.createCursorKeys();

    this.add
      .text(GAME_WIDTH / 2, 40, 'The Lobby — restoration pending', {
        fontFamily: FONTS.heading,
        fontSize: '28px',
        color: '#f3d9a4',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 28, 'Arrow keys to walk · ESC to return to the title', {
        fontFamily: FONTS.body,
        fontSize: '16px',
        color: '#8a7a5f',
      })
      .setOrigin(0.5);

    this.deskHint = this.add
      .text(930, 380, 'Mara Bell will greet guests here.', {
        fontFamily: FONTS.body,
        fontSize: '18px',
        fontStyle: 'italic',
        color: '#f7ecd9',
      })
      .setOrigin(0.5)
      .setAlpha(0);

    this.input.keyboard.once('keydown-ESC', () => {
      this.scene.start('Title');
    });
  }

  update(_time: number, delta: number): void {
    const dt = delta / 1000;
    let dx = 0;
    if (this.cursors.left.isDown) dx -= WALK_SPEED * dt;
    if (this.cursors.right.isDown) dx += WALK_SPEED * dt;

    this.elias.x = Phaser.Math.Clamp(this.elias.x + dx, 90, GAME_WIDTH - 90);
    if (dx !== 0) {
      // Flip only the body so the name label stays readable.
      this.eliasBody.setScale(dx < 0 ? -1 : 1, 1);
    }

    const nearDesk = Math.abs(this.elias.x - 930) < 140;
    this.deskHint.setAlpha(Phaser.Math.Linear(this.deskHint.alpha, nearDesk ? 1 : 0, 0.15));
  }

  private drawRoom(): void {
    const g = this.add.graphics();

    // Back wall with wainscoting.
    g.fillStyle(PALETTE.mahogany);
    g.fillRect(0, 0, GAME_WIDTH, FLOOR_Y);
    g.fillStyle(PALETTE.walnut);
    g.fillRect(0, 420, GAME_WIDTH, FLOOR_Y - 420);

    // Checkerboard marble floor.
    const tile = 80;
    for (let x = 0; x < GAME_WIDTH / tile; x++) {
      for (let y = 0; y < (GAME_HEIGHT - FLOOR_Y) / tile + 1; y++) {
        g.fillStyle((x + y) % 2 === 0 ? PALETTE.cream : PALETTE.night, 0.9);
        g.fillRect(x * tile, FLOOR_Y + y * tile, tile, tile);
      }
    }

    // Tall entrance doors, stage left.
    g.fillStyle(PALETTE.night);
    g.fillRect(120, 160, 150, 400);
    g.fillStyle(PALETTE.brass);
    g.fillRect(188, 340, 14, 60);

    // Windows letting in evening light.
    for (const wx of [420, 620]) {
      g.fillStyle(PALETTE.candlelight, 0.25);
      g.fillRect(wx, 140, 110, 260);
      g.lineStyle(6, PALETTE.walnut);
      g.strokeRect(wx, 140, 110, 260);
    }

    // Chandelier.
    g.fillStyle(PALETTE.brass);
    g.fillRect(GAME_WIDTH / 2 - 4, 0, 8, 90);
    g.fillEllipse(GAME_WIDTH / 2, 110, 180, 50);
    const chandelierGlow = this.add.ellipse(
      GAME_WIDTH / 2,
      120,
      340,
      120,
      PALETTE.candlelight,
      0.12,
    );
    this.tweens.add({
      targets: chandelierGlow,
      alpha: 0.2,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private drawFrontDesk(): void {
    const g = this.add.graphics();
    // Dark mahogany body so the desk reads against the walnut wainscoting.
    g.fillStyle(PALETTE.mahogany);
    g.fillRect(830, 440, 200, 120);
    g.lineStyle(3, PALETTE.night);
    g.strokeRect(830, 440, 200, 120);
    g.fillStyle(PALETTE.velvet);
    g.fillRect(844, 456, 172, 88);
    g.fillStyle(PALETTE.brass);
    g.fillRect(830, 432, 200, 8);

    // The guest ledger — the seed of the Persistent Guest Memory feature.
    g.fillStyle(PALETTE.cream);
    g.fillRect(900, 414, 60, 18);

    this.add
      .text(930, 500, 'FRONT DESK', {
        fontFamily: FONTS.heading,
        fontSize: '16px',
        color: '#d4a35b',
      })
      .setOrigin(0.5);
  }

  private createElias(x: number, y: number): Phaser.GameObjects.Container {
    const body = this.add.graphics();
    body.fillStyle(PALETTE.velvet);
    body.fillRect(-18, -90, 36, 70); // coat
    body.fillStyle(PALETTE.cream);
    body.fillCircle(0, -108, 16); // head
    body.fillStyle(PALETTE.night);
    body.fillRect(-18, -20, 14, 20); // legs
    body.fillRect(4, -20, 14, 20);

    const label = this.add
      .text(0, -140, 'Elias Vane', {
        fontFamily: FONTS.body,
        fontSize: '14px',
        color: '#f7ecd9',
      })
      .setOrigin(0.5);

    this.eliasBody = body;
    return this.add.container(x, y, [body, label]);
  }
}
