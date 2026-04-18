import { Scene3D } from '@enable3d/phaser-extension';

export default class ThreeScene extends Scene3D {
    constructor() {
        super('ThreeScene');
    }

    preload() {
        // Paths are now relative to index.html in dist
        this.load.binary('cubeModel', 'assets/cube.glb');
    }

    async create() {
        // Initialize 3D
        await this.create3D();

        this.third.have.light.ambient({ intensity: 0.4 });
        this.third.have.light.directional({ intensity: 0.8, x: 2, y: 5, z: 2 });

        const assetData = this.cache.binary.get('cubeModel');
        if (assetData) {
            this.third.load.gltf(assetData).then(gltf => {
                this.cube = gltf.scene.children[0];
                this.third.add.existing(this.cube);
                this.cube.position.set(0, 0, 0);
            });
        }

        this.third.camera.position.set(0, 2, 10);
    }

    update() {
        if (this.cube) {
            this.cube.rotation.y += 0.01;
        }
    }
}