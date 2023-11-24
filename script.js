const gameboard = { //gameboard status
    board: [0,1,2,3,4,5,6,7,8]
};

const game = { //game flow
    getPlayer: function(
        playerOneName = "Player One",
        playerTwoName = "Player Two"
    ) {
        const player = [
            {
                name: playerOneName,
                marker: "O"
            },
            {
                name: playerTwoName,
                marker: "X"
            }
        ]
        return player[1].name;
    },

    playRound: function() {
        let activePlayer = player[0];

        const getActivePlayer = () => {
            activePlayer = activePlayer === player[0] ? player[1] : player[0];
        };
    }
}

console.log(game.getPlayer());