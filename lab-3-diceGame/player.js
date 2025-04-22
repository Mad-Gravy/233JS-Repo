// Joseph Teague, 4/16/25



class Player
{
    // declare private instance variables (aka fields)
    #name
    #number // player number
    #roundScore

    constructor(name)
    {
        // Initialize instance variables
        this.#name = name;
        this.#number = 0;  // player number
        this.#roundScore = 0;
    }

    // Getters and Setters
    get name() {return this.#name; }
    get number() { return this.#number; }
    get roundScore() { return this.#roundScore; }

    set number(value) { this.#number = value; }
    set roundScore(value) { this.#roundScore = value; }


    // Method to roll dice
    roll(dice) {
        for (let die of dice) {
            die.roll();
        }
    }

    calculateScore(dice) {
        let gotShip = false;
        let gotCaptain = false;
        let gotCrew = false;
        let cargo = 0;
    
        let remaining = [...dice];
    
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < remaining.length; j++) {
                let val = remaining[j].value;
                if (!gotShip && val === 6) {
                    gotShip = true;
                    remaining.splice(j, 1);
                    break;
                } else if (gotShip && !gotCaptain && val === 5) {
                    gotCaptain = true;
                    remaining.splice(j, 1);
                    break;
                } else if (gotShip && gotCaptain && !gotCrew && val === 4) {
                    gotCrew = true;
                    remaining.splice(j, 1);
                    break;
                }
            }
        }
    
        if (gotShip && gotCaptain && gotCrew) {
            cargo = remaining.reduce((sum, die) => sum + die.value, 0);
            this.roundScore = cargo;
            return cargo;
        } else {
            this.roundScore = 0;
            return 0;
        }
    }

}