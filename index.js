// Game screens
const gameScreen = document.querySelector('.game-container');
const endGameScreen = document.querySelector('.endgame-container');

//Game elements
const playerChoices = document.querySelectorAll('.custombutton-player');
const computerChoiceImage =
  document.getElementsByClassName('comp-choice-img')[0];
const computerChoiceIcon = document.querySelector('.computer-selection');
const shootButton = document.querySelector('.shoot-button');
const playAgainButton = document.querySelector('.playagain-button');
const announcementText = document.querySelector('.announcement');

//Score Display
const playerScoreDisplay = document.querySelector('.player-score p');
const computerScoreDisplay = document.querySelector('.computer-score p');

//Endgame Elements
const playerEndGameScoreDisplay = document.querySelector(
  '.endgame-player-score p'
);
const computerEndGameScoreDisplay = document.querySelector(
  '.endgame-computer-score p'
);
const winnerText = document.querySelector('.endgame-announcement');

function announcement(str) {
  announcementText.textContent = str;
}

let computerSelection;
let playerSelection;

// Create Visualization for and record Player's Selection
playerChoices.forEach(function (item) {
  item.addEventListener('click', function () {
    playerChoices.forEach(function (item) {
      item.classList.remove('active');
    });
    item.classList.add('active');
    if (item.classList.contains('player-rock')) {
      playerSelection = 'rock';
    }
    if (item.classList.contains('player-paper')) {
      playerSelection = 'paper';
    }
    if (item.classList.contains('player-scissors')) {
      playerSelection = 'scissors';
    }
  });
});

// Get Computer's Selection
function getComputerChoice() {
  let computerChoices = ['rock', 'paper', 'scissors'];
  const randomNumGen = Math.floor(Math.random() * 3);
  computerSelection = computerChoices[randomNumGen];
}

// Update Computer Icon Image
function updateComputerIconImage() {
  switch (computerSelection) {
    case 'rock':
      computerChoiceImage.src = 'images/rock-svg.svg';
      break;
    case 'paper':
      computerChoiceImage.src = 'images/paper-svg.svg';
      break;
    case 'scissors':
      computerChoiceImage.src = 'images/scissors-svg.svg';
  }
}

// score variables
let playerScore = 0;
let computerScore = 0;

// Compare playerSelection and computerSelection to determine round winner. Increment Score.
function playRound() {
  // Player must make selection
  if (playerSelection === undefined) {
    announcement('Make a selection before shooting!');
    return;
  }
  // Tie condition
  if (playerSelection === computerSelection) {
    announcement(`It is a tie! You both chose ${playerSelection}!`);
    return;
  }
  //Combine playerSelection and computerSelection into a single value.
  const combinedSelections = playerSelection + '.' + computerSelection;

  // Determine, announce round winner, and incement score based on combinedSelections
  switch (combinedSelections) {
    case 'rock.scissors':
      announcement('You win! Rock beats Scissors!');
      ++playerScore;
      break;
    case 'paper.rock':
      announcement('You win! Scissors beats Paper!');
      ++playerScore;
      break;
    case 'scissors.paper':
      announcement('You win! Scissors beats Paper!');
      ++playerScore;
      break;
    case 'scissors.rock':
      announcement('You lose! Rock beats Scissors!');
      ++computerScore;
      break;
    case 'rock.paper':
      announcement('You lose! Paper beats Rock!');
      ++computerScore;
      break;
    case 'paper.scissors':
      announcement('You lose! Scissors beats Paper!');
      ++computerScore;
  }
}

// Computer Icon functions
function computerChoiceIconTransform() {
  if (playerSelection == undefined) {
    return;
  }
  computerChoiceIcon.classList.add('transform-computer-icon');
}

// Remove classList on transitionend and update Icon image
computerChoiceIcon.addEventListener('transitionend', () => {
  computerChoiceIcon.classList.remove('transform-computer-icon');
  if (playerSelection == undefined) {
    return;
  }
  updateComputerIconImage();
});

function announceWinner() {
  if (playerScore == 0) {
    winnerText.textContent = 'The computer skunked you!';
    return;
  }
  if (computerScore === 0) {
    winnerText.textContent = 'You skunked the computer!';
    return;
  }
  if (computerScore > playerScore) {
    winnerText.textContent = 'The computer beat you!';
  } else {
    winnerText.textContent = 'You beat the computer!';
  }
}

//Check score and end the game if score = 5
function endGame() {
  if (computerScore === 5 || playerScore === 5) {
    gameScreen.classList.add('hide-gameScreen');
    endGameScreen.classList.add('show-endgameScreen');
    playerEndGameScoreDisplay.textContent = `${playerScore}`;
    computerEndGameScoreDisplay.textContent = `${computerScore}`;
    announceWinner();
  }
}

function refreshPage() {
  window.location.reload();
}

shootButton.addEventListener('click', () => {
  getComputerChoice();
  playRound();
  computerChoiceIconTransform();
  endGame();
  computerScoreDisplay.textContent = `${computerScore}`;
  playerScoreDisplay.textContent = `${playerScore}`;
});

playAgainButton.addEventListener('click', () => {
  endGameScreen.classList.remove('show-endgameScreen');
  setTimeout(refreshPage, 400);
});
