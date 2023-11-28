// Factory function for creating players
const createPlayer = (name, marker) => {
    return {name, marker};
};

// Factory function for creating the game board
const createGameboard = () => { //gameboard status
    const board = ["","","","","","","","",""];

    const printBoard = () => {
        console.log("Current Board:");
        console.log(board);
    }

    return {board, printBoard};
};

// Factory function for controlling the game flow
const createGame = () => { 
    let currentPlayer;
    let gameActive = true;
    const players = [createPlayer("Player1", "X"), createPlayer("Player2", "O")];
    const gameboard = createGameboard();

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const makeMove = (position) => {
        if (gameboard.board[position] === "" && gameActive) {
            gameboard.board[position] = currentPlayer.marker;
            gameboard.printBoard();
            
            if (checkWin(position)) {
                console.log(`${currentPlayer.name} wins!`);
                gameActive = false;
            } else if (checkTie()) {
                console.log("It\'s a tie!");
                gameActive = false;
            } else {
                switchPlayer();
            }
        }
    };

    const checkWin = (position) => {
        //check rows
        if (
            gameboard.board[0] === currentPlayer.marker &&
            gameboard.board[1] === currentPlayer.marker &&
            gameboard.board[2] === currentPlayer.marker
        ) {
            return true;
        }

        if (
            gameboard.board[3] === currentPlayer.marker &&
            gameboard.board[4] === currentPlayer.marker &&
            gameboard.board[5] === currentPlayer.marker
        ) {
            return true;
        }

        if (
            gameboard.board[6] === currentPlayer.marker &&
            gameboard.board[7] === currentPlayer.marker &&
            gameboard.board[8] === currentPlayer.marker
        ) {
            return true;
        }

        //check columns
        if (
            gameboard.board[0] === currentPlayer.marker &&
            gameboard.board[3] === currentPlayer.marker &&
            gameboard.board[6] === currentPlayer.marker
        ) {
            return true;
        }

        if (
            gameboard.board[1] === currentPlayer.marker &&
            gameboard.board[4] === currentPlayer.marker &&
            gameboard.board[7] === currentPlayer.marker
        ) {
            return true;
        }

        if (
            gameboard.board[2] === currentPlayer.marker &&
            gameboard.board[5] === currentPlayer.marker &&
            gameboard.board[8] === currentPlayer.marker
        ) {
            return true;
        }

        //check diagonals
        if (
            gameboard.board[0] === currentPlayer.marker &&
            gameboard.board[4] === currentPlayer.marker &&
            gameboard.board[8] === currentPlayer.marker
        ) {
            return true;
        }

        if (
            gameboard.board[2] === currentPlayer.marker &&
            gameboard.board[4] === currentPlayer.marker &&
            gameboard.board[6] === currentPlayer.marker
        ) {
            return true;
        }

        return false;
    };

    const checkTie = () => {
        if (gameboard.board.includes("") == false) {
            return true;
        }
        return false;
    };

    const startGame = () => {
        currentPlayer = players[Math.floor(Math.random() * 2)];
        gameboard.printBoard();
        console.log(`${currentPlayer.name} (${currentPlayer.marker}) goes first!`);
    };

    return {startGame, makeMove};
};

const game = createGame();
game.startGame();

//makeMove(0); => code to play the game in the console