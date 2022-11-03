"use strict";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// Funzione genera 16bombe in base al coefficiente
function generateBombs(array, number) {
  for (let i = 1; i <= 16; i++) {
    let bomb;
    do {
      bomb = getRandomInt(1, number);
    } while (array.includes(bomb));
    array.push(bomb);
  }
  return array;
}
// Funzione per generare le celle a seconda di difficoltà e coefficiente
function generateField(string, number) {
  // Localizzazione container celle
  const boardContainer = document.getElementById("board");
  boardContainer.innerHTML = "";
  // Inizializzazione bombe
  const bombs = [];
  generateBombs(bombs, number);
  // Inizializzazione counter
  let clickCount;
  for (let i = 1; i <= number; i++) {
    const cell = document.createElement("div");
    cell.innerHTML = i;
    cell.classList.add(`board-number-${string}`);
    cell.addEventListener("click", function () {
      if (bombs.includes(i)) {
        const bombed = document.querySelectorAll(`[class*="board-number"]`);
        for (let x = 0; x < bombs.length; x++) {
          bombed[bombs[x] - 1].classList.add("boom");
        }
      } else if (!this.classList.contains("clicked")) {
        this.classList.add("clicked");
        clickCount++;
      }
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
