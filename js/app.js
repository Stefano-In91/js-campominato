"use strict";

// Funzione per generare le celle a seconda di difficoltà e coefficiente
function generateField(string, number) {
  // Localizzazione container celle
  const boardContainer = document.getElementById("board");
  boardContainer.innerHTML = "";

  for (let i = 1; i <= number; i++) {
    const cell = document.createElement("div");
    cell.innerHTML = i;
    cell.classList.add(`board-number-${string}`);
    cell.addEventListener("click", function () {
      this.classList.add("clicked");
    });
    boardContainer.append(cell);
  }
}
// Localizzazione form
const generator = document.getElementById("generator");
// Event listener su submit
generator.addEventListener("submit", function (event) {
  event.preventDefault();
  const difficulty = document.getElementById("difficulty").value;
  let coefficient;
  if (difficulty === "hard") {
    coefficient = 100;
  } else if (difficulty === "normal") {
    coefficient = 81;
  } else if (difficulty === "easy") {
    coefficient = 49;
  }
  generateField(difficulty, coefficient);
});
