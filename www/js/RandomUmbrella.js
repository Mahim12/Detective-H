const RandomUmbrella = {
    key: 'RandomUmbrella',

    preload: function() {
        this.load.image('logo', 'assets/logo.png');
    },

    create: function() {
        /* Start of loading the background and covering it fully */
        // main camera of the scene
        const cam = this.cameras.main;

        /* Start of loading the company-title and placing it */
        this.add.image(cam.centerX, cam.centerY, "logo");
        /* End of loading the company-title */

        this.time.delayedCall(2000, () => {
            // 2s delay before starting fade out
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            // 1s fade out, black
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("MainScene");
            }
            );
        }
        );
    },
};