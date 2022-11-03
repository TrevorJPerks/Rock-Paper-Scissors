function pushAnnouncement(str) {
  const announcementText = document.querySelector('.announcement');
  announcementText.textContent = str;
}

// Keep track of Selections
let computerSelection;
let playerSelection;

// Get Computer's Selection
function getComputerChoice() {
  let computerChoices = ['rock', 'paper', 'scissors'];
  const randomNumGen = Math.floor(Math.random() * 3);
  computerSelection = computerChoices[randomNumGen];
}

// Update Computer Icon Image
function updateComputerIconImage() {
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
}

// score variables
let playerScore = 0;
let computerScore = 0;

// Compare playerSelection and computerSelection to determine round winner. Increment Score.
function playRound() {
  getComputerChoice();
  // Do a little animation on the computerChoiceIcon
  const computerChoiceIcon = document.querySelector('.computer-selection');
  computerChoiceIcon.classList.add('transform-computer-icon');

  computerChoiceIcon.addEventListener('transitionend', () => {
    computerChoiceIcon.classList.remove('transform-computer-icon');
    updateComputerIconImage();
  });

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
      pushAnnouncement('You win! Rock beats Scissors!');
      ++playerScore;
      break;
    case 'paper.rock':
      pushAnnouncement('You win! Scissors beats Paper!');
      ++playerScore;
      break;
    case 'scissors.paper':
      pushAnnouncement('You win! Scissors beats Paper!');
      ++playerScore;
      break;
    case 'scissors.rock':
      pushAnnouncement('You lose! Rock beats Scissors!');
      ++computerScore;
      break;
    case 'rock.paper':
      pushAnnouncement('You lose! Paper beats Rock!');
      ++computerScore;
      break;
    case 'paper.scissors':
      pushAnnouncement('You lose! Scissors beats Paper!');
      ++computerScore;
  }
  doEndGame();
  //Score Elements
  const playerScoreDisplay = document.querySelectorAll('.player-score p');
  const computerScoreDisplay = document.querySelectorAll('.computer-score p');
  // Update Scoreboards
  playerScoreDisplay.forEach((item) => (item.textContent = `${playerScore}`));
  computerScoreDisplay.forEach(
    (item) => (item.textContent = `${computerScore}`)
  );
}

function announceWinner() {
  if (playerScore === 0) {
    pushAnnouncement('The computer skunked you!');
    return;
  }
  if (computerScore === 0) {
    pushAnnouncement('You skunked the computer!');
    return;
  }
  if (computerScore > playerScore) {
    pushAnnouncement('The computer beat you!');
  } else {
    pushAnnouncement('You beat the computer!');
  }
}

//Check score and end the game if score = 5
function doEndGame() {
  const playAgainButton = document.querySelector('.playagain-button');
  const computerIcon = document.querySelector('.computer-selection');
  const scoreContainer = document.querySelector(
    '.score-computerselect-container'
  );
  const playerSelectionContainer = document.querySelector(
    '.player-selection-container'
  );

  function refreshPage() {
    window.location.reload();
  }

  // when either score = 5, Hide some elements, and reveal playAgainButton
  if (computerScore === 5 || playerScore === 5) {
    computerIcon.classList.add('hidden');
    playerSelectionContainer.classList.add('hidden');
    playAgainButton.style.transform = 'scale(1)';
    computerIcon.style.display = 'none';
    announceWinner();
  }
  playAgainButton.addEventListener('click', () => {
    setTimeout(refreshPage, 400);
  });
}

// Create a NodeList containing every div with the class of custombutton-player
const playerChoices = document.querySelectorAll('.custombutton-player');

// Iterrate over every node in the NodeList and add a click EventListener
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
