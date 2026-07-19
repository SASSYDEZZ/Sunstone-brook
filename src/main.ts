import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from './config';
import { BootScene } from './scenes/BootScene';
import { LobbyScene } from './scenes/LobbyScene';
import { TitleScene } from './scenes/TitleScene';

function startGame(): void {
  new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: '#1a2232',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [BootScene, TitleScene, LobbyScene],
  });
}

// Phaser rasterises text to the canvas, so the Brand Bible typefaces must be
// resident before the first scene draws — otherwise headings render in the
// serif fallback and never repaint. Wait for both faces (with a short guard
// so a slow/absent font load can never block the game from starting).
async function bootWithFonts(): Promise<void> {
  const fonts = document.fonts;
  if (fonts?.load) {
    try {
      await Promise.race([
        Promise.all([
          fonts.load('600 16px "Cinzel"'),
          fonts.load('400 16px "Lora"'),
          fonts.load('italic 400 16px "Lora"'),
        ]),
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]);
    } catch {
      // Fall through to the serif fallback rather than fail to boot.
    }
  }
  startGame();
}

void bootWithFonts();
