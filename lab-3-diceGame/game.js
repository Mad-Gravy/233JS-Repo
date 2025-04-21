// Joseph Teague, 4/16/25

class Game {

    #NUMBER_OF_DIE = 5;
    #NUMBER_OF_SIDES = 6;

    #players
    #dice
    #round

    constructor() {
        this.#players = []; // Array to store player objects
        this.#dice = []; //Initialize the dice
        this.#round = 0;
        this.init(); // Initialize the game
    }

    get dice() {return this.#dice}
    get players() {return this.#players}
    get round() {return this.#round}

    // Initialize the game
    init() {
        // Add event listener for the "Add Player" button
        document.getElementById('addPlayer').onclick = () => {
            const playerNameInput = document.getElementById('playerName');
            const playerName = playerNameInput.value.trim();
            if (playerName) {
                this.addPlayer(playerName);
                playerNameInput.value = ''; // Clear the input field
            } else {
                alert('Please enter a valid player name.');
            }
        };

        document.getElementById('rollButton').onClick = () => {
            this.rollDice();
        }
    }
    // Add a new player
    addPlayer(name) {
        const player = new Player(name);
        player.number = this.players.length + 1; // Assign player number
        this.players.push(player);
        this.updateScoreboard();

        if (this.players.length === 1) {
            document.getElementById('gameArea').style.display = 'block';
        }    // gameArea will show only after the first player has been added
    }

    // Update the scoreboard
    updateScoreboard() {
        const scoreboard = document.getElementById('playerScores');
        scoreboard.innerHTML = ''; // Clear the scoreboard

        this.players.forEach(player => {
            const listItem = document.createElement('li');
            listItem.textContent = `Player ${player.number}: ${player.name} - Score: ${player.roundScore}`;
            scoreboard.appendChild(listItem);
        });
    }

    // Method for next round
    newRound() {

    }

    // Rolling Dice
    rollDice() {
        let player = this.getCurrentPlayer();
        player.roll(this.#dice);
        let rollScore = player.calculateScore(this.#dice, this.#round);
    }

    // getting winner
    getGameWinner() {

    }

    startNewGame() {

    }
}

// Initialize the game
let shipCptCrew = new Game();