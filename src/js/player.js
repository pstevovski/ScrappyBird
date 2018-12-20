import { ui } from "./ui.js";
import { world } from "./world.js";

class Player {
    constructor() {
        this.score = 0;
        this.playing = false;
        this.gameRunning = false; 
    }

}

export const player = new Player();