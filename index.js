function pushAnnouncement(str) {
  const announcementText = document.querySelector('.announcement');
  announcementText.textContent = str;
}

// Keep track of Selections
let playerSelection;
let computerSelection;

// Create a NodeList containing every div with the class of custombutton-player
const playerChoices = document.querySelectorAll('.custombutton-player');

// Iterrate over every node in playerChoices and add a click EventListener
playerChoices.forEach(function (item) {
  item.addEventListener('click', function () {
    //On Click, Iterrate over every node in the NodeList and set styles to default
    playerChoices.forEach(function (item) {
      item.style.borderColor = 'hsl(0, 0%, 40%)';
      item.style.transform = 'scale(1)';
    });
    // Update style of the node that is clicked
    item.style.transform = 'scale(1.1)';
    item.style.borderColor = 'hsla(120, 44%, 49%, 0.856)';
    // Update playerSelection
    if (item.classList.contains('player-rock')) {
      playerSelection = 'rock';
    }
    if (item.classList.contains('player-paper')) {
      playerSelection = 'paper';
    }
    if (item.classList.contains('player-scissors')) {
      playerSelection = 'scissors';
    }

    playRound();
  });
});

// Get Computer's Selection
function getComputerSelection() {
  const computerChoices = ['rock', 'paper', 'scissors'];
  const randomNumGen = Math.floor(Math.random() * 3);
  computerSelection = computerChoices[randomNumGen];
  updateComputerSelectionIcon();
}

// Update Computer Icon
function updateComputerSelectionIcon() {
  const computerSelectionIcon = document.querySelector('.computer-selection');
  // Do am animation on computerChoiceIcon
  computerSelectionIcon.classList.add('transform-computer-icon');

  computerSelectionIcon.addEventListener('transitionend', () => {
    computerSelectionIcon.classList.remove('transform-computer-icon');

    updateComputerSelectionImage();
  });
}

// Update ComputerIcon Image
function updateComputerSelectionImage() {
  const computerSelectionImage =
    document.getElementsByClassName('comp-choice-img')[0];

  switch (computerSelection) {
    case 'undefined':
      computerSelectionImage.src = 'images/blankplaceholder-img.png';
      break;
    case 'rock':
      computerSelectionImage.src = 'images/rock-svg.svg';
      break;
    case 'paper':
      computerSelectionImage.src = 'images/paper-svg.svg';
      break;
    case 'scissors':
      computerSelectionImage.src = 'images/scissors-svg.svg';
  }
}

//Score variables
let playerScore = 0;
let computerScore = 0;

function updateScoreBoards() {
  //Scoreboard Elements
  const playerScoreDisplay = document.querySelector('.player-score p');
  const computerScoreDisplay = document.querySelector('.computer-score p');
  // Update Scoreboards
  playerScoreDisplay.textContent = `${playerScore}`;
  computerScoreDisplay.textContent = `${computerScore}`;
}

// Determine round winner. Increment Score.
function playRound() {
  getComputerSelection();

  // Tie condition
  if (playerSelection === computerSelection) {
    pushAnnouncement(`It is a tie! You both chose ${playerSelection}!`);
    return;
  }

  //Combine playerSelection and computerSelection into a single value.
  const combinedSelections = playerSelection + '.' + computerSelection;

  //Announce round winner, and incement score based on combinedSelections
  switch (combinedSelections) {
    case 'rock.scissors':
      pushAnnouncement('You scored. Rock beats Scissors!');
      ++playerScore;
      break;
    case 'paper.rock':
      pushAnnouncement('You scored. Scissors beats Paper!');
      ++playerScore;
      break;
    case 'scissors.paper':
      pushAnnouncement('You scored. Scissors beats Paper!');
      ++playerScore;
      break;
    case 'scissors.rock':
      pushAnnouncement('Computer Scored. Rock beats Scissors!');
      ++computerScore;
      break;
    case 'rock.paper':
      pushAnnouncement('Computer Scored. Paper beats Rock!');
      ++computerScore;
      break;
    case 'paper.scissors':
      pushAnnouncement('Computer Scored. Scissors beats Paper!');
      ++computerScore;
  }
  updateScoreBoards();
  //Check score and end the game if score = 5
  if (computerScore === 5 || playerScore === 5) {
    toggleWinner();
    togglePlayAgainButton();
  }
}

function togglePlayAgainButton() {
  const playAgainButton = document.querySelector('.playagain-button');
  const playerSelectionContainer = document.querySelector(
    '.player-selection-container'
  );
  // if the Score is reset
  if (computerScore === 0 && playerScore === 0) {
    // Set playAgainButton Hidden
    playAgainButton.style.transform = 'scale(0)';
    // Enable User interaction on playerSelectionContainer
    playerSelectionContainer.classList.remove('disable-clicking');
  } else {
    // Reveal PlayAgainButton
    playAgainButton.style.transform = 'scale(1)';
    // Disable User interaction on playerSelectionContainer
    playerSelectionContainer.classList.add('disable-clicking');
    //Give playAgainButton purpose
    playAgainButton.addEventListener('click', () => {
      resetGame();
    });
  }
}

function toggleWinner() {
  const compWinnerText = document.querySelector('.computer-score .winner-text');
  const playerWinnerText = document.querySelector('.player-score .winner-text');
  if (computerScore > playerScore) {
    compWinnerText.style.opacity = '100';
  } else {
    playerWinnerText.style.opacity = '100';
  }
  if (computerScore === 0 && playerScore === 0) {
    compWinnerText.style.opacity = '0';
    playerWinnerText.style.opacity = '0';
  }
}

function resetGame() {
  animateGameContainer();
  // Set Score back to 0
  playerScore = 0;
  computerScore = 0;
  updateScoreBoards();
  // Toggle Winner text
  toggleWinner();
  //Reset playerSelection and computerSelection
  playerSelection = 'undefined';
  computerSelection = 'undefined';
  // Reset ComputerIconImage
  updateComputerSelectionImage();
  // Reset PlayerChoices style
  playerChoices.forEach(function (item) {
    item.style.borderColor = 'hsl(0, 0%, 40%)';
    item.style.transform = 'scale(1)';
  });
  // Reset Announcement
  pushAnnouncement('Make a selection. First to 5 wins!');
  // Hide playAgainButton
  togglePlayAgainButton();
}

function animateGameContainer() {
  const gameContainer = document.querySelector('.game-container');
  gameContainer.classList.add('game-container-animation');
  //
  gameContainer.addEventListener('transitionend', () => {
    gameContainer.classList.remove('game-container-animation');
  });
}
