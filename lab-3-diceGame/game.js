// Joseph Teague, 4/16/25

class Game {

    #NUMBER_OF_DIE = 5;
    #NUMBER_OF_SIDES = 6;

    #players
    #dice
    #round // is this necessary? XXXXXXXXXXXXXXXX
    #currentPlayerIndex = 0;

    constructor() {
        this.#players = []; // Array to store player objects
        this.#dice = []; //Initialize the dice
        this.#round = 0; //ask Julian if I really need this cus he knows stuff.XXXXXXXXXXXXXXX
        this.init(); // Initialize the game
        for (let i = 0; i < this.#NUMBER_OF_DIE; i++) {
            this.#dice.push(new Die()); //does this need to be before the init? XXXXXXXXXXXXX
        }
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

        document.getElementById('newGameButton').onclick = () => {
            this.startNewGame();
        };

        document.getElementById('rollButton').onclick = () => {
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
        document.getElementById("turnDisplay").textContent = 
    `It's ${this.#players[0].name}'s turn!`;
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


    showDice() {
        const container = document.getElementById('diceContainer');
        container.innerHTML = ''; // Clear old images
    
        this.#dice.forEach(die => {
            const img = document.createElement('img');
            img.src = `images/die${die.value}.png`;
            img.alt = `Die showing ${die.value}`;
            img.classList.add('die'); // a class for CSS
            container.appendChild(img);
        });
    }

    endRound() {
        let highestScore = -1;
        let winner = null;
    
        this.#players.forEach(player => {
            if (player.roundScore > highestScore) {
                highestScore = player.roundScore;
                winner = player;
            }
        });
    
        alert(`🏆 ${winner.name} wins the round with a cargo score of ${winner.roundScore}!`);
    
        // Reset for new round
        this.#currentPlayerIndex = 0;
        this.#round++;
        this.#players.forEach(player => player.roundScore = 0);
        this.updateScoreboard();
    }


    // Rolling Dice
    rollDice() {
        let player = this.#players[this.#currentPlayerIndex];
        player.roll(this.#dice);
        let rollScore = player.calculateScore(this.#dice);
        this.updateScoreboard();

        // Move to next player
        this.#currentPlayerIndex++;

        if (this.#currentPlayerIndex < this.#players.length) {
            document.getElementById("turnDisplay").textContent = 
                `🎲 It's ${this.#players[this.#currentPlayerIndex].name}'s turn!`;
        } else {
            this.endRound();
        }

        if (this.#currentPlayerIndex >= this.#players.length) {
            this.endRound(); // All players are done
        }
    }

    // getting winner
    getGameWinner() {

    }

    startNewGame() {
        this.#players = [];
        this.#round = 0;
        this.#currentPlayerIndex = 0;

        const scoreboard = document.getElementById('playerScores');
        scoreboard.innerHTML = '';

        const diceContainer = document.getElementById('diceContainer');
        diceContainer.innerHTML = '';

        document.getElementById('gameArea').style.display = 'none';
        alert("Game reset. Add players to begin a new game!");

        document.getElementById('playerName').value = '';
        document.getElementById("turnDisplay").textContent = "Add players to begin!";
    }
}

// Initialize the game
let shipCptCrew = new Game();