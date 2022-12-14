let playerSelection;
let computerSelection;

let playerScore = 0;
let computerScore = 0;

const playerChoiceIcons = document.querySelectorAll('.playerchoice-icon');

// Iterate over every node in playerChoiceIcons and add a click EventListener
playerChoiceIcons.forEach(function (item) {
  item.addEventListener('click', function () {
    //On Click, Iterate over every node in playerChoiceIcons and set styles to default
    playerChoiceIcons.forEach(function (item) {
      item.style.transform = 'scale(1)';
      item.style.borderColor = 'hsl(0, 0%, 40%)';
    });
    // Change style of the node that is clicked
    item.style.transform = 'scale(1.1)';
    item.style.borderColor = 'hsla(120, 44%, 49%, 0.856)';
    // Update playerSelection
    if (item.classList.contains('player-rock')) {
      playerSelection = 'Rock';
    }
    if (item.classList.contains('player-paper')) {
      playerSelection = 'Paper';
    }
    if (item.classList.contains('player-scissors')) {
      playerSelection = 'Scissors';
    }
    playRound();
  });
});

function getComputerSelection() {
  const computerChoices = ['Rock', 'Paper', 'Scissors'];
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
    case 'Rock':
      computerSelectionImage.src = 'images/rock-svg.svg';
      computerSelectionImage.alt = 'a solid black cartoon style closed fist';
      break;
    case 'Paper':
      computerSelectionImage.src = 'images/paper-svg.svg';
      computerSelectionImage.alt = 'a solid black cartoon style open hand';
      break;
    case 'Scissors':
      computerSelectionImage.src = 'images/scissors-svg.svg';
      computerSelectionImage.alt =
        'a solid black cartoon style hand holding out two fingers';
  }
}

function pushAnnouncement(str) {
  const announcementText = document.querySelector('.announcement');
  announcementText.textContent = str;
}

function playRound() {
  getComputerSelection();

  switch (playerSelection + '.' + computerSelection) {
    case 'Rock.Rock':
    case 'Paper.Paper':
    case 'Scissors.Scissors':
      pushAnnouncement(`It is a tie! You both chose ${playerSelection}!`);
      break;
    case 'Rock.Scissors':
    case 'Paper.Rock':
    case 'Scissors.Paper':
      pushAnnouncement(
        `You scored. ${playerSelection} beats ${computerSelection}!`
      );
      ++playerScore;
      break;
    case 'Scissors.Rock':
    case 'Rock.Paper':
    case 'Paper.Scissors':
      pushAnnouncement(
        `Computer Scored. ${computerSelection} beats ${playerSelection}!`
      );
      ++computerScore;
  }
  updateScoreBoards();

  if (computerScore === 3 || playerScore === 3) {
    toggleWinnerText();
    togglePlayAgainButton();
  }
}

function updateScoreBoards() {
  const playerScoreDisplay = document.querySelector('.player-score p');
  const computerScoreDisplay = document.querySelector('.computer-score p');

  playerScoreDisplay.textContent = `${playerScore}`;
  computerScoreDisplay.textContent = `${computerScore}`;
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
    playAgainButton.style.transform = 'scale(1)';
    playerSelectionContainer.classList.add('disable-clicking');
    //Give playAgainButton purpose
    playAgainButton.addEventListener('click', () => {
      resetGame();
    });
  } else {
    playAgainButton.style.transform = 'scale(0)';
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
    'Remember me when you???re famous!',
    'Buona fortuna!',
    'Have fun storming the castle!',
    'Here???s a rabbit???s foot.',
  ];
  pushAnnouncement(
    newGameQuotes[Math.floor(Math.random() * newGameQuotes.length)]
  );
  // Hide playAgainButton
  togglePlayAgainButton();
}
