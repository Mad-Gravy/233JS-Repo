// JavaScript file for V2 of the Tic Tac Toe game, comments by Brian Bird, winter term 2025.

// Joseph Teague, 4/15/2025

// These comments provide less detail than those in previous apps you completed
//  with the idea that you will do more problem-solving on your own in this one.

// Declare a class named GameGrid. This class should only contain game-play logic, no UI code.
class GameGrid{
    /* Declare and initialize properties */
    xisNext = true; 
    winner = null; 
    winningLine = [];
    /* Add a constructor 
      - initialize an array of 9 elements with null values
      - initialize a 2-D aray to hold cordiantes of the 9 winning line combinations. */
      squares = Array(9).fill(null); // Represents the game board
      lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];
    /* Add methods needed for the game logic. Suggestions:
        - makeMove with a parameter of index, this puts an X or O in the array
        - checkForWinner loops through the array looking for a winning line
        - checkForTie loops through the array looking for a tie game */
        makeMove(index) {
          if (this.squares[index] || this.winner) {
              return;
          }

          this.squares[index] = this.xisNext ? "X" : "O";
    
          this.checkForWinner();
    
          if (!this.winner) {
              this.checkForTie();
          }    

          this.xisNext = !this.xisNext;
      }
    
      checkForWinner() {
          for (const line of this.lines) {
              const [a, b, c] = line;
              if (
                  this.squares[a] &&
                  this.squares[a] === this.squares[b] &&
                  this.squares[a] === this.squares[c]
              ) {
                  this.winner = this.squares[a];
                  this.winningLine = line;
                  return;
              }
          }
      }
    
      checkForTie() {
          if (this.squares.every(square => square !== null) && !this.winner) {
              this.winner = "Tie";
          }
      }      }

// Declare a class named GameUI. This class should mainly contain UI code, minimal game-play logic.
class GameUI {
    /* Declare and initialize properties */

    /* Add a constructor 
       - Instantiate the GameGrid class.
       - Add event listeners to the 9 game squares. */

    /* Add methods needed for the UI. Suggestions:
        - highlightWinner turns the winning row red
        - disableAll disables the event handlers for all squares.
        - handleClick is a handler for cards on the HTML page, calls makeMove */
        constructor() {
          this.gameGrid = new GameGrid(); // Instantiate the GameGrid class
          this.statusElement = document.getElementById("status"); // Status message element
          this.squares = document.getElementsByName("square"); // Game squares
          this.addEventListeners(); // Add event listeners to the squares
      }
    
      addEventListeners() {
          this.squares.forEach((square, index) => {
              square.onclick = () => this.handleClick(index);
          });
      }
    
      handleClick(index) {
          this.gameGrid.makeMove(index); 
          this.updateUI(); 
          if (this.gameGrid.winner) {
              this.highlightWinner(); 
              this.disableAll(); 
          }
      }
    
      updateUI() {
          this.squares.forEach((square, index) => {
              square.innerHTML = this.gameGrid.squares[index] || "&nbsp;";
          });
          this.statusElement.innerHTML = this.gameGrid.winner
              ? this.gameGrid.winner === "Tie"
                  ? "It's a Tie!"
                  : `Winner: ${this.gameGrid.winner}`
              : `Next Player: ${this.gameGrid.xisNext ? "X" : "O"}`;
      }
    
      highlightWinner() {
          if (this.gameGrid.winningLine.length > 0) {
              this.gameGrid.winningLine.forEach(index => {
                  this.squares[index].classList.add("red");
              });
          }
      }
    
      disableAll() {
          this.squares.forEach(square => {
              square.onclick = null;
          });
      }
    }

  window.onload = () => {
    new GameUI();
  };