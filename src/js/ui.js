import { bird } from "./bird.js";

class UI {
    constructor() {
        this.scoreDisplay = document.querySelector("#score");
        this.container = document.querySelector(".container");
        this.gameOver = document.querySelector(".gameOver");
        this.gameOverScore = document.querySelector("#showScore");
        this.showHighscore = document.querySelector("#showHighscore");
        this.deviceInfo = document.querySelector(".deviceInfo");
        this.credits = document.querySelector("#credits");
        this.mainMenu = document.querySelector("#mainMenu");
        this.about = document.querySelector("#about_container");
    }

    // Hide main menu & display canvas
    hideMenu() {
        this.mainMenu.style.display = "none";
        document.querySelector("#canvas").style.display = "block";
    }

    // Show about menu
    showAboutMenu() {
        this.about.classList.toggle("about-active");
    }

    // Game over menu
    gameOverMenu() {
        this.gameOver.style.display = "block";
        this.gameOver.classList.add("active");

        // Show the high score
        if(bird.score > bird.highscore) {
            bird.highscore = localStorage.setItem("scrappyBird-highscore", bird.score);
        }
        bird.highscore = localStorage.getItem("scrappyBird-highscore");

        // Show the final score
        this.gameOverScore.textContent = bird.score;

        // Show the highscore
        this.showHighscore.textContent = bird.highscore;
    }

    // Display info menu
    showCredits() {
        this.credits.classList.toggle("showBox");
    }
}

export const ui = new UI();

// Toggle about menu on/off
document.querySelector("#about").addEventListener("click", ui.showAboutMenu.bind(ui));
document.querySelector("#closeAbout").addEventListener("click", ui.showAboutMenu.bind(ui));