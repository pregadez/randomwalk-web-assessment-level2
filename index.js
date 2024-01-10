//get all elements from dom
document.addEventListener("DOMContentLoaded", () => {
  const gameAlert = document.getElementById("gameAlert");
  const gameOutcome = document.getElementById("gameOutcome");
  const currentPlayerElement = document.getElementById("currentPlayer");
  const boardContainer = document.getElementById("board-container");
  const playerX = document.getElementById("playerX");
  const playerO = document.getElementById("playerO");
  const lastWinnerElement = document.getElementById("lastWinner");
  const resetGameButton = document.getElementById("resetGameButton");
  const resetButton = document.getElementById("resetButton");
  //initialize the necessary variables
  let scoreX = 0;
  let scoreO = 0;
  let lastWinner = null;
  //variables for the current game
  let currentPlayer = "X";
  let boardState = ["", "", "", "", "", "", "", "", ""];
  let gameOver = false;
  let winner = null;
  //creating the 3x3 grid
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i; //assigning index to each cell
    cell.addEventListener("click", () => handleCellClick(i)); //use eventlistener to handle each click
    boardContainer.appendChild(cell); //displaying the current clicked cell value
  }

  displayCurrentPlayer(); //to know whose turn it is

  function displayCurrentPlayer() {
    currentPlayerElement.textContent = `Current Player: ${currentPlayer}`;
  }

  function handleCellClick(index) {
    if (!gameOver && boardState[index] === "") {
      //ensures that only empty cells are handled
      boardState[index] = currentPlayer;
      updateBoard(); //
      checkWinner();
      checkDraw();
      switchPlayer(); //switching player after each turn
      displayCurrentPlayer();
    } else {
      displayAlert("Cell is occupied, please choose an empty cell.");
    }
  }

  function updateBoard() {
    const cells = document.querySelectorAll(".cell"); //get all cell values
    cells.forEach((cell, index) => {
      //each cell along with its index is iterated
      cell.textContent = boardState[index]; //to display the current cell value in HTML
    });
  }

  function checkWinner() {
    //the following are all the possible winning patterns that can be achieved in tic-tac-toe, this is hardcoded as it is a constant always
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination; //array destructing
      if (
        //if a exists, and a is same as b and c then it is the winner
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        winner = currentPlayer;
        gameOver = true;
        lastWinner = winner;
        if (winner === "X") {
          scoreX++;
        } else if (winner === "O") {
          scoreO++;
        }
        updateScore();
        displayOutcome(`Player ${winner} wins!`);
        setTimeout(resetGame, 3000); //reset game after every win
        break;
      }
    }
  }

  function checkDraw() {
    if (!boardState.includes("") && !winner) {
      //if no cell is empty and there is no winner
      gameOver = true;
      displayOutcome("It's a draw!");
      setTimeout(resetGame, 3000); //reset game after every draw
    }
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  resetGameButton.addEventListener("click", () => {
    resetGame(); //reset only current game variables
    displayAlert("Game and Score reset. Score remains the same.");
  });

  resetButton.addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;
    lastWinner = null;
    updateScore(); //reset score and last winner
    resetGame();
    displayAlert("Game and Score reset.");
  });

  function updateScore() {
    playerX.textContent = `Player X: ${scoreX}`;
    playerO.textContent = `Player O: ${scoreO}`;
  }

  function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    winner = null;
    updateBoard();
    clearOutcome(); //ensures no message is displayed
    clearAlert();
    displayCurrentPlayer();
    displayLastWinner(); //display lastwinner if exists
  }

  function displayAlert(text) {
    gameAlert.textContent = text; //cell occupied or game reset
    setTimeout(clearAlert, 3000);
  }

  function clearAlert() {
    gameAlert.textContent = "";
  }
  function displayOutcome(text) {
    gameOutcome.textContent = text; //game result
    setTimeout(clearOutcome, 3000);
  }
  function clearOutcome() {
    gameOutcome.textContent = "";
  }

  function displayLastWinner() {
    if (lastWinner)
      lastWinnerElement.textContent = `Last Winner: ${lastWinner}`;
    else lastWinnerElement.textContent = "";
  }
});
