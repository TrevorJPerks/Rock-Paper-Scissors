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

let computerSelection;
let playerSelection;

// score variables
let playerScore = 0;
let computerScore = 0;

// Get Computer's Selection
function getComputerChoice() {
  let computerChoices = ['rock', 'paper', 'scissors'];
  const randomNumGen = Math.floor(Math.random() * 3);
  computerSelection = computerChoices[randomNumGen];
}

function announcement(str) {
  announcementText.textContent = str;
}

// Create function for each round and keep score
function playRound(playerSelection, computerSelection) {
  // Get computer and selection
  if (playerSelection == undefined) {
    announcement('Make a selection before shooting!');
  }
  // Tie condition
  if (playerSelection === computerSelection) {
    announcement(`It is a tie! You both chose ${playerSelection}!`);
    // Player win conditions & increment playerScore
  } else if (playerSelection === 'rock' && computerSelection == 'scissors') {
    ++playerScore;
    announcement('You win! Rock beats Scissors!');
  } else if (playerSelection === 'paper' && computerSelection == 'rock') {
    ++playerScore;
    announcement('You win! Paper beats Rock!');
  } else if (playerSelection === 'scissors' && computerSelection == 'paper') {
    ++playerScore;
    announcement('You win! Scissors beats Paper!');
    // Computer win conditions & increment computerScore
  } else if (playerSelection === 'scissors' && computerSelection == 'rock') {
    ++computerScore;
    announcement('You lose! Rock beats Scissors!');
  } else if (playerSelection === 'rock' && computerSelection == 'paper') {
    ++computerScore;
    announcement('You lose! Paper beats Rock!');
  } else if (playerSelection === 'paper' && computerSelection == 'scissors') {
    ++computerScore;
    announcement('You lose! Scissors beats Paper!');
  }
}

// Transform functions
function computerChoiceTransform() {
  if (playerSelection == undefined) {
    return;
  }
  computerChoiceIcon.classList.add('transform-computer-selection');
}

computerChoiceIcon.addEventListener('transitionend', () => {
  computerChoiceIcon.classList.remove('transform-computer-selection');
  if (playerSelection == undefined) {
    return;
  }
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
});

// Player's Selection and Visualizations
playerChoices.forEach(function (item) {
  item.addEventListener('click', function (e) {
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

function announceWinner() {
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

shootButton.addEventListener('click', () => {
  getComputerChoice();
  playRound(playerSelection, computerSelection);
  computerChoiceTransform();
  endGame();
  computerScoreDisplay.textContent = `${computerScore}`;
  playerScoreDisplay.textContent = `${playerScore}`;
});

playAgainButton.addEventListener('click', () => {
  window.location.reload();
});
