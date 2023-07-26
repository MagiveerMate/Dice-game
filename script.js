// Game state variables
let scores, currentScore, activePlayer, gamePlaying;

// DOM elements
const diceImg = document.getElementById('diceImg');
const rollBtn = document.getElementById('rollBtn');
const holdBtn = document.getElementById('holdBtn');
const newGameBtn = document.getElementById('newGameBtn');

// Initialize the game
init();

// Event listeners
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);
newGameBtn.addEventListener('click', init);

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  diceImg.style.display = 'none';
  rollBtn.disabled = false;
  holdBtn.disabled = false;

  document.getElementById('score1').textContent = '0';
  document.getElementById('score2').textContent = '0';
  document.getElementById('current1').textContent = '0';
  document.getElementById('current2').textContent = '0';
  document.getElementById('player1').classList.add('active');
  document.getElementById('player2').classList.remove('active');
}

function rollDice() {
  if (gamePlaying) {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceImg.src = `dice-${dice}.png`;
    diceImg.style.display = 'block';

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current${activePlayer + 1}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
}

function holdScore() {
  if (gamePlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score${activePlayer + 1}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document.getElementById(`player${activePlayer + 1}`).classList.add('winner');
      diceImg.style.display = 'none';
      rollBtn.disabled = true;
      holdBtn.disabled = true;
      gamePlaying = false;
    } else {
      switchPlayer();
    }
  }
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current${activePlayer + 1}`).textContent = '0';
  document.getElementById(`player${activePlayer + 1}`).classList.remove('active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`player${activePlayer + 1}`).classList.add('active');
}

