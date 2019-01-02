import { gfx, sfx } from "./assets.js";
import { world } from "./world.js";

class Bird {
    constructor() {
        this.d = null; // Direction
        this.x = 20;
        this.y = 230;
        this.velocity = 0;
        this.birdJump = -5.5;
        this.score = 0;
        this.playing = false;
        this.gameRunning = false;
        this.screenTouched = false;
        this.highscore = localStorage.getItem("scrappyBird-highscore");
    }

    // Bird jump (on screen touch or on SPACE pressed)
    jump(e) {
        e = e || event;
        if(this.playing) {
            // Check if SPACE is pressed OR screen was touched (mobile)
            if(e.keyCode === 32 || this.screenTouched) {
                // Reset sound
                sfx.flySound.currentTime = 0;

                // Move the bird
                this.velocity += this.birdJump - world.gravity;
                this.y += this.velocity;
                this.d = "UP";

                // Limit the velocity of the bird
                if(this.velocity <= -4.75) {
                    this.velocity = -4.75;
                }
                console.log(this.velocity);
                // Mark the game as running
                this.gameRunning = true;

                // Play flying sound (flap)
                sfx.flySound.play();

                // Change bird image
                gfx.changeBirdImage("UP");
            }
        }

        // If this has NOT pressed SPACE / tapped on screen
        if(this.gameRunning) {
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
    bird.screenTouched = true;
    bird.jump();
})
document.addEventListener("touchend", ()=>{
    bird.screenTouched = false;
    bird.birdIdle();
})