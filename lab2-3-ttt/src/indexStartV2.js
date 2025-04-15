// JavaScript file for V2 of the Tic Tac Toe game, comments by Brian Bird, winter term 2025.

// Joseph Teague, 4/15/2025


class GameGrid {
  xisNext = true; // Boolean to track the next player
  winner = null; // Stores the winner ("X", "O", or "Tie")
  winningLine = []; // Stores the indices of the winning squares
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
  ]; // Possible winning combinations

  makeMove(index) {
      // If the square is already filled or there is a winner, do nothing
      if (this.squares[index] || this.winner) {
          return;
      }

      // Set the square to "X" or "O" based on xisNext
      this.squares[index] = this.xisNext ? "X" : "O";

      // Check for a winner after the move
      this.checkForWinner();

      // If no winner, check for a tie
      if (!this.winner) {
          this.checkForTie();
      }

      // Toggle xisNext to switch turns
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
      // If all squares are filled and there is no winner, it's a tie
      if (this.squares.every(square => square !== null) && !this.winner) {
          this.winner = "Tie";
      }
  }
}

// Declare a class named GameUI. This class should mainly contain UI code, minimal game-play logic.
class GameUI {
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
      this.gameGrid.makeMove(index); // Call makeMove from GameGrid
      this.updateUI(); // Update the UI after the move
      if (this.gameGrid.winner) {
          this.highlightWinner(); // Highlight the winning line
          this.disableAll(); // Disable further clicks
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

// Initialize the game when the page loads
window.onload = () => {
  new GameUI();
};