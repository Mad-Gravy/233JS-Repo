// Joseph Teague, 4/16/25

// Class representing a six-sided die
class Die
{
    #value  // private value of the die

    constructor()
    {
        // Start every die with a default value of 1
        this.#value = 1;
    }

    // Getter to access the current die value
    get value() { return this.#value; }

    // Method to roll the die (random number from 1 to 6)
    roll()
    {
        this.#value = Math.floor(Math.random() * 6) + 1;
    }
}
