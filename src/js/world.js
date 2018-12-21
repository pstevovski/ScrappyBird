import { ui } from "./ui.js";
import { player } from "./player.js";
import { bird } from "./bird.js";
import { sfx, gfx } from "./assets.js";

class World {
    constructor() {
        this.gravity = 2.5;
        this.gap = 90;
        this.constant = null;
        this.update = null;
        this.cvs = document.querySelector("#canvas");
        this.ctx = this.cvs.getContext("2d");

        // Pipes
        this.pipes = [];
        this.pipes[0] = {
            x: this.cvs.width,
            y: 0
        }
    }

    // Initialize game
    init() {
        // Hide the game over menu
        ui.gameOver.style.display = "none";

        // Bird's image
        gfx.bird.src = "images/bird.png";

        // Reset the pipes and clear the update variable
        this.pipes.splice(0, this.pipes.length);
        this.pipes[0] = {
            x: this.cvs.width,
            y: 0
        }
        this.update = null;
        
        // Reset player score and status
        player.score = 0;
        player.playing = true;

        // Reset bird's status
        bird.x = 20;
        bird.y = 230;
        bird.d = null;

        // Display starting score
        ui.scoreDisplay.textContent = player.score;
    }

    // Game status
    deviceInfo() {
        // Hide the device info text
        ui.deviceInfo.style.display = "none";
    }

    // End the game
    endGame() {
        // Stop the animation
        cancelAnimationFrame(this.update);
        
        // Change bird's image
        gfx.bird.src = "images/deadBird.png";

        // Play dead sound
        sfx.dieSound.play();

        // Display game over menu
        ui.gameOverMenu();

        player.playing = false;
    }
}

export const world = new World();