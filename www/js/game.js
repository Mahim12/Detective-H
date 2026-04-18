import Phaser from 'phaser';
import { enable3d, Canvas } from '@enable3d/phaser-extension';
import ThreeScene from './ThreeScene.js';
import RandomUmbrella from './RandomUmbrella.js';
import MainScene from './MainScene.js';

const config = {
    type: Phaser.WEBGL,
    backgroundColor: '#000000', 
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    // Pass the classes directly
    scene: [RandomUmbrella, MainScene, ThreeScene],
    ...Canvas()
};

// This is the most stable way to initialize without the WASM crash
new Phaser.Game(config);