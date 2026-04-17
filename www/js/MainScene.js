// We use a closure here so the functions share access to these variables
let scoreText;
let playBtn;

const MainScene = {
    key: 'MainScene',

    preload: function () {
        this.load.image('background', 'assets/background.png');
        this.load.image('new', 'assets/NEW.png');
    },

    create: function () {
        // main camera of the scene
        const cam = this.cameras.main;
        // Background
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background');

        // UI Setup
        // scoreText = this.add.text(0, 0, 'Score: 0', { fontSize: '48px', fill: '#fff' });
        // playBtn = this.add.image(0, 0, 'new').setInteractive();

        // // Scaling logic
        // const repositionUI = () => {
        //     const safe = getSafeArea(this.scale);
        //     scoreText.setPosition(safe.left, safe.top);
        //     playBtn.setPosition(safe.centerX, safe.height - safe.bottom - 100);
        // };

        // this.scale.on('resize', repositionUI);
        // repositionUI(); // Initial placement
    }
};