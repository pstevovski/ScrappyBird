import { ui } from "./ui.js";

// Graphical assets
class Gfx {
    constructor() {
        this.bg = new Image();
        this.ground = new Image();
        this.bird = new Image();
        this.pipeTop = new Image();
        this.pipeBottom = new Image();
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
            ui.scoreDisplay.style.color = "#f2f2f2";

            // Change body color
            document.querySelector("body").style.backgroundColor = "#2f3640";
        }
    }

    // Change bird's image based on direction in which it is going (up/down)
    changeBirdImage(direction) {
        if(direction === "UP") {
            this.bird.src = "images/birdUp.png";
        } else if (direction === "DOWN") {
            this.bird.src = "images/birdDown.png";
        }
    }

    checkTimeOfDay() {
        // Change graphical assets according to time of day
        const time = new Date().getHours();
        if(time >= 7 && time < 20) {
            gfx.changeGraphics("day");
        } else if (time >= 20 || time < 7) {
            gfx.changeGraphics("night");
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

document.addEventListener("DOMContentLoaded", gfx.checkTimeOfDay.bind(gfx));