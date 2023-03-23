const board = new Array(9);
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
        activePlayer = activePlayer === players[0] ?players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = () => {
        for(let i = 0; i < cellNum.length; i++) {
            cellNum[i].onclick = () => {
                if(board[i] != null) {
                    return;
                } else {
                    board.splice(i, 1, getActivePlayer().getToken());
                }
                Gameboard.play();
                console.log("cellNum[i]: ", cellNum[i]);
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