import { gfx, sfx } from "./assets.js";
import { player } from "./player.js";
import { bird } from "./bird.js";;
import { world } from "./world.js";
import { ui } from "./ui.js";

function startGame() {
    // Hide the game over menu
    ui.gameOver.style.display = "none";

    // Init the game
    world.init();

    // Draw the game
    draw();
}

function draw() {

    ui.update = requestAnimationFrame(draw);
}

// function checkGameStatus(){
//     //     if( checkGame == true) {
//     //         clearInterval(checkGameStatusInterval)
//     //         document.querySelector(".deviceInfo").style.display = "none";
//     //         game = setInterval(draw, 1000/60);
//     //     }
//     // }


// Initialize game
document.querySelector("#initGame").addEventListener("click", startGame);


