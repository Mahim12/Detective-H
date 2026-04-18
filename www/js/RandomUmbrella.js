import Phaser from 'phaser';

// Group your logic into a constant object
// Write all phaser logic in pure functions that take the scene as an argument.
// Do not use 'this' in these functions, as they are not class methods.
const Logic = {
    preload: (scene) => {
        scene.load.image('logo', 'assets/sceneOne/logo.png');
    },
    create: (scene) => {
        const cam = scene.cameras.main;
        scene.add.image(cam.centerX, cam.centerY, "logo");
        
        scene.time.delayedCall(2000, () => {
            scene.scene.start("MainScene");
        });
    }
};

/**
 * WRAPPER CLASS FOR PHASER SCENE
 * This class is what Phaser interacts with, it calls the pure logic functions defined above.
 * This separation allows for functional programming while keeping Phaser's class-based structure intact.
 */
export default class RandomUmbrella extends Phaser.Scene {
    constructor() {
        super('RandomUmbrella');
    }

    preload() {
        Logic.preload(this); // Logic's preload
    }

    create() {
        Logic.create(this); // Logic's create
    }
}