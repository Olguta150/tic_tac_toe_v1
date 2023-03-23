// const { check } = require("prettier");

const board = ['', '', '', '', '', '', '', '', ''];
const cellNum = document.querySelectorAll('.cell');

const Player = (name, token) => {
    const getName = () => name;
    const getToken = () => token;
    return {getName, getToken}
}

const DisplayController = (function() {
    const anne = Player('Anne', 'X');
    const runa = Player('Runa', 'O');
    const players = [anne, runa];
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const conditions = [
        [0, 1, 2], [3, 4, 5],
        [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

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
            console.log(getActivePlayer().getName(), " won!");
        }
    }

    const draw = () => {
        if(!board.includes('')) console.log('no empty spots');
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