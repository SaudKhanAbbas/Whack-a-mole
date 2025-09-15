const moles = document.querySelectorAll('.mole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time-left');
const winMessage = document.getElementById('win-message');
const loseMessage = document.getElementById('lose-message');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let timeLeft = 30;
let gameInterval;
let countdownInterval;
const winScore = 5;

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  winMessage.classList.add('hidden');
  loseMessage.classList.add('hidden');
  restartBtn.classList.add('hidden');

  gameInterval = setInterval(randomizeMole, 1000);
  countdownInterval = setInterval(updateTimer, 1000);

  moles.forEach(mole => {
    mole.addEventListener('click', whackMole);
  });
}

function randomizeMole() {
  moles.forEach(mole => mole.classList.remove('active'));
  const index = Math.floor(Math.random() * moles.length);
  moles[index].classList.add('active');
}

function whackMole(e) {
  if (e.target.classList.contains('active')) {
    score++;
    scoreDisplay.textContent = score;
    e.target.classList.remove('active');

    if (score >= winScore) {
      endGame(true);
    }
  }
}

function updateTimer() {
  timeLeft--;
  timeDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame(false);
  }
}

function endGame(won) {
  clearInterval(gameInterval);
  clearInterval(countdownInterval);
  moles.forEach(mole => mole.classList.remove('active'));

  if (won) {
    winMessage.classList.remove('hidden');
  } else {
    loseMessage.classList.remove('hidden');
  }

  restartBtn.classList.remove('hidden');
}

restartBtn.addEventListener('click', startGame);

window.addEventListener('load', startGame);