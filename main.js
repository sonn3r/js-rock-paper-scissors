let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
    if (!isAutoPlaying) {
         intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        autoPlayButton.innerHTML = 'Stop Playing';
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayButton.innerHTML = 'Auto Play';
    }
}

let autoPlayButton = document.querySelector('.auto-play-button');
    autoPlayButton.addEventListener('click', autoPlay);

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
    });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        resetScore();
    }
})

function resetScore() {
    // Get the confirmation container and its elements
    const confirmationContainer = document.getElementById('confirmation-container');
    const confirmationMessage = document.getElementById('confirmation-message');
    const confirmButton = document.getElementById('confirm-button');
    const cancelButton = document.getElementById('cancel-button');

    // Set the confirmation message text
    confirmationMessage.textContent = 'Are you sure you want to reset the score?';

    // Show the confirmation container
    confirmationContainer.style.display = 'block';

    // Add event listeners to confirm or cancel the reset
    confirmButton.addEventListener('click', () => {
        // Perform the reset when confirmed
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();

        // Hide the confirmation container
        confirmationContainer.style.display = 'none';
    });

    cancelButton.addEventListener('click', () => {
        // Hide the confirmation container when canceled
        confirmationContainer.style.display = 'none';
    });
}

let resetScoreButton = document.querySelector('.reset-score-button');
resetScoreButton.addEventListener('click', resetScore);



function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'Loss';
        } else if (computerMove === 'paper') {
            result = 'Win';
        } else if (computerMove === 'scissors') {
            result = 'Tie';
        }
        console.log(result);
    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        } else if (computerMove === 'paper') {
            result = 'Loss';
        } else if (computerMove === 'scissors') {
            result = 'Win';
        }
        console.log(result);
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'Win';
        } else if (computerMove === 'paper') {
            result = 'Tie';
        } else if (computerMove === 'scissors') {
            result = 'Loss';
        }
        console.log(result);
    }

    if (result === 'Win') {
        score.wins += 1;
    } else if (result === 'Loss') {
        score.losses += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result')
        .innerHTML =  `${result}.`;

    document.querySelector('.js-moves')
        .innerHTML =
        `You picked <img src="images/${playerMove}-emoji.png" class="move-icon" alt="playerMove"> <br>
         Computer picked <img src="images/${computerMove}-emoji.png" class="move-icon" alt="computerMove">`

    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissors';
    }
    console.log(computerMove);
    return computerMove;
}