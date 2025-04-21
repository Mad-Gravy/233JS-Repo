/* I/O code for the Going to Boston dice game.
   Written by Brian Bird, 4/16/2024, revised 4/26/24 */

// Global constants
const NUMBER_OF_DIE = 3;
const NUMBER_OF_SIDES = 6;   // number of die images--representing the sides of the die

let boston = new Game();

// Initialize the web page
document.getElementById("endTurn").disabled = true;
document.getElementById("endRound").disabled = true;
document.getElementById("roll").disabled = true;
enableSetAside(false);

/***************************************************/
/******  Click Event handlers for the buttons ******/
/***************************************************/

// start button handler
document.getElementById("start").onclick = () => {
    // this handler adds players and starts the game
    let player1Name = document.getElementById("player1Name").value;
    let player2Name = document.getElementById("player2Name").value;
    if (player1Name === "" || player2Name === "") {
        alert("Please enter both player names.");
    }
    else {
        boston.addPlayer(player1Name);
        boston.addPlayer(player2Name);
        document.getElementById("player").textContent = boston.getCurrentPlayer().name;
        document.getElementById("player1").textContent = player1Name;
        document.getElementById("player2").textContent = player2Name;
        document.getElementById("start").disabled = true;
        document.getElementById("roll").disabled = false;
    }
}

// roll button handler
document.getElementById("roll").onclick = () => {
    boston.rollDice();
    // set the images to the dice values
    let values = boston.getDiceValues();
    for (let i = 0; i < boston.dice.length; i++) {
        document.getElementById(`${i}`).src = `images/die${values[i]}.png`;
    }
    // allow the dice images to be clicked, don't allow another roll
    enableSetAside(true);
    document.getElementById("roll").disable = true;
}

// endTurn button handler
document.getElementById("endTurn").onclick = () => {
     // enable the End Round button if player 2's turn ended
     if (boston.getCurrentPlayer().number === 2) {
        document.getElementById("endRound").disabled = false;
        document.getElementById("roll").disabled = true;
    }
    else {
        document.getElementById("roll").disabled = false;
    }
    boston.endTurn();  // will switch players and reset the dice
    document.getElementById("points").textContent = "";
    document.getElementById("player").textContent = boston.getCurrentPlayer().name;
    // clear the score dice images
    for (let i = 0; i < NUMBER_OF_DIE; i++) {
        document.getElementById(`s${i}`).src = "";
    }
    displayDice();
    // disable the end turn button
    document.getElementById("endTurn").disabled = true;

    displayScores();
}

// endRound button handler
document.getElementById("endRound").onclick = () => {
    document.getElementById("round").textContent = boston.endRound();
    document.getElementById("roll").disabled = false;
    document.getElementById("endRound").disabled = true;
    displayScores();
}

/*******************************************************/
/******************  Helper functions  *****************/
/*******************************************************/

// Move die from the roll die area to the score die area
function setAside() {
    // remove the die from the dice array and add it to the scoreDice array 
    let value = boston.setDieAside(Number(this.id));
    displayDice();
    // add the image to the score dice area
    document.getElementById(`s${boston.scoreDice.length - 1}`).src = `images/die${value}.png`;
    // update the score
    document.getElementById("points").textContent = boston.getScore();
    // if there are three dice in the scoreDice array, enable the end turn button, disable roll
    if (boston.scoreDice.length === NUMBER_OF_DIE) {
        document.getElementById("endTurn").disabled = false;
        document.getElementById("roll").disabled = true;
    }
    else {
        document.getElementById("roll").disabled = false;
    }
    // only allow one die to be set aside aside, enable rolling
    enableSetAside(false);

}

// Enable or disable the click event on dice images
function enableSetAside(canSetAside) {
    // Event handlers for the dice images so they can be clicked and set aside die for scoring
    for (let i = 0; i < NUMBER_OF_DIE; i++) {
        let imgElement = document.getElementById(`${i}`);
        if (canSetAside) {
            imgElement.onclick = setAside;
            imgElement.style = "opacity: 1.0;";
        }
        else {
            imgElement.onclick = null;
            imgElement.style = "opacity: 0.5;";
        }
    }
}

// Display the dice values
function displayDice() {
    let values = boston.getDiceValues();
    for (let i = 0; i < NUMBER_OF_DIE; i++) {
        // set the img to the dice value
        if (i < values.length) {
            document.getElementById(`${i}`).src = `images/die${values[i]}.png`;
        }
        else {
            // set the img to "" for the die that aren't there any more
            document.getElementById(`${i}`).src = "";
        }
    }
}

// display the scores of the players
function displayScores() {
    for (let i = 0; i < boston.players.length; i++) {
        document.getElementById(`player${i + 1}RoundScore`).textContent = boston.players[i].roundScore;
        document.getElementById(`player${i + 1}RoundWins`).textContent = boston.players[i].roundWins;
    }
}


/*******************************/
/******** Just for Testing *****/
/*******************************/

// test to see if players are switched after the score is calculated
function testSwitchPlayer() {
    console.log("Current player: " + boston.getCurrentPlayer().number);
    boston.setDieAside(0);
    boston.setDieAside(0);
    boston.setDieAside(0);
    let score = boston.getScore();
    console.log("Score: " + score);
    console.log("Current player: " + boston.getCurrentPlayer().number);
    score = boston.getScore();
    console.log("Score: " + score);
    console.log("Current player: " + boston.getCurrentPlayer().number);
}
