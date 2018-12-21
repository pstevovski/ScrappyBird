class Player {
    constructor() {
        this.score = 0;
        this.playing = false;
        this.gameRunning = false;
        this.screenTouched = false;
        this.highscore = localStorage.getItem("scrappyBird-highscore");
    }

}

export const player = new Player();