function pushAnnouncement(str) {
  const announcementText = document.querySelector('.announcement');
  announcementText.textContent = str;
}

// Keep track of Selections
let playerSelection;
let computerSelection;

// Create a NodeList containing every div with the class of playerchoice-icon
const playerChoiceIcons = document.querySelectorAll('.playerchoice-icon');

// Iterate over every node in playerChoiceIcons and add a click EventListener
playerChoiceIcons.forEach(function (item) {
  item.addEventListener('click', function () {
    //On Click, Iterate over every node in the NodeList and set styles to default
    playerChoiceIcons.forEach(function (item) {
      item.style.transform = 'scale(1)';
      item.style.borderColor = 'hsl(0, 0%, 40%)';
    });
    // Change style of the node that is clicked
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

function getComputerSelection() {
  const computerChoices = ['rock', 'paper', 'scissors'];
  const randomNumGen = Math.floor(Math.random() * 3);
  computerSelection = computerChoices[randomNumGen];

  updateComputerSelectionIcon();
}

function updateComputerSelectionIcon() {
  const computerSelectionIcon = document.querySelector(
    '.computerselection-icon'
  );
  // Do an animation on computerSelectionIcon
  computerSelectionIcon.classList.add('transform-computerselection-icon');

  computerSelectionIcon.addEventListener('transitionend', () => {
    computerSelectionIcon.classList.remove('transform-computerselection-icon');

    updateComputerSelectionImage();
  });
}

function updateComputerSelectionImage() {
  const computerSelectionImage = document.getElementsByClassName(
    'computerselection-img'
  )[0];

  switch (computerSelection) {
    case 'undefined':
      computerSelectionImage.src = 'images/blankplaceholder-img.png';
      computerSelectionImage.alt = 'a blank image used as a placeholder';
      break;
    case 'rock':
      computerSelectionImage.src = 'images/rock-svg.svg';
      computerSelectionImage.alt = 'a solid black cartoon style closed fist';
      break;
    case 'paper':
      computerSelectionImage.src = 'images/paper-svg.svg';
      computerSelectionImage.alt = 'a solid black cartoon style open hand';
      break;
    case 'scissors':
      computerSelectionImage.src = 'images/scissors-svg.svg';
      computerSelectionImage.alt =
        'a solid black cartoon style hand holding out two fingers';
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

  //Announce round winner, and incement score based on Selections
  switch (playerSelection + '.' + computerSelection) {
    case 'rock.rock':
    case 'paper.paper':
    case 'scissors.scissors':
      pushAnnouncement(`It is a tie! You both chose ${playerSelection}!`);
      break;
    case 'rock.scissors':
    case 'paper.rock':
    case 'scissors.paper':
      pushAnnouncement(
        `You scored. ${playerSelection} beats ${computerSelection}!`
      );
      ++playerScore;
      break;
    case 'scissors.rock':
    case 'rock.paper':
    case 'paper.scissors':
      pushAnnouncement(
        `Computer Scored. ${computerSelection} beats ${playerSelection}!`
      );
      ++computerScore;
  }
  updateScoreBoards();
  //Check score and end the game if score = 3
  if (computerScore === 3 || playerScore === 3) {
    toggleWinnerText();
    togglePlayAgainButton();
  }
}

function toggleWinnerText() {
  const computerWinnerText = document.querySelector(
    '.computer-score .winner-text'
  );
  const playerWinnerText = document.querySelector('.player-score .winner-text');

  if (computerScore > playerScore) {
    computerWinnerText.style.opacity = '100';
  } else {
    playerWinnerText.style.opacity = '100';
  }
  if (computerScore === 0 && playerScore === 0) {
    computerWinnerText.style.opacity = '0';
    playerWinnerText.style.opacity = '0';
  }
}

function togglePlayAgainButton() {
  const playAgainButton = document.querySelector('.playagain-button');
  const playerSelectionContainer = document.querySelector(
    '.player-selection-container'
  );
  // if the score hasn't been reset
  if (computerScore > 0 || playerScore > 0) {
    // Unhide playAgainButton
    playAgainButton.style.transform = 'scale(1)';
    // Disable User interaction on playerSelectionContainer
    playerSelectionContainer.classList.add('disable-clicking');
    //Give playAgainButton purpose
    playAgainButton.addEventListener('click', () => {
      resetGame();
    });
  } else {
    // Hide playAgainButton
    playAgainButton.style.transform = 'scale(0)';
    // Enable User interaction on playerSelectionContainer
    playerSelectionContainer.classList.remove('disable-clicking');
  }
}

function resetGame() {
  // Set Score back to 0
  playerScore = 0;
  computerScore = 0;
  updateScoreBoards();
  // Toggle Winner text
  toggleWinnerText();
  //Reset playerSelection and computerSelection
  playerSelection = 'undefined';
  computerSelection = 'undefined';
  // Reset ComputerIconImage
  updateComputerSelectionImage();
  // Reset PlayerChoiceIcons style
  playerChoiceIcons.forEach(function (item) {
    item.style.transform = 'scale(1)';
    item.style.borderColor = 'hsl(0, 0%, 40%)';
  });
  // Random Announcement
  const newGameQuotes = [
    'May the odds be ever in your favor.',
    'May the force be with you!',
    'Godspeed, friend!',
    'Live long and prosper!',
    'Go forth and conquer.',
    'Remember me when you’re famous!',
    'Buona fortuna!',
    'Have fun storming the castle!',
    'Here’s a rabbit’s foot.',
  ];
  pushAnnouncement(
    newGameQuotes[Math.floor(Math.random() * newGameQuotes.length)]
  );
  // Hide playAgainButton
  togglePlayAgainButton();
}
