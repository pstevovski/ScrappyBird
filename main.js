// Canvas & context
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// Images
const bg = new Image();
const ground = new Image();
const bird = new Image();
const pipeTop = new Image();
const pipeBottom = new Image();
bird.src = "images/bird.png";

// Sounds
const scoreSound = new Audio();
const flySound = new Audio();
const dieSound = new Audio();
const hitSound = new Audio();
scoreSound.src = "sounds/score.mp3";
flySound.src = "sounds/fly.mp3";
dieSound.src = "sounds/die.ogg";
hitSound.src = "sounds/hit.ogg";

// Global variables
let gravity = 1.5; // Force that pulls the bird down
let gap = 100;
let constant; // The sum of the top pipe height + gap.
let score = 0;
const displayScore = document.getElementById("score");
const day = document.getElementById("day");
const night = document.getElementById("night");
const container = document.querySelector(".container");
let d; // Direction

// Start 
document.getElementById("startGame").addEventListener("click", ()=>{
    document.getElementById("startGame").style.display = "none";
    document.querySelector(".levels").style.display = "flex";
})
let test;
// Day mode
day.addEventListener("click", ()=>{
    // Hide buttons
    document.querySelector(".levels").style.display = "none";
    // Display container
    container.style.display = "flex";
    // Chosen background
    bg.src = "images/background-day.png";
    // Chosen ground
    ground.src = "images/fg.png";
    // Chosen pipes
    pipeTop.src = "images/pipeNorth.png";
    pipeBottom.src = "images/pipeSouth.png";  
    draw();
})
// Night mode
night.addEventListener("click", ()=>{
    // Hide buttons
    document.querySelector(".levels").style.display = "none";
    displayScore.style.color = "#f2f2f2";
    // Display container
    container.style.display = "flex";
    // Chosen background
    bg.src= "images/backgroundNight.png";
    // Chosen ground
    ground.src = "images/groundNight.png";
    // Pipes
    pipeTop.src = "images/pipeTopNight.png";
    pipeBottom.src = "images/pipeBottomNight.png";
    draw();
})

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
document.addEventListener("keyup", changeStatus);
document.addEventListener("touchstart", touchJump);
document.addEventListener("touchend", touchStatus);
function jump(e){
    // Space key code is 32.
    if ( e.keyCode === 32) {
        birdY -= 30;
        d = "UP";
        flySound.play();
    }
}
function changeStatus(){
    d = "";
}
function touchJump(){
    birdY -=30;
    d = "UP";
}
function touchStatus(){
    d = "";
}
displayScore.innerHTML = "Score: 0";

function changeBird(){
    if ( d == "UP") {
        bird.src = "images/birdUp.png";
        flySound.play();
    } else if ( d == ""){
        bird.src = "images/birdDown.png";
    }
}
function draw(){
    // Change bird image
    changeBird();
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

        // Increase score
        if ( pipe[i].x == 10) {
            scoreSound.play();
            score++;
            displayScore.innerHTML = "Score: "+score;
        }

        // Detect collision with pipes and ground.
        if( birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + pipeTop.width && (birdY <= pipe[i].y + pipeTop.height || birdY + bird.height >= pipe[i].y + constant) || birdY + bird.height >= cvs.height - ground.height ) {
            hitSound.play();
            bird.src = "images/deadBird.png";
            setTimeout(() => {
                clearInterval(game);
            }, 30);
            gameOver();
        }
    }
    // Draw the ground
    ctx.drawImage(ground, 0, cvs.height - ground.height);
    // Draw the bird
    ctx.drawImage(bird, birdX, birdY);
    // Gravity affects the bird
    birdY += gravity;
}

let game = setInterval(draw, 1000/60);

function gameOver(){
    dieSound.play();
    // Display game over menu
    document.querySelector(".gameOver").style.display = "block";
    // Display score
    document.getElementById("showScore").innerHTML = score;
    // Display highscore
    let highscore = localStorage.getItem("highscoreBird")
    document.getElementById("showHighscore").innerHTML = highscore;
    // Display highscore.
    if ( score > highscore) {
        localStorage.setItem("highscoreBird", score);
        let newHighscore = localStorage.getItem("highscoreBird");
        document.getElementById("showHighscore").innerHTML = newHighscore;
    }
}
// Play again
document.getElementById("playAgain").addEventListener("click", ()=>{
    location.reload();
})