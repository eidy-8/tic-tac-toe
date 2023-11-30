// Factory function for creating players
const createPlayer = (name, marker, score) => {
    return {name, marker, score};
};

// Factory function for creating the game board
const createGameboard = () => { //gameboard status
    const board = ["","","","","","","","",""];

    return {board};
};

// Factory function for controlling the game flow
const createGame = () => { 
    let currentPlayer;
    let gameActive = true;
    const players = [createPlayer("Player1", "X", 0), createPlayer("Player2", "O", 0)];
    const gameboard = createGameboard();

    const switchPlayer = () => {
        let gameTextElement = document.getElementById("topTxt");

        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

        gameTextElement.innerHTML = "";
        gameTextElement.innerHTML = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
    };

    const makeMove = (position) => {
        let gameTextElement = document.getElementById("topTxt");
        let scoreElement = document.getElementById("score");

        if (gameboard.board[position] === "" && gameActive) {
            gameboard.board[position] = currentPlayer.marker;

            const cell = document.getElementById(`btn${position}`);
            cell.innerHTML = `${currentPlayer.marker}`;
            
            if (checkWin(position)) {
                currentPlayer.score += 1;
                gameTextElement.innerHTML = "";
                scoreElement.innerHTML = `${players[0].name}'s Score: ${players[0].score} | ${players[1].name}'s Score: ${players[1].score}`;
                gameTextElement.innerHTML = `${currentPlayer.name} wins!`;

                currentPlayer = undefined;

                gameActive = false;
            } else if (checkTie()) {
                gameTextElement.innerHTML = "";
                gameTextElement.innerHTML = "It\'s a tie!";

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
        let gameTextElement = document.createElement("p");
        gameTextElement.id = "topTxt";
        let displayElement = document.getElementById("display");
        let scoreElement = document.getElementById("score");

        if (currentPlayer == undefined) {
            currentPlayer = players[Math.floor(Math.random() * 2)];

            scoreElement.innerHTML = `${players[0].name}'s Score: ${players[0].score} | ${players[1].name}'s Score: ${players[1].score}`;
            gameTextElement.innerHTML = `${currentPlayer.name} (${currentPlayer.marker}) goes first!`;
            displayElement.appendChild(gameTextElement);
        }
    };

    return {startGame, makeMove};
};

const game = createGame();


