import Phaser from 'phaser';

//The Flipbook-js library manipulates DOM not the canvas
import FlipBook from 'flipbook-js';
import 'flipbook-js/style.css'; // Don't forget the CSS!

/**
 * This imports the literal text from the suspect.html file that gets passed into JS
 * It's the code for flipbook
 */
import suspectHTML from './suspect.html?raw';

/**
 * Group the logic into a constant object
 * Write all phaser logic in pure functions that take the scene as an argument.
 * Do not use 'this' in these functions, as they are not class methods.
 */
const Logic = {
  preload: (scene) => {
    scene.load.image('background', 'assets/NEW.png');
  },

  create(scene) {
    const cam = scene.cameras.main;
    scene.add.image(cam.centerX, cam.centerY, 'background');

    const magazine = scene.add.dom(960, 540).createFromHTML(suspectHTML);
    magazine.setOrigin(0.5);

    // 2. Initialize with a tiny delay to let the DOM "settle"
    scene.time.delayedCall(50, () => {
      const book = new FlipBook('detective-book', {
        width: '1000px',
        height: '600px',
        canClose: true,
        arrowKeys: true,
        initialCall: false,
        initialActivePage: 0,
      });

      book.turnPage(0);

      const wrapper = document.getElementById('book-wrapper');
      if (wrapper) {
        wrapper.style.display = 'block';

        // 1. Tell Phaser the HTML now has a real size
        magazine.updateSize();
        // 2. Re-apply the center origin now that the size is known
        magazine.setOrigin(0.5);
      }

      window.activeBook = book;
    });
  },
};

/**
 * WRAPPER CLASS FOR PHASER SCENE
 * This class is what Phaser interacts with, it calls the pure logic functions defined above.
 * This separation allows for functional programming while keeping Phaser's class-based structure intact.
 */
export default class SuspectScene extends Phaser.Scene {
  constructor() {
    super('SuspectScene');
  }
  preload() {
    Logic.preload(this); // Logic's preload
  }
  create() {
    Logic.create(this); // Logic's create
  }
}
