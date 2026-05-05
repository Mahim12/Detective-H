import Phaser from 'phaser';
import { enable3d, Canvas } from '@enable3d/phaser-extension';
import ThreeScene from './ThreeScene.js';
import RandomUmbrella from './RandomUmbrella.js';
import MainScene from './MainScene.js';
import SuspectScene from './SuspectScene.js';

const config = {
  type: Phaser.WEBGL,
  transparent: true,
  backgroundColor: '#00000000',
  parent: 'app',
  // --- THIS BLOCK IS NEEDED FOR FLIPBOOK BECAUSE WE ARE USING FLIPBOOK-JS.JS ---
  dom: {
    createContainer: true,
  },
  // ---------------------------------------------
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
  },

  // Pass the classes directly
  scene: [RandomUmbrella, MainScene, SuspectScene, ThreeScene],
  ...Canvas(),
};

new Phaser.Game(config);
