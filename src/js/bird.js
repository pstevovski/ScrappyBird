import { player } from "./player.js";
import { gfx, sfx } from "./assets.js";
import { world } from "./world.js";

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
            // Check if SPACE is pressed OR screen was touched (mobile)
            if(e.keyCode === 32 || player.screenTouched) {
                // Reset sound
                sfx.flySound.currentTime = 0;

                // Move the bird
                this.y -= 40;
                this.d = "UP";

                // Mark the game as running
                player.gameRunning = true;

                // Play flying sound (flap)
                sfx.flySound.play();

                // Change bird image
                gfx.changeBirdImage("UP");
            }
        }

        // If player has NOT pressed SPACE / tapped on screen
        if(player.gameRunning) {
            world.deviceInfo();
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
document.addEventListener("touchstart", ()=>{
    player.screenTouched = true;
    bird.jump();
})
document.addEventListener("touchend", ()=>{
    player.screenTouched = false;
    bird.birdIdle();
})