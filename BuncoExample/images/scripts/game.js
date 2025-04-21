/* Going to Boston dice game, written by Brian Bird, 4/16/24, revised 4/22/24 */

class Game {
    // private fields (aka instance variables)
    #players
    #dice
    #scoreDice
    #currentPlayer
    #roundNumber

    constructor() {
        this.#players = [];
        this.#dice = [];
        this.#scoreDice = [];
        this.#currentPlayer = 0; // index to the player array
        this.#roundNumber = 1;  // round number, just gets displayed on the page

        // put die in the dice array
        for (let i = 0; i < NUMBER_OF_DIE; i++) {
            this.#dice.push(new Die());
        }
    }

    // getters
    get dice() { return this.#dice; }
    get scoreDice() { return this.#scoreDice; }
    get players() { return this.#players; }

    // Add a player to the game
    addPlayer(name) {
        let player = new Player(name);
        player.number = this.#players.length + 1;
        this.#players.push(player);
    }

    // Returns the current player object
    getCurrentPlayer() {
        return this.#players[this.#currentPlayer];
    }

   // Roll the dice
   rollDice() {
       for (let die of this.#dice) {
           die.roll();
       }
   }

    // get the values of the dice rolled dice
    getDiceValues() {
        let values = [];
        for (let die of this.#dice) {
            values.push(die.value);
        }
        return values;
    }

    // Move a die from the dice to roll and put it in the score dice array
    setDieAside(index) {
        // remove the die from the dice array and add it to the scoreDice array
        let removedDice = this.#dice.splice(index, 1); // splice returns an array of Die objects
        let dieRemoved = removedDice[0];
        this.#scoreDice.push(dieRemoved);
        return dieRemoved.value;
    }

    // Returns the sum of the score dice values
    getScore() {
        let sum = 0;
        for (let die of this.#scoreDice) {
            sum += die.value;
        }
        return sum;
    }

    // End the curreent player's turn, update scores, swith players
    endTurn() {
        // add the score to the player's total score
        let score = this.getScore();
        this.getCurrentPlayer().roundScore = score;
        // put the dice back in the roll dice array
        this.#dice = this.#dice.concat(this.#scoreDice);
        // clear the score dice
        this.#scoreDice = [];
        // switch players
        this.#currentPlayer = (this.#currentPlayer + 1) % this.#players.length;
    }

    // End the round, determine the winner(s) of the round, and update/reset scores
    endRound() {
        // Determine the winner of the round that just ended (for any number of players)
        // copy the players array into a temporary array and sort it by round score
        let tempPlayers = this.#players.slice();
        tempPlayers.sort((a, b) => b.roundScore - a.roundScore);
        // give the winner(s) a round win
        let winner = tempPlayers[0];
        winner.roundWins++;
        // if there is a tie, give all the winners a round win
        for (let i = 1; i < tempPlayers.length; i++) {
            if (tempPlayers[i].roundScore === winner.roundScore) {
                tempPlayers[i].roundWins++;
            }
        }
        // reset the round scores
        for (let player of this.#players) {
            player.roundScore = 0;
        }
        // increment round number
        this.#roundNumber++;
        return this.#roundNumber;
        
    }

}