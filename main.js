// Canvas & context
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// Images
const bg = new Image();
const ground = new Image();
const bird = new Image();
const pipeTop = new Image();
const pipeBottom = new Image();

bg.src = "images/bg.png";
ground.src = "images/fg.png";
bird.src = "images/bird.png";
pipeTop.src = "images/pipeNorth.png";
pipeBottom.src = "images/pipeSouth.png";

// Sounds
const scoreSound = new Audio();
const flySound = new Audio();

scoreSound.src = "sounds/score.mp3";
flySound.src = "sounds/fly.mp3";

// Global variables
let gravity = 1; // Force that pulls the bird down
let gap = 100; // Gap between pipes
let constant; // The sum of the top pipe height + gap.

// Bird position
let birdX = 20;
let birdY = 150;

// Pipe(s)
let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

// Bird jumps (fly)
document.addEventListener("keydown", jump);
function jump(e){
    console.log(e.keyCode)
    if ( e.keyCode === 32) {
        birdY -= 30;
    }
}

function draw(){
    // Display the background
    ctx.drawImage(bg,0,0);

    // Draw pipes
    for(let i = 0; i < pipe.length; i++){

        constant = pipeTop.height + gap;
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + constant)

        // Move the pipes on the X axis to the left (negative value)
        pipe[i].x --;

        // If the pipes pass a certain distance, push new pipes into the array
        if ( pipe[i].x == 100) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            })
        }
    }

    // Draw the bird
    ctx.drawImage(bird, birdX, birdY);
    // Gravity affects the bird
    birdY += gravity;


    requestAnimationFrame(draw);
}

// Call the draw function
draw();