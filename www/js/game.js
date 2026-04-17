const config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    // The scenes must be in the array in the order they should run
    scene: [RandomUmbrella, MainScene] 
};

// Initialize the game
const game = new Phaser.Game(config);