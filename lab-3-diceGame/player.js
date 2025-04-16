// Joseph Teague, 4/16/25

class Player
{
    // declare private instance variables (aka fields)
    #name
    #number // player number
    #roundWins
    #roundScore

    constructor(name)
    {
        // Initialize instance variables
        this.#name = name;
        this.#number = 0;  // player number
        this.#roundWins = 0;
        this.#roundScore = 0;
    }

    // Getters and Setters
    get name() {return this.#name; }
    get number() { return this.#number; }
    get roundScore() { return this.#roundScore; }
    get roundWins() { return this.#roundWins; }

    set number(value) { this.#number = value; }
    set roundScore(value) { this.#roundScore = value; }
    set roundWins(value) { this.#roundWins = value; }

}