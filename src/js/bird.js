import { player } from "./player.js";
import { gfx, sfx } from "./assets.js";

class Bird {
    constructor() {
        this.d = null; // Direction
        this.x = 20;
        this.y = 230;
    }

    // Bird jump (on screen touch or on SPACE pressed)
    jump(e) {
        e = e || event;
        if(player.playing) {
            // Check if SPACE is pressed AND if player has started the game
            if(e.keyCode === 32) {
                this.y -= 40;
                this.d = "UP";
                player.gameRunning = true;
                sfx.flySound.play();
            }

            // If user tapped the screen
            this.y -= 40;
            this.d = "UP";
            player.gameRunning = true;
            sfx.flySound.play();

            gfx.changeBirdImage("UP");
        }
    }

    // Clear bird's direction
    birdIdle() {
        this.d = null;
        gfx.changeBirdImage("DOWN");
    }
}

export const bird = new Bird();

// Add event listeners
document.addEventListener("keydown", bird.jump.bind(bird));
document.addEventListener("keyup", bird.birdIdle.bind(bird));

// Add touch event listeners (for tablets / mobile)
document.addEventListener("touchstart", bird.jump.bind(bird));
document.addEventListener("touchend", bird.birdIdle.bind(bird));