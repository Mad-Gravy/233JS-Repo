// Joseph Teague, 4/16/25

// Class to represent a player in the game
class Player {
    // Private fields to track player's info and dice
    #name
    #number           // player number
    #roundScore       // score from current round
    #savedDice = []   // holds 6, 5, and 4 if found
    #rollCount = 0    // number of rolls taken this turn

    constructor(name) {
        // Set player name on creation
        this.#name = name;
        this.#number = 0;
        this.#roundScore = 0;
    }

    // Getters
    get name() { return this.#name; }
    get number() { return this.#number; }
    get roundScore() { return this.#roundScore; }
    get savedDice() { return this.#savedDice; }
    get rollCount() { return this.#rollCount; }

    // Setters
    set number(value) { this.#number = value; }
    set roundScore(value) { this.#roundScore = value; }

    // Increase the roll count by 1
    incrementRollCount() {
        this.#rollCount++;
    }

    // Reset player's state before a new round
    resetTurn() {
        this.#savedDice = [];
        this.#rollCount = 0;
        this.#roundScore = 0;
    }
}
