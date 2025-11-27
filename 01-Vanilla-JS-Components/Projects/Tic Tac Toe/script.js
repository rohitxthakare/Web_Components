const boxes = document.querySelectorAll('.box');
const winCount = document.querySelector('.win-count');
const playerInfo = document.querySelector(".player-info");
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let turn = Math.random() * 2 > 1 ? 'X' : 'O';

let xWinCount = 0;
let oWinCount = 0;

function changeTurn() {
    turn = turn === 'X' ? 'O' : 'X';
    return turn;
}

function checkWin() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (
            boxes[a].textContent &&
            boxes[a].textContent === boxes[b].textContent &&
            boxes[b].textContent === boxes[c].textContent
        ) {
            boxes[a].classList.add('win');
            boxes[b].classList.add('win');
            boxes[c].classList.add('win');
            boxes.forEach(box => (box.disabled = true));

            if (boxes[a].textContent === 'X') {
                winCount.textContent = `X: ${++xWinCount} O: ${oWinCount}`;
                playerInfo.textContent = "X Wins!";
            } else {
                winCount.textContent = `X: ${xWinCount} O: ${++oWinCount}`;
                playerInfo.textContent = "O Wins!";
            }

            startBtn.disabled = false;
            startBtn.textContent = 'Again';
            return true;
        }
    }

    // Check for draw
    const allFilled = [...boxes].every(box => box.textContent !== '');
    if (allFilled) {
        playerInfo.textContent = "It's a Draw!";

        startBtn.disabled = false;
        startBtn.textContent = 'Again';
        return true;
    }

    return false;
}

boxes.forEach(box => {
    box.addEventListener('click', () => {
        box.textContent = turn;
        box.disabled = true;

        const gameOver = checkWin();
        if (!gameOver) {
            turn = changeTurn();
            playerInfo.textContent = `${turn} Turn`;
        }
    });
});

startBtn.addEventListener('click', () => {
    turn = Math.random() * 2 > 1 ? 'X' : 'O';
    playerInfo.textContent = `${turn} Turn`;

    boxes.forEach(box => {
        box.textContent = '';
        box.disabled = false;
        box.classList.remove('win');
    });

    resetBtn.disabled = false;
    startBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
    xWinCount = 0;
    oWinCount = 0;
    winCount.textContent = `X: ${xWinCount} O: ${oWinCount}`;

    turn = Math.random() * 2 > 1 ? 'X' : 'O';
    playerInfo.textContent = `${turn} Turn`;

    boxes.forEach(box => {
        box.textContent = '';
        box.disabled = false;
        box.classList.remove('win');
    });

    startBtn.disabled = true;
});