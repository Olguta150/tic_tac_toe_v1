// const { check } = require("prettier");

let board = ['', '', '', '', '', '', '', '', ''];
const cellNum = document.querySelectorAll('.cell');

const Player = (name, token) => {
    const getName = () => name;
    const getToken = () => token;
    return {getName, getToken}
}

const DisplayController = (function() {
    const resultBoard = document.querySelector('.result-board');
    const resultText = document.querySelector('.result-text');
    const playAgainBtn = document.querySelector('.play-again');
    const player1 = Player('Anne', 'X');
    const player2 = Player('Runa', 'O');
    let activePlayer = player1;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    const getActivePlayer = () => activePlayer;

    const conditions = [
        [0, 1, 2], [3, 4, 5],
        [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const playAgainFunc = () => {
        resultBoard.style.display = 'none';
        board = ['', '', '', '', '', '', '', '', ''];
        Gameboard.play();
    }

    const checkWin = () => {
        let roundWin = false;
        for(let i = 0; i < conditions.length; i++) {
            const winCondition = conditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if(a === '' || b === '' || c === '') {
                continue;
            } else if(a === b && b === c) {
                roundWin = true;
            }
        }
        if(roundWin) {
            resultBoard.style.display = 'flex';
            resultText.textContent = `${getActivePlayer().getName()} won!`;
        }
    }

    const draw = () => {
        if(!board.includes('')) {
            resultBoard.style.display = 'flex';
            resultText.textContent = `Draw!`;
        }
    };

    const playRound = () => {
        for(let i = 0; i < cellNum.length; i++) {
            cellNum[i].onclick = () => {
                if(board[i] != '') {
                    return;
                } else {
                    board.splice(i, 1, getActivePlayer().getToken());
                }
                Gameboard.play();
                checkWin();
                draw();
                playAgainBtn.onclick = () => playAgainFunc();
                console.log(board);
                console.log(getActivePlayer().getName(), ": ", getActivePlayer().getToken());
                switchPlayerTurn();
            }
        }
    }
    return {switchPlayerTurn, playRound};
})();

DisplayController.playRound();

const Gameboard = (function () {
    const play = () => {
        for(let i = 0; i < cellNum.length; i++) {
            cellNum[i].textContent = board[i];
        }
    }
    return {play};
})();

Gameboard.play();