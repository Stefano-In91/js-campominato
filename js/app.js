"use strict";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// Funzione genera 16bombe in base al coefficiente
function generateBombs(array, number) {
  let bomb;
  for (let i = 1; i <= 16; i++) {
    do {
      bomb = getRandomInt(1, number);
    } while (array.includes(bomb));
    array.push(bomb);
  }
  return array;
}
// Funzione per generare le celle a seconda di difficoltà e coefficiente
function generateField(string, number, status, counter) {
  // Localizzazione container celle
  const boardContainer = document.getElementById("board");
  boardContainer.innerHTML = "";
  // Inizializzazione bombe
  const bombs = [];
  generateBombs(bombs, number);
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
        status.innerHTML = `Hai perso dopo ${counter} Caselle corrette`;
      } else if (!this.classList.contains("clicked")) {
        this.classList.add("clicked");
        status.innerHTML = `Scoperte ${++counter} Caselle corrette`;
      }
    });
    boardContainer.append(cell);
  }
}
// Localizzazione stato gioco, inizializzazione counter
const gameStatus = document.getElementById("game-status");
let clickCounter = 0;
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
  generateField(difficulty, coefficient, gameStatus, clickCounter);
  gameStatus.innerHTML = `Scoperte ${clickCounter} Caselle corrette`;
});
