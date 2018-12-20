import { ui } from "./ui.js";
import { player } from "./player.js";
import { bird } from "./bird.js";

class World {
    constructor() {
        this.gravity = 2.5;
        this.gap = 90;
        this.constant = null;
        this.game = null;

        // Pipes
        this.pipes = [];
        this.pipes[0] = {
            x: ui.cvs.width,
            y: 0
        }
    }

    // Initialize game
    init() {
        this.pipes.splice(0, this.pipes.length);
        player.score = 0;
        player.playing = true;

        bird.x = 20;
        bird.y = 230;
        bird.d = null;

        ui.scoreDisplay.textContent = player.score;

    }

    // // Game status
    // gameStatus() {
    //     // If its already true, exit the function
    //     if(player.gameRunning) return; 

    //     // clearInterval(checkGameStatusInterval)
    //     ui.deviceInfo.style.display = "none";
    //     this.game = setInterval(draw, 1000/60);
    // }
}

export const world = new World();