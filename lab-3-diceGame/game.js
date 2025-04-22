// Joseph Teague, 4/16/25

class Game {

    #NUMBER_OF_DIE = 5;
    #NUMBER_OF_SIDES = 6;

    #players
    #dice
    #round
    #currentPlayerIndex = 0;

    constructor() {
        this.#players = [];
        this.#dice = [];
        this.#round = 0;
        this.init();
        for (let i = 0; i < this.#NUMBER_OF_DIE; i++) {
            this.#dice.push(new Die());
        }
    }

    get dice() { return this.#dice; }
    get players() { return this.#players; }
    get round() { return this.#round; }

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

    addPlayer(name) {
        const player = new Player(name);
        player.number = this.players.length + 1;
        this.players.push(player);
        this.updateScoreboard();

        if (this.players.length === 1) {
            document.getElementById('gameArea').style.display = 'block';
        }
        document.getElementById("turnDisplay").textContent =
            `It's ${this.#players[0].name}'s turn!`;
    }

    updateScoreboard() {
        const scoreboard = document.getElementById('playerScores');
        scoreboard.innerHTML = '';

        this.players.forEach(player => {
            const listItem = document.createElement('li');
            listItem.textContent = `Player ${player.number}: ${player.name} - Score: ${player.roundScore}`;
            scoreboard.appendChild(listItem);
        });
    }

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

    rollDice() {
        const player = this.#players[this.#currentPlayerIndex];

        if (player.rollCount >= 3) {
            alert("You've used all your rolls!");
            return;
        }

        const diceToRoll = this.#dice.filter(die =>
            !player.savedDice.includes(die)
        );

        diceToRoll.forEach(die => die.roll());

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

        const gotShipCrewCaptain = player.savedDice.map(d => d.value).includes(4);

        if (gotShipCrewCaptain || player.rollCount >= 3) {
            const cargoDice = this.#dice.filter(d => !player.savedDice.includes(d));
            const cargo = cargoDice.reduce((sum, die) => sum + die.value, 0);
            player.roundScore = cargo;
            this.updateScoreboard();

            this.#currentPlayerIndex++;
            if (this.#currentPlayerIndex < this.#players.length) {
                document.getElementById("turnDisplay").textContent =
                    `It's ${this.#players[this.#currentPlayerIndex].name}'s turn!`;
            } else {
                this.endRound();
            }
        }
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

        alert(`${winner.name} wins the round with a cargo score of ${winner.roundScore}!`);

        this.#currentPlayerIndex = 0;
        this.#round++;
        this.#players.forEach(player => player.resetTurn());
        this.updateScoreboard();
        this.showDice(); // Clear visual dice after round ends
    }

    startNewGame() {
        this.#players = [];
        this.#round = 0;
        this.#currentPlayerIndex = 0;

        const scoreboard = document.getElementById('playerScores');
        scoreboard.innerHTML = '';

        document.getElementById('rolledDice').innerHTML = '';
        document.getElementById('setAsideDice').innerHTML = '';
        document.getElementById('gameArea').style.display = 'none';
        document.getElementById('playerName').value = '';
        document.getElementById("turnDisplay").textContent = "Add players to begin!";
    }
}

let shipCptCrew = new Game();