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
  playerSelection = prompt('Rock, Paper,or Scissors?').toLowerCase();

  // Tie condition
  if (playerSelection == computerSelection) {
    return `It is a tie! You both chose ${playerSelection}!`;

    // Player win conditions & increment playerScore
  } else if (playerSelection == 'rock' && computerSelection == 'scissors') {
    ++playerScore;
    return 'You win! Rock beats Scissors!';
  } else if (playerSelection == 'paper' && computerSelection == 'rock') {
    ++playerScore;
    return 'You win! Paper beats Rock!';
  } else if (playerSelection == 'scissors' && computerSelection == 'paper') {
    ++playerScore;
    return 'You win! Scissors beats Paper!';

    // Computer win conditions & increment computerScore
  } else if (playerSelection == 'scissors' && computerSelection == 'rock') {
    ++computerScore;
    return 'You lose! Rock beats Scissors!';
  } else if (playerSelection == 'rock' && computerSelection == 'paper') {
    ++computerScore;
    return 'You lose! Paper beats Rock!';
  } else if (playerSelection == 'paper' && computerSelection == 'scissors') {
    ++computerScore;
    return 'You lose! Scissors beats Paper!';
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
