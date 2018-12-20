import { ui } from "./ui.js";

// Graphical assets
class Gfx {
    constructor() {
        this.bg = new Image();
        this.ground = new Image();
        this.bird = new Image();
        this.pipeTop = new Image();
        this.pipeBottom = new Image();

        this.bird.src = "images/bird.png";
    }

    // Change graphics according to time of day
    changeGraphics(time) {
        if(time === "day") {
            // Chosen background
            this.bg.src = "images/background-day.png";

            // Chosen ground
            this.ground.src = "images/fg.png";

            // Chosen pipes
            this.pipeTop.src = "images/pipeNorth.png";
            this.pipeBottom.src = "images/pipeSouth.png"; 
        } else {
            // Chosen background
            this.bg.src = "images/backgroundNight.png";

            // Chosen ground
            this.ground.src = "images/groundNight.png";

            // Chosen pipes
            this.pipeTop.src = "images/pipeTopNight.png";
            this.pipeBottom.src = "images/pipeBottomNight.png";

            // Change score color
            ui.displayScore.style.color = "#f2f2f2";

            // Change body color
            document.querySelector("body").style.backgroundColor = "#2f3640";
        }
    }
}

// Sound effects
class Sfx {
    constructor() {
        this.scoreSound = new Audio();
        this.flySound = new Audio();
        this.dieSound = new Audio();
        this.hitSound = new Audio();

        this.scoreSound.src = "sounds/point.ogg";
        this.flySound.src = "sounds/wing.ogg";
        this.dieSound.src = "sounds/die.ogg";
        this.hitSound.src = "sounds/hit.ogg";
    }
}

export const gfx = new Gfx();
export const sfx = new Sfx();