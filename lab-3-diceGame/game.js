// Joseph Teague, 4/16/25

// Class to manage the entire Ship Captain Crew game
class Game {

    // Private constants and fields
    #NUMBER_OF_DIE = 5;
    #NUMBER_OF_SIDES = 6;

    #players              // array of Player objects
    #dice                 // array of Die objects
    #round                // round counter
    #currentPlayerIndex = 0;  // index of the current player

    constructor() {
        this.#players = [];
        this.#dice = [];
        this.#round = 0;
        this.init();  // Setup UI buttons
        for (let i = 0; i < this.#NUMBER_OF_DIE; i++) {
            this.#dice.push(new Die());  // create 5 dice
        }
    }

    // Getters for external access
    get dice() { return this.#dice; }
    get players() { return this.#players; }
    get round() { return this.#round; }

    // Connect button events
    init() {
        document.getElementById('addPlayer').onclick = () => {
            const playerNameInput = document.getElementById('playerName');
            const playerName = playerNameInput.value.trim();
            if (playerName) {
                this.addPlayer(playerName);
                playerNameInput.value = '';
            } else {
                alert('Please enter a valid player name.');
            }
        };

        document.getElementById('newGameButton').onclick = () => {
            this.startNewGame();
        };

        document.getElementById('rollButton').onclick = () => {
            this.rollDice();
        };
    }

    // Add a new player to the list
    addPlayer(name) {
        const player = new Player(name);
        player.number = this.players.length + 1;
        this.players.push(player);
        this.updateScoreboard();

        // Show game area when at least one player is added
        if (this.players.length === 1) {
            document.getElementById('gameArea').style.display = 'block';
        }

        // Show whose turn it is
        document.getElementById("turnDisplay").textContent =
            `It's ${this.#players[0].name}'s turn!`;
    }

    // Update player scores on the scoreboard
    updateScoreboard() {
        const scoreboard = document.getElementById('playerScores');
        scoreboard.innerHTML = '';

        this.players.forEach(player => {
            const listItem = document.createElement('li');
            listItem.textContent = `Player ${player.number}: ${player.name} - Score: ${player.roundScore}`;
            scoreboard.appendChild(listItem);
        });
    }

    // Display the dice in their proper containers
    showDice() {
        const rolledContainer = document.getElementById('rolledDice');
        const setAsideContainer = document.getElementById('setAsideDice');

        rolledContainer.innerHTML = '';
        setAsideContainer.innerHTML = '';

        const player = this.#players[this.#currentPlayerIndex];

        this.#dice.forEach(die => {
            const img = document.createElement('img');
            img.src = `images/die${die.value}.png`;
            img.alt = `Die showing ${die.value}`;
            img.classList.add('die');

            if (player.savedDice.includes(die)) {
                setAsideContainer.appendChild(img);
            } else {
                rolledContainer.appendChild(img);
            }
        });
    }

    // Core logic for rolling dice on a turn
    rollDice() {
        const player = this.#players[this.#currentPlayerIndex];

        // Prevent more than 3 rolls
        if (player.rollCount >= 3) {
            alert("You've used all your rolls!");
            return;
        }

        // Roll only dice not already saved (6, 5, 4)
        const diceToRoll = this.#dice.filter(die =>
            !player.savedDice.includes(die)
        );

        diceToRoll.forEach(die => die.roll());

        // Attempt to save 6, then 5, then 4 in order
        for (let die of diceToRoll) {
            const val = die.value;
            const saved = player.savedDice.map(d => d.value);
            if (!saved.includes(6) && val === 6) {
                player.savedDice.push(die);
            } else if (saved.includes(6) && !saved.includes(5) && val === 5) {
                player.savedDice.push(die);
            } else if (saved.includes(6) && saved.includes(5) && !saved.includes(4) && val === 4) {
                player.savedDice.push(die);
            }
        }

        this.showDice();
        player.incrementRollCount();

        // Check if the player has 6, 5, and 4
        const savedValues = player.savedDice.map(d => d.value);
        const gotShipCaptainCrew = savedValues.includes(6) && savedValues.includes(5) && savedValues.includes(4);

        // Either scored or out of rolls
        if (gotShipCaptainCrew || player.rollCount >= 3) {
            const cargoDice = gotShipCaptainCrew
                ? this.#dice.filter(d => !player.savedDice.includes(d))
                : [];

            const cargo = cargoDice.reduce((sum, die) => sum + die.value, 0);
            player.roundScore = cargo;
            this.updateScoreboard();

            // Message summarizing the player's turn
            let message = `${player.name}, your turn is over.\n`;
            if (gotShipCaptainCrew) {
                message += `Your cargo score is ${cargo}.`;
            } else {
                message += `You didn't get a ship, captain, and crew — your score is 0.`;
            }

            this.#currentPlayerIndex++;
            const hasMorePlayers = this.#currentPlayerIndex < this.#players.length;

            if (hasMorePlayers) {
                message += `\nIt's now ${this.#players[this.#currentPlayerIndex].name}'s turn.`;
            } else {
                message += `\nAll players have rolled. The round is ending.`;
            }

            // Slight delay so user sees rolled dice before alert
            setTimeout(() => {
                alert(message);

                if (hasMorePlayers) {
                    document.getElementById("turnDisplay").textContent =
                        `It's ${this.#players[this.#currentPlayerIndex].name}'s turn!`;
                } else {
                    this.endRound();
                }
            }, 800);
        }
    }

    // Handle end-of-round logic and find the winner
    endRound() {
        let highestScore = -1;
        let winner = null;

        // Find the player with the highest cargo score
        this.#players.forEach(player => {
            if (player.roundScore > highestScore) {
                highestScore = player.roundScore;
                winner = player;
            }
        });

        alert(`${winner.name} wins the round with a cargo score of ${winner.roundScore}!`);

        this.#currentPlayerIndex = 0;
        this.#round++;

        // Reset each player's state for the next round
        this.#players.forEach(player => player.resetTurn());

        this.updateScoreboard();
        this.showDice();
    }

    // Reset the entire game (new player list, scores, etc.)
    startNewGame() {
        this.#players = [];
        this.#round = 0;
        this.#currentPlayerIndex = 0;

        document.getElementById('playerScores').innerHTML = '';
        document.getElementById('rolledDice').innerHTML = '';
        document.getElementById('setAsideDice').innerHTML = '';
        document.getElementById('gameArea').style.display = 'none';
        document.getElementById('playerName').value = '';
        document.getElementById("turnDisplay").textContent = "Add players to begin!";
    }
}

