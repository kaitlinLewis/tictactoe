const choice = document
  .querySelectorAll("button")
  .forEach((button) => button.addEventListener("click", playerTurns));
document
  .querySelectorAll(".gameSquare")
  .forEach((square) => square.addEventListener("click", resolveSquare));
document.querySelector(".reset").addEventListener("click", resetGame);

let player1Points = 0;
let player2Points = 0;

let gameboard = ["", "", "", "", "", "", "", "", ""];

const winningArray = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turn = 0;

function playerTurns() {
  if (turn % 2 != 0) {
    return "x";
  } else {
    return "o";
  }
}

function resolveSquare() {
  let currentPlayerSymbol;
  if (playerTurns() === "x") {
    currentPlayerSymbol = "x";
  } else {
    currentPlayerSymbol = "o";
  }
  let currentSpot = Number(this.id);

  // console.log(currentSpot);
  // console.log(playerTurns())
  // console.log(currentPlayerSymbol);
  console.log(turn);

  gameboard[currentSpot] = playerTurns();

  this.classList.add(currentPlayerSymbol);

  let xcont = document.querySelectorAll(".x");
  let xArray = Array.from(xcont).map((item) => item.id);
  console.log(xArray);

  let ocont = document.querySelectorAll(".o");
  let oArray = Array.from(ocont).map((item) => item.id);
  console.log(oArray);

  declareWinner();
  turn++;
}

function declareWinner() {
  winningArray.forEach((e) => {
    const spot1 = e[0];
    const spot2 = e[1];
    const spot3 = e[2];

    if (
      gameboard[spot1] === playerTurns() &&
      gameboard[spot2] === playerTurns() &&
      gameboard[spot3] === playerTurns()
    ) {
      let lazyfix;
      playerTurns() === "o"
        ? (lazyfix = "Leon (Player 1)")
        : (lazyfix = "Bob (Player 2)");
      document.querySelector(
        "#winnerSpace"
      ).innerText = `${lazyfix} wins the round.`;
      afterWin();
    } else if (turn % 9 === 0 && turn !== 0) {
      // document.querySelector("#winnerSpace").innerText = `Tie`
      // afterTie();
    }
  });
}
function afterTie() {
  document
    .querySelectorAll(".gameSquare")
    .forEach((square) => square.removeEventListener("click", resolveSquare));
  console.log(player1Points, player2Points);
}

function afterWin() {
  document
    .querySelectorAll(".gameSquare")
    .forEach((square) => square.removeEventListener("click", resolveSquare));
  if (playerTurns() === "o") {
    player1Points++;
  } else {
    player2Points++;
  }
  console.log(player1Points, player2Points);
}

function resetGame() {
  document.querySelectorAll(".x").forEach((e) => e.classList.remove("x"));
  document.querySelectorAll(".o").forEach((e) => e.classList.remove("o"));
  document
    .querySelectorAll(".gameSquare")
    .forEach((square) => square.addEventListener("click", resolveSquare));
  gameboard = ["", "", "", "", "", "", "", "", ""];
  turn = 0;
  document.querySelector("#winnerSpace").innerText = null;
}

function roundsWinCondition() {
  if (player1Points >= 2) {
    document.querySelector("#winnerSpace").innerText = `Player 1 Wins!`;
  } else if (player2Points >= 2) {
    document.querySelector("#winnerSpace").innerText = `Player 2 Wins!`;
  }
}

// https://github.com/robhitt/tic-tac-toe-js/blob/master/js/main.js
