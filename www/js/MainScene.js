import Phaser from 'phaser';


// Group your logic into a constant object
// Write all phaser logic in pure functions that take the scene as an argument.
// Do not use 'this' in these functions, as they are not class methods.
const Logic = {
    preload: (scene) => {
        scene.load.image('background', 'assets/background.png');
    },
    create: (scene) => {
        const cam = scene.cameras.main;
        scene.add.image(cam.centerX, cam.centerY, "background");
    }
};


/**
 * WRAPPER CLASS FOR PHASER SCENE
 * This class is what Phaser interacts with, and it calls the pure logic functions defined above.
 * This separation allows for functional programming while keeping Phaser's class-based structure intact.
 */
export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }
    preload() {
        Logic.preload(this); // Logic's preload
    }

    create() {
        Logic.create(this); // Logic's create
    }
}