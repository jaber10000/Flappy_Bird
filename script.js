const bird = document.getElementById("bird");
const poleTop = document.getElementById("pole-top");
const poleBottom = document.getElementById("pole-bottom");
const scoreDisplay = document.getElementById("score");
const game = document.getElementById("game");

let birdY, gravity, lift, velocity, score, poleX, gameRunning;

function resetPoles() {
  let gap = 200;
  let topHeight = Math.floor(Math.random() * 250) + 50;
  let bottomHeight = 600 - topHeight - gap;

  poleTop.style.height = topHeight + "px";
  poleBottom.style.height = bottomHeight + "px";
}

let poles = [
  { top: document.getElementById("pole-top-1"), bottom: document.getElementById("pole-bottom-1"), x: 400 },
  { top: document.getElementById("pole-top-2"), bottom: document.getElementById("pole-bottom-2"), x: 700 }
];


function resetGame() {
  birdY = 200;
  gravity = 0.4;
  lift = -8;
  velocity = 0;
  score = 0;
  poleX = 400;
  gameRunning = true;
  bird.style.top = birdY + "px";
  scoreDisplay.innerText = "Score: 0";
  resetPoles();
}

function gameLoop() {
  if (!gameRunning) return;

  velocity += gravity;
  if (velocity > 6) velocity = 6; // Cap fall speed
  birdY += velocity;

  if (birdY < 0) birdY = 0;
  if (birdY > 570) birdY = 570;

  bird.style.top = birdY + "px";


  poleX -= 2;
  if (poleX < -60) {
    poleX = 400;
    resetPoles();
    score++;
    scoreDisplay.innerText = "Score: " + score;
  }

  poleTop.style.left = poleX + "px";
  poleBottom.style.left = poleX + "px";

  const birdRect = bird.getBoundingClientRect();
  const topRect = poleTop.getBoundingClientRect();
  const bottomRect = poleBottom.getBoundingClientRect();

  if (
    birdRect.right > topRect.left &&
    birdRect.left < topRect.right &&
    (birdRect.top < topRect.bottom || birdRect.bottom > bottomRect.top)
  ) {
    gameRunning = false;
    scoreDisplay.innerText += " | Game Over! Press 'O' to restart.";
    return;
  }
  

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && gameRunning) {
    velocity = lift;
  } else if (e.key.toLowerCase() === "o" && !gameRunning) {
    startGame();
  }
});

game.addEventListener("click", () => {
  if (gameRunning) {
    velocity = lift;
  } else {
    startGame(); // Restart on tap after game over (mobile-friendly)
  }
});

// Also handle touch events directly (for better mobile support)
game.addEventListener("touchstart", () => {
  if (gameRunning) {
    velocity = lift;
  } else {
    startGame();
  }
});

function startGame() {
  resetGame();
  requestAnimationFrame(gameLoop);
}



let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("game-over-popup").style.display = "none";
