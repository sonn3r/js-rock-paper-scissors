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
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}
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