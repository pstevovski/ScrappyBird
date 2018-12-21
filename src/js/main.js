import { gfx, sfx } from "./assets.js";
import { player } from "./player.js";
import { bird } from "./bird.js";;
import { world } from "./world.js";
import { ui } from "./ui.js";


function startGame() {
    // Init the game
    world.init();

    // Draw the game
    draw();
}

function draw() {
    // Draw the canvas
    world.ctx.drawImage(gfx.bg, 0, 0);

    // Draw the pipes
    if(player.gameRunning) {
        for(let i = 0; i < world.pipes.length; i++) {
            world.constant = gfx.pipeTop.height + world.gap;

            world.ctx.drawImage(gfx.pipeTop, world.pipes[i].x, world.pipes[i].y);
            world.ctx.drawImage(gfx.pipeBottom, world.pipes[i].x, world.pipes[i].y + world.constant);

            // Move the pipes to the left on the X axis
            world.pipes[i].x--;

            // If the pipes pass a certain distance, push a new pipe in the array
            if(world.pipes[i].x === 100) {
                world.pipes.push({
                    x: world.cvs.width,
                    y: Math.floor(Math.random() * gfx.pipeTop.height) - gfx.pipeTop.height
                })
            }

            // If the BIRD goes past the PIPES without hitting them, increase score
            if(world.pipes[i].x === bird.x) {
                player.score++;
                sfx.scoreSound.play();
                ui.scoreDisplay.textContent = player.score;
            }

            // Detect collision between bird-pipes & bird-ground
            if( bird.x + gfx.bird.width >= world.pipes[i].x && bird.x <= world.pipes[i].x + gfx.pipeTop.width && (bird.y <= world.pipes[i].y + gfx.pipeTop.height || bird.y + gfx.bird.height >= world.pipes[i].y + world.constant) || bird.y + gfx.bird.height >= world.cvs.height - gfx.ground.height) {
                    // Play hit sound
                    sfx.hitSound.play();

                    // End the game
                    world.endGame();
                    return;
                }
        }
        // Gravity affects bird Y position
        bird.y += world.gravity;
    }

    // Draw the ground
    world.ctx.drawImage(gfx.ground, 0, world.cvs.height - gfx.ground.height);
    
    // Draw the bird
    world.ctx.drawImage(gfx.bird, bird.x, bird.y);

    world.update = requestAnimationFrame(draw);
}

// Initialize game
document.querySelector("#initGame").addEventListener("click", startGame);

// Play again
document.querySelector("#playAgain").addEventListener("click", startGame);

// Exit the game
document.querySelector("#exit").addEventListener("click", ()=> location.reload());



