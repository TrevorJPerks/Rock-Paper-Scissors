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

function updateAnnouncement(str) {
  announcementText.textContent = str;
}

// Compare playerSelection and computerSelection to determine round winner. Increment Score.
function playRound() {
  // Player must make selection
  if (playerSelection === undefined) {
    updateAnnouncement('Make a selection before shooting!');
    return;
  }
  // Tie condition
  if (playerSelection === computerSelection) {
    updateAnnouncement(`It is a tie! You both chose ${playerSelection}!`);
    return;
  }
  //Combined playerSelection and computerSelection into a single value.
  const combinedSelections = playerSelection + '.' + computerSelection;

  // Determine, and announce round winner, incement score
  switch (combinedSelections) {
    case 'rock.scissors':
      updateAnnouncement('You win! Rock beats Scissors!');
      ++playerScore;
      break;
    case 'paper.rock':
      updateAnnouncement('You win! Scissors beats Paper!');
      ++playerScore;
      break;
    case 'scissors.paper':
      updateAnnouncement('You win! Scissors beats Paper!');
      ++playerScore;
      break;
    case 'scissors.rock':
      updateAnnouncement('You lose! Rock beats Scissors!');
      ++computerScore;
      break;
    case 'rock.paper':
      updateAnnouncement('You lose! Paper beats Rock!');
      ++computerScore;
      break;
    case 'paper.scissors':
      updateAnnouncement('You lose! Scissors beats Paper!');
      ++computerScore;
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
function refreshPage() {
  window.location.reload();
}

shootButton.addEventListener('click', () => {
  getComputerChoice();
  playRound();
  computerChoiceTransform();
  endGame();
  computerScoreDisplay.textContent = `${computerScore}`;
  playerScoreDisplay.textContent = `${playerScore}`;
});

playAgainButton.addEventListener('click', () => {
  endGameScreen.classList.remove('show-endgameScreen');
  setTimeout(refreshPage, 400);
});
