import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from './config';
import { BootScene } from './scenes/BootScene';
import { LobbyScene } from './scenes/LobbyScene';
import { TitleScene } from './scenes/TitleScene';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#1a1410',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, TitleScene, LobbyScene],
});
