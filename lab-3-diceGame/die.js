// Joseph Teague, 4/16/25

class Die
{
    #value
    
    constructor()
    {
        this.#value = 1;
    }

    get value() { return this.#value; }

    roll()
    {
        // Random number from 1 to 6 to simulate a six-sided die
        this.#value = Math.floor(Math.random() * 6) + 1;
    }
}