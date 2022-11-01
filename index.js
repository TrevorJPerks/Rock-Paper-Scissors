const playerChoices = document.querySelectorAll('.custombutton-player');
const computerChoiceImage =
  document.getElementsByClassName('comp-choice-img')[0];
const computerChoiceIcon = document.querySelector('.computer-selection');
const shootButton = document.querySelector('button');
const announcementText = document.querySelector('.announcement');

//Score Display
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

  computerSelection = computerChoice[randomNumGen];
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

// Transform functions
function computerChoiceTransform() {
  computerChoiceIcon.classList.add('transform-computer-selection');
}

computerChoiceIcon.addEventListener('transitionend', () => {
  computerChoiceIcon.classList.remove('transform-computer-selection');
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

shootButton.addEventListener('click', () => {
  getComputerChoice();
  playRound(playerSelection, computerSelection);
  computerChoiceTransform();
  playerScoreDisplay.textContent = `${playerScore}`;
  computerScoreDisplay.textContent = `${computerScore}`;
});
