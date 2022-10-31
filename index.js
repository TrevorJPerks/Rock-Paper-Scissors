const playerRockIcon = document.querySelector('.player-rock');
const playerPaperIcon = document.querySelector('.player-paper');
const playerScissorsIcon = document.querySelector('.player-scissors');
const shootButton = document.querySelector('button');
const announcement = document.querySelector('.announcement');
const computerChoiceIcon = document.querySelector('.computer-selection');
const playerScoreDisplay = document.querySelector('.player-score p');
const computerScoreDisplay = document.querySelector('.computer-score p');

let computerSelection;
let playerSelection;

// score variables
let playerScore = 0;
let computerScore = 0;

// Get Computer's Selection
function getComputerChoice() {
  let computerChoice = ['rock', 'paper', 'scissors'];

  const randomNumGen = Math.floor(Math.random() * 3);

  return computerChoice[randomNumGen];
}

// Create function for each round and keep score
function playRound(playerSelection, computerSelection) {
  // Get computer and selection
  computerSelection = getComputerChoice();

  if (playerSelection == undefined) {
    return (announcement.textContent = 'Make a selection before shooting!');
  }
  // playerSelection = prompt('Rock, Paper,or Scissors?').toLowerCase();

  // Tie condition
  if (playerSelection == computerSelection) {
    announcement.textContent = `It is a tie! You both chose ${playerSelection}!`;

    // Player win conditions & increment playerScore
  } else if (playerSelection == 'rock' && computerSelection == 'scissors') {
    ++playerScore;
    announcement.textContent = 'You win! Rock beats Scissors!';
  } else if (playerSelection == 'paper' && computerSelection == 'rock') {
    ++playerScore;
    announcement.textContent = 'You win! Paper beats Rock!';
  } else if (playerSelection == 'scissors' && computerSelection == 'paper') {
    ++playerScore;
    announcement.textContent = 'You win! Scissors beats Paper!';

    // Computer win conditions & increment computerScore
  } else if (playerSelection == 'scissors' && computerSelection == 'rock') {
    ++computerScore;
    announcement.textContent = 'You lose! Rock beats Scissors!';
  } else if (playerSelection == 'rock' && computerSelection == 'paper') {
    ++computerScore;
    announcement.textContent = 'You lose! Paper beats Rock!';
  } else if (playerSelection == 'paper' && computerSelection == 'scissors') {
    ++computerScore;
    announcement.textContent = 'You lose! Scissors beats Paper!';
  }
  console.log('shot!');
}

// function game() {
//   // Reset Score at game end
//   playerScore = 0;
//   computerScore = 0;
//   console.log(`${playerScore} , ${computerScore}`);
//   // for loop playRound() 5 times
//   for (let i = 0; i < 5; i++) {
//     playRound(playerSelection, computerSelection);
//   }
//   // winner condition
//   if (playerScore == computerScore) {
//     return `It's a tie! ${playerScore} , ${computerScore}`;
//   } else if (playerScore > computerScore) {
//     return `Players wins! ${playerScore} , ${computerScore}`;
//   } else {
//     return `Computer wins! ${playerScore} , ${computerScore}`;
//   }
// }

function computerChoiceTransform() {
  computerChoiceIcon.classList.add('transform-computer-selection');
}

computerChoiceIcon.addEventListener('transitionend', () => {
  computerChoiceIcon.classList.remove('transform-computer-selection');
});

playerRockIcon.addEventListener('click', () => {
  playerSelection = 'rock';
});

playerPaperIcon.addEventListener('click', () => {
  playerSelection = 'paper';
});

playerScissorsIcon.addEventListener('click', () => {
  playerSelection = 'scissors';
});

shootButton.addEventListener('click', () => {
  playRound(playerSelection, computerSelection);
  computerChoiceTransform();
  playerScoreDisplay.textContent = `${playerScore}`;
  computerScoreDisplay.textContent = `${computerScore}`;
});
