import { Scene3D } from '@enable3d/phaser-extension';

/**
 * Group the logic into a constant object
 * Write all phaser logic in pure functions that take the scene as an argument.
 * Do not use 'this' in these functions, as they are not class methods.
 */
const Logic = {
  async init(scene) {
    await scene.accessThirdDimension();
  },

  preload(scene) {
    // nothing for GLB
  },

  async create(scene) {
    // 1. Lights (WarpSpeed usually adds them, but let's be 100% sure)
    scene.third.warpSpeed('-physics'); // Disable physics specifically here

    // 2. The Loader
    try {
      const gltf = await scene.third.load.gltf('/assets/human.glb');
      const model = gltf.scene;

      scene.third.add.existing(model);

      // 3. Force Visibility
      // Sometimes Blender models are exported tiny (0.01) or huge (100)
      ///model.scale.set(5, 5, 5);
      model.position.set(0, 0, 0);

      // 4. Camera Position
      // Move back far enough to see a large object
      scene.third.camera.position.set(10, 10, 10);
      scene.third.camera.lookAt(0, 0, 0);

      console.log('Model loaded and added to scene:', model);
    } catch (error) {
      console.error('The GLB failed to load. Check the Network tab!', error);
    }
  },
};

/**
 * WRAPPER CLASS FOR PHASER SCENE
 * This class is what Phaser interacts with, it calls the pure logic functions defined above.
 * This separation allows for functional programming while keeping Phaser's class-based structure intact.
 */
export default class ThreeScene extends Scene3D {
  constructor() {
    super('ThreeScene');
  }

  async init() {
    await Logic.init(this);
  }

  preload() {
    Logic.preload(this);
  }

  async create() {
    await Logic.create(this);
  }
}
