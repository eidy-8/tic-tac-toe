// Factory function for creating players
const createPlayer = (name, marker, score) => {
    return {name, marker, score};
};

// Factory function for creating the game board
const createGameboard = () => { 
    const board = ["","","","","","","","",""];

    return {board};
};

// Factory function for controlling the game flow
const createGame = () => { 
    let currentPlayer;
    let gameActive = true;
    let players = [];
    const cell0 = document.getElementById("btn0");
    const cell1 = document.getElementById("btn1");
    const cell2 = document.getElementById("btn2");
    const cell3 = document.getElementById("btn3");
    const cell4 = document.getElementById("btn4");
    const cell5 = document.getElementById("btn5");
    const cell6 = document.getElementById("btn6");
    const cell7 = document.getElementById("btn7");
    const cell8 = document.getElementById("btn8");

    popup.showModal();

    function submitForm() {
        var formData = {
            player1 : document.getElementById("player1Name").value,
            player2 : document.getElementById("player2Name").value
        };

        if (formData.player1 == "") {
            formData.player1 = "player1";
        } 
        if (formData.player2 == "") {
            formData.player2 = "player2";
        }
        
        players = [
            createPlayer(formData.player1, "X", 0),
            createPlayer(formData.player2, "O", 0)
        ];

        game.startGame();
        popup.close();
    }

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

                currentPlayer = undefined;
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
            cell0.style.color = "green";
            cell1.style.color = "green";
            cell2.style.color = "green";
            return true;
        }

        if (
            gameboard.board[3] === currentPlayer.marker &&
            gameboard.board[4] === currentPlayer.marker &&
            gameboard.board[5] === currentPlayer.marker
        ) {
            cell3.style.color = "green";
            cell4.style.color = "green";
            cell5.style.color = "green";
            return true;
        }

        if (
            gameboard.board[6] === currentPlayer.marker &&
            gameboard.board[7] === currentPlayer.marker &&
            gameboard.board[8] === currentPlayer.marker
        ) {
            cell6.style.color = "green";
            cell7.style.color = "green";
            cell8.style.color = "green";
            return true;
        }

        //check columns
        if (
            gameboard.board[0] === currentPlayer.marker &&
            gameboard.board[3] === currentPlayer.marker &&
            gameboard.board[6] === currentPlayer.marker
        ) {
            cell0.style.color = "green";
            cell3.style.color = "green";
            cell6.style.color = "green";
            return true;
        }

        if (
            gameboard.board[1] === currentPlayer.marker &&
            gameboard.board[4] === currentPlayer.marker &&
            gameboard.board[7] === currentPlayer.marker
        ) {
            cell1.style.color = "green";
            cell4.style.color = "green";
            cell7.style.color = "green";
            return true;
        }

        if (
            gameboard.board[2] === currentPlayer.marker &&
            gameboard.board[5] === currentPlayer.marker &&
            gameboard.board[8] === currentPlayer.marker
        ) {
            cell2.style.color = "green";
            cell5.style.color = "green";
            cell8.style.color = "green";
            return true;
        }

        //check diagonals
        if (
            gameboard.board[0] === currentPlayer.marker &&
            gameboard.board[4] === currentPlayer.marker &&
            gameboard.board[8] === currentPlayer.marker
        ) {
            cell0.style.color = "green";
            cell4.style.color = "green";
            cell8.style.color = "green";
            return true;
        }

        if (
            gameboard.board[2] === currentPlayer.marker &&
            gameboard.board[4] === currentPlayer.marker &&
            gameboard.board[6] === currentPlayer.marker
        ) {
            cell2.style.color = "green";
            cell4.style.color = "green";
            cell6.style.color = "green";
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
        let gameTextElement = document.getElementById("topTxt");
        let displayElement = document.getElementById("display");
        let scoreElement = document.getElementById("score");

        if (gameTextElement.parentNode === displayElement) { //clean the display for another round
            displayElement.removeChild(gameTextElement);
        }

        if (gameActive == false) { //clean the board for another round
            gameActive = true;
            gameboard.board[0] = "";
            gameboard.board[1] = "";
            gameboard.board[2] = "";
            gameboard.board[3] = "";
            gameboard.board[4] = "";
            gameboard.board[5] = "";
            gameboard.board[6] = "";
            gameboard.board[7] = "";
            gameboard.board[8] = "";

            cell0.innerHTML = "";
            cell1.innerHTML = "";
            cell2.innerHTML = "";
            cell3.innerHTML = "";
            cell4.innerHTML = "";
            cell5.innerHTML = "";
            cell6.innerHTML = "";
            cell7.innerHTML = "";
            cell8.innerHTML = "";

            cell0.style.color = "black";
            cell1.style.color = "black";
            cell2.style.color = "black";
            cell3.style.color = "black";
            cell4.style.color = "black";
            cell5.style.color = "black";
            cell6.style.color = "black";
            cell7.style.color = "black";
            cell8.style.color = "black";
        }

        if (currentPlayer == undefined) {
            currentPlayer = players[Math.floor(Math.random() * 2)];

            scoreElement.innerHTML = `${players[0].name}'s Score: ${players[0].score} | ${players[1].name}'s Score: ${players[1].score}`;
            gameTextElement.innerHTML = `${currentPlayer.name} (${currentPlayer.marker}) goes first!`;
            displayElement.appendChild(gameTextElement);
        }
    };

    return {startGame, makeMove, submitForm};
};

const game = createGame();



