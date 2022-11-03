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
    //playRound
    playRound();
  });
});

// Get Computer's Selection
function getComputerSelection() {
  const computerChoices = ['rock', 'paper', 'scissors'];
  const randomNumGen = Math.floor(Math.random() * 3);
  computerSelection = computerChoices[randomNumGen];
  updateComputerIcon();
}

// Update Computer Icon
function updateComputerIcon() {
  // Do a little animation on computerChoiceIcon
  const computerChoiceIcon = document.querySelector('.computer-selection');
  computerChoiceIcon.classList.add('transform-computer-icon');

  computerChoiceIcon.addEventListener('transitionend', () => {
    computerChoiceIcon.classList.remove('transform-computer-icon');

    // Update ComputerIcon Image
    const computerChoiceImage =
      document.getElementsByClassName('comp-choice-img')[0];
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
    doEndGame();
  }
}

// Disable player interaction, and reveal playAgainButton
function doEndGame() {
  const playAgainButton = document.querySelector('.playagain-button');
  const playerSelectionContainer = document.querySelector(
    '.player-selection-container'
  );
  playAgainButton.style.transform = 'scale(1)';
  playerSelectionContainer.classList.add('disable-clicking');
  announceWinner();
  //Give playAgainButton purpose
  playAgainButton.addEventListener('click', () => {
    setTimeout(refreshPage, 400);
  });
}

function announceWinner() {
  const compWinnerText = document.querySelector('.computer-score .winner-text');
  const playerWinnerText = document.querySelector('.player-score .winner-text');
  if (computerScore > playerScore) {
    compWinnerText.style.opacity = '100';
  } else {
    playerWinnerText.style.opacity = '100';
  }
}

function refreshPage() {
  window.location.reload();
}
