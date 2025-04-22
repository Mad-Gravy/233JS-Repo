// Joseph Teague, 4/16/25

class Player {
    // declare private instance variables (aka fields)
    #name
    #number // player number
    #roundScore
    #savedDice = [];
    #rollCount = 0;

    constructor(name) {
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

    // Safely increment roll count
    incrementRollCount() {
        this.#rollCount++;
    }

    // Reset player state between rounds or games
    resetTurn() {
        this.#savedDice = [];
        this.#rollCount = 0;
        this.#roundScore = 0;
    }

    // This method isn't used directly anymore but kept for reference
    roll(dice) {
        for (let die of dice) {
            die.roll();
        }
    }

    // Not needed anymore due to new logic, but could be reused later
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
