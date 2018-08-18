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
scoreSound.src = "sounds/point.ogg";
flySound.src = "sounds/wing.ogg";
dieSound.src = "sounds/die.ogg";
hitSound.src = "sounds/hit.ogg";

// Global variables
let gravity = 2; // Force that pulls the bird down
let gap = 100; // Gap between the pipes
let constant; // The sum of the top pipe height + gap.
let score = 0; // Starting score
let checkGameStatusInterval = setInterval(checkGameStatus, 50);
let d; // Direction
let playing = false; // Flag variable
let checkGame = false; // Flag variable
let game;

const displayScore = document.getElementById("score");
const day = document.getElementById("day");
const night = document.getElementById("night");
const container = document.querySelector(".container");

// Get the current hour and if its daytime, display day background, if its night time, display night background.
let today = new Date().getHours();
if ( today >= 7 && today <= 20){
    // Chosen background
    bg.src = "images/background-day.png";
    // Chosen ground
    ground.src = "images/fg.png";
    // Chosen pipes
    pipeTop.src = "images/pipeNorth.png";
    pipeBottom.src = "images/pipeSouth.png"; 
} else if ( today >= 20 || today < 7) {
    // Chosen background
    bg.src = "images/backgroundNight.png";
    // Chosen ground
    ground.src = "images/groundNight.png";
    // Chosen pipes
    pipeTop.src = "images/pipeTopNight.png";
    pipeBottom.src = "images/pipeBottomNight.png";
    // Change score color
    displayScore.style.color = "#f2f2f2";
    // Change body color
    document.querySelector("body").style.backgroundColor = "#2f3640";
}

// Bird position
let birdX = 20;
let birdY = 230;

// Pipe(s)
let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

// Keyboard & touch (for mobile devices) event listeners.
document.addEventListener("keydown", jump);
document.addEventListener("keyup", jumpStatus);
document.addEventListener("touchstart", touchJump);
document.addEventListener("touchend", touchStatus);

// On page load initialization
window.onload = function init(){
    draw();
    playing = true;
    checkGameStatusInterval;
}
// Bird jumps on space press.
function jump(e){
    if ( playing == true && e.code === "Space"){
        checkGame = true;
        // Space key is 32.
        birdY -= 50;
        d = "UP";
        flySound.play();
    }
}
// If no button is pressed, clears the direction of the bird.
function jumpStatus(){
    d = "";
}
// Bird jumps on screen touch.
function touchJump(){
    birdY -= 50;
    d = "UP";
    flySound.play();
    checkGame = true;
}
// If screen is not touched, clears the direction of the bird.
function touchStatus(){
    d = "";
}
// Checks the game status to see if the flag variable (checkGame) is true - representing player tapped on screen / touched spacebar to start.
function checkGameStatus(){
    if( checkGame == true) {
        clearInterval(checkGameStatusInterval)
        document.querySelector(".deviceInfo").style.display = "none";
        game = setInterval(draw, 1000/60);
    }
}
// Updates the image shown for the bird according to the status (flying / falling).
function changeBird(){
    if ( d == "UP") {
        bird.src = "images/birdUp.png";
        flySound.play();
    } else if ( d == ""){
        bird.src = "images/birdDown.png";
    }
}
// Display the score on start.
displayScore.innerHTML = score;
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
        if ( pipe[i].x == 5) {
            scoreSound.play();
            score++;
            displayScore.innerHTML = score;
        }

        // Detect collision with pipes and ground.
        if( birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + pipeTop.width && (birdY <= pipe[i].y + pipeTop.height || birdY + bird.height >= pipe[i].y + constant) || birdY + bird.height >= cvs.height - ground.height ) {
            hitSound.play();
            bird.src = "images/deadBird.png";
            setTimeout(() => {
                clearInterval(game);
                gameOver();
            }, 30);
        }
    }
    // Draw the ground
    ctx.drawImage(ground, 0, cvs.height - ground.height);
    // Draw the bird
    ctx.drawImage(bird, birdX, birdY);
    // Gravity affects the bird
    birdY += gravity;
}

const gameOverMenu = document.querySelector(".gameOver");
function gameOver(){
    dieSound.play();
    // Display game over menu
    gameOverMenu.style.display = "block";
    gameOverMenu.classList.add("active");
    // Display score
    document.getElementById("showScore").innerHTML = score;
    // Display highscore
    let highscore = localStorage.getItem("highscoreBird")
    document.getElementById("showHighscore").innerHTML = highscore;
    // Update highscore if the current score is higher than the previous highscore.
    if ( score > highscore) {
        localStorage.setItem("highscoreBird", score);
        let newHighscore = localStorage.getItem("highscoreBird");
        document.getElementById("showHighscore").innerHTML = newHighscore;
    }
    playing = false;
}
// Play again
document.getElementById("playAgain").addEventListener("click", ()=>{
    // location.reload();
    document.querySelector(".gameOver").style.display = "none";
    // Clear the pipe array of all the pipes accumulated during previous game.
    pipe.splice(0, pipe.length);
    // Reset first pipe position.
    pipe[0] = {
        x: cvs.width,
        y: 0
    }
    // Reset birds initial position.
    birdX = 20;
    birdY = 150;
    // Reset score
    score = 0;
    displayScore.innerHTML = score;
    // Set the boolean playing to true
    playing = true;
    game = setInterval(draw, 1000/60);
})

// Exit game to main menu
document.getElementById("exit").addEventListener("click", ()=>{
    location.reload();
})
