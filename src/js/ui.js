class UI {
    constructor() {
        this.cvs = document.querySelector("#canvas");
        this.ctx = this.cvs.getContext("2d");
        this.scoreDisplay = document.querySelector("#score");
        this.container = document.querySelector(".container");
        this.gameOver = document.querySelector(".gameOver");
        this.deviceInfo = document.querySelector(".deviceInfo");
    }
}

export const ui = new UI();