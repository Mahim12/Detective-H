import Phaser from 'phaser';


import FlipBook from 'flipbook-js';
import 'flipbook-js/style.css'; // Don't forget the CSS!

const Logic = {

    preload: (scene) => {
        scene.load.image('background', 'assets/sceneTwo/background.png');
    },

    // create(scene) {
    //     const cam = scene.cameras.main;
    //     scene.add.image(cam.centerX, cam.centerY, "background");

    //     // 1. Create the HTML Structure (Notice the 'c-flipbook' classes)
    //     const htmlString = `
    //         <div id="book-wrapper" style="width: 1024px; height: 600px; display: flex; justify-content: center;">
    //             <div class="c-flipbook" id="detective-book">
    //                 <div class="c-flipbook__page" style="background: #2c3e50; color: white; display: flex; align-items: center; justify-content: center;">
    //                     <h1>CASE: DETECTIVE H</h1>
    //                 </div>
    //                 <div class="c-flipbook__page" style="background: #fdfdfd; padding: 40px; color: black; border: 1px solid #ddd;">
    //                     <h2>Suspect: Johnny Walker</h2>
    //                     <p style="font-family: monospace;">Notes: Claims to work for 'A Random Umbrella Production'.</p>
    //                 </div>
    //                 <div class="c-flipbook__page" style="background: #fdfdfd; padding: 40px; color: black; border: 1px solid #ddd;">
    //                     <h2>Evidence: Ballistics</h2>
    //                     <p style="font-family: monospace;">Angle: 45° Trajectory confirmed.</p>
    //                 </div>
    //                 <div class="c-flipbook__page" style="background: #2c3e50; color: white; display: flex; align-items: center; justify-content: center;">
    //                     <h2>End of File</h2>
    //                 </div>
    //             </div>
    //         </div>
    //     `;

    //     // 2. Add as a Phaser DOM Element at center (1920 / 2, 1080 / 2)
    //     const magazine = scene.add.dom(960, 540).createFromHTML(htmlString);
    //     magazine.setOrigin(0.5);

    //     // 3. Initialize the Vanilla Plugin
    //     // We use the ID we defined in the HTML string
        
    //     const book = new FlipBook('detective-book', {
    //         width: '1000px',
    //         height: '600px',
    //         canClose: true,
    //         arrowKeys: true,
    //         initialCall: false,       // Stops the "call for attention" auto-flip
    //         initialActivePage: 0      // Forces it to start at the first page/cover
    //     });

    //     // Optional: Make it globally accessible for debugging
    //     window.activeBook = book;
    // }

    create(scene) {
    const cam = scene.cameras.main;
    scene.add.image(cam.centerX, cam.centerY, "background");

    // 1. Use 'display: none' so the library can't animate what isn't "there"
    const htmlString = `
        <div id="book-wrapper" style="width: 1000px; height: 600px; display: none;">
            <div class="c-flipbook" id="detective-book">
                <div class="c-flipbook__page" style="background: #2c3e50; color: white; display: flex; align-items: center; justify-content: center;">
                    <h1>CASE: DETECTIVE H</h1>
                </div>
                <div class="c-flipbook__page" style="background: #fdfdfd; padding: 40px; color: black; border: 1px solid #ddd;">
                    <h2>Suspect: Johnny Walker</h2>
                </div>
                <div class="c-flipbook__page" style="background: #fdfdfd; padding: 40px; color: black; border: 1px solid #ddd;">
                    <h2>Evidence: Ballistics</h2>
                </div>
                <div class="c-flipbook__page" style="background: #2c3e50; color: white; display: flex; align-items: center; justify-content: center;">
                    <h2>End of File</h2>
                </div>
            </div>
        </div>
    `;

    const magazine = scene.add.dom(960, 540).createFromHTML(htmlString);
    magazine.setOrigin(0.5);

    // 2. Initialize with a tiny delay to let the DOM "settle"
    scene.time.delayedCall(50, () => {
        const book = new FlipBook('detective-book', {
            width: '1000px',
            height: '600px',
            canClose: true,
            arrowKeys: true,
            initialCall: false, 
            initialActivePage: 0
        });

        book.turnPage(0);
        
        const wrapper = document.getElementById('book-wrapper');
        if (wrapper) {
            wrapper.style.display = 'block';
            
            // --- ADD THESE TWO LINES ---
            // 1. Tell Phaser the HTML now has a real size
            magazine.updateSize(); 
            // 2. Re-apply the center origin now that the size is known
            magazine.setOrigin(0.5); 
        }

        window.activeBook = book;
    });
}
};

export default class SuspectScene extends Phaser.Scene {
    constructor() { super('SuspectScene'); }
    create() { Logic.create(this); }
}