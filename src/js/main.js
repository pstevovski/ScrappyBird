import { gfx, sfx } from "./assets.js";
import { bird } from "./bird.js";;
import { world } from "./world.js";
import { ui } from "./ui.js";

function startGame() {
    // Hide the main menu and display canvas
    ui.hideMenu();

    // Init the game
    world.init();

    // Draw the game
    draw();
}

// Initial ground position
let groundPos = 0;

function draw() {
    // Draw the canvas
    world.ctx.drawImage(gfx.bg, 0, 0);

    // Draw the pipes
    if(bird.gameRunning) {
        for(let i = 0; i < world.pipes.length; i++) {
            world.constant = gfx.pipeTop.height + world.gap;

            world.ctx.drawImage(gfx.pipeTop, world.pipes[i].x, world.pipes[i].y);
            world.ctx.drawImage(gfx.pipeBottom, world.pipes[i].x, world.pipes[i].y + world.constant);

            // Move the pipes to the left on the X axis
            world.pipes[i].x--;

            // If the pipes pass a certain distance, push a new pipe in the array
            if(world.pipes[i].x === 80) {
                world.pipes.push({
                    x: world.cvs.width,
                    y: Math.floor(Math.random() * gfx.pipeTop.height) - gfx.pipeTop.height
                })
            }

            // If the BIRD goes past the PIPES without hitting them, increase score
            if(world.pipes[i].x === bird.x) {
                bird.score++;
                sfx.scoreSound.play();
                ui.scoreDisplay.textContent = bird.score;
            }
        }
        // Gravity affects bird Y position
        bird.velocity += world.gravity;

        // Set a maximum velocity
        if(bird.velocity >= 10) {
            bird.velocity = 10;
        }

        // Pull the bird down according to the velocity it accumulates (gravity)
        bird.y += bird.velocity;
    }

    // Draw the ground
    world.ctx.drawImage(gfx.ground, groundPos, world.cvs.height - gfx.ground.height);

    // Move the ground to the left and re-draw it
    groundPos--;
    if(groundPos <= -15) {
        groundPos = 0;
    }

    // Draw the bird
    world.ctx.drawImage(gfx.bird, bird.x, bird.y);

    // Detect collision between bird-pipes & bird-ground
    for(let i = 0; i < world.pipes.length; i++) {
        if( bird.x + gfx.bird.width >= world.pipes[i].x && bird.x <= world.pipes[i].x + gfx.pipeTop.width && (bird.y <= world.pipes[i].y + gfx.pipeTop.height || bird.y + gfx.bird.height >= world.pipes[i].y + world.constant) || bird.y + gfx.bird.height >= world.cvs.height - gfx.ground.height) {
            // Play hit sound
            sfx.hitSound.play();

            // End the game
            world.endGame();
            return;
        }
    }

    // Draw the canvas @ 60fps
    world.update = requestAnimationFrame(draw);
}

// Initialize game
document.querySelector("#initGame").addEventListener("click", startGame);

// Play again
document.querySelector("#playAgain").addEventListener("click", startGame);

// Exit the game
document.querySelector("#exit").addEventListener("click", ()=> location.reload());