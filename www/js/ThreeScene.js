import { Scene3D } from '@enable3d/phaser-extension';
import { VirtualJoystick } from 'phaser-virtual-joystick';

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
    scene.third.warpSpeed('-physics', '-orbitControls'); // Disable physics specifically here , '-orbitControls'

    // 2. The Loader
    try {
      const gltf = await scene.third.load.gltf('/assets/human.glb');
      const gltf2 = await scene.third.load.gltf('/assets/cottage_blender.glb');

      const cottage = gltf2.scene;
      const model = gltf.scene;

      scene.player = model;
      scene.cottage = cottage;

      scene.third.add.existing(model);
      scene.third.add.existing(cottage);

      scene.joystick = new VirtualJoystick({
        scene: scene,
        x: 100,
        y: scene.cameras.main.height - 100,
        fixed: true,
        // FORCE VISIBILITY START
        deadZone: { alpha: 0.3 },
        baseArea: { alpha: 0.2 },
        stick: { alpha: 0.9 },
        // FORCE VISIBILITY END
        bounds: {
          topLeft: { x: 0, y: 0 },
          bottomRight: {
            x: scene.cameras.main.width / 2,
            y: scene.cameras.main.height,
          },
        },
      });

      scene.add.existing(scene.joystick);

      // Listen to joystick events
      scene.joystick.on('move', (data) => {
        const speed = 0.2; // Adjust speed as needed
        const limit = 10; // Keep him on the 100x100 plane

        // 1. Calculate new positions
        // We move Left/Right on X
        let newX = scene.player.position.x + data.x * speed;
        // We move Forward/Backward on Z (The Floor)
        let newZ = scene.player.position.z + data.y * speed;

        // 2. Clamp values to stay on the plane
        scene.player.position.x = Math.max(-limit, Math.min(limit, newX));
        scene.player.position.z = Math.max(-limit, Math.min(limit, newZ));

        // 3. Keep Y locked at 0 (The Ground)
        scene.player.position.y = 0;

        // 4. Face the direction of movement
        if (data.x !== 0 || data.y !== 0) {
          scene.player.rotation.y = Math.atan2(data.x, data.y);
        }
      });

      scene.joystick.on('press', () => {
        console.log('Joystick pressed');
      });

      scene.joystick.on('release', () => {
        console.log('Joystick released');
      });

      // 3. Force Visibility
      // Sometimes Blender models are exported tiny (0.01) or huge (100)
      ///model.scale.set(5, 5, 5);
      model.position.set(0, 0, 0);
      cottage.position.set(0, 0, 0);
      cottage.scale.set(0.5, 0.5, 0.5);
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

  update() {
    // This connects Phaser's heart-beat to the joystick logic
    if (this.joystick) {
      this.joystick.update();
    }
  }
}
