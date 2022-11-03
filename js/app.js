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
function generateField(container, difficulty, coefficient, status, counter) {
  container.innerHTML = "";
  // Inizializzazione bombe
  const bombs = [];
  generateBombs(bombs, coefficient);
  for (let i = 1; i <= coefficient; i++) {
    const cell = document.createElement("div");
    cell.innerHTML = i;
    cell.classList.add(`board-number-${difficulty}`);
    cell.addEventListener("click", function () {
      if (bombs.includes(i)) {
        const bombed = document.querySelectorAll(`[class*="board-number"]`);
        // for (let x = 0; x < bombs.length; x++) {
        //   bombed[bombs[x] - 1].classList.add("boom");
        // }
        bombs.forEach((element) => {
          bombed[element - 1].classList.add("boom");
        });
        status.innerHTML = `Hai perso dopo ${counter} Caselle corrette`;
      } else if (!this.classList.contains("clicked")) {
        this.classList.add("clicked");
        status.innerHTML = `Scoperte ${++counter} Caselle corrette`;
      }
    });
    container.append(cell);
  }
}
// Localizzazione container celle
const boardContainer = document.getElementById("board");
// Localizzazione stato gioco, inizializzazione counter
const gameStatus = document.getElementById("game-status");
let clickCounter = 0;
// Localizzazione form
const generator = document.getElementById("generator");
// Event listener su submit
generator.addEventListener("submit", function (event) {
  event.preventDefault();
  const chosenDifficulty = document.getElementById("difficulty").value;
  let difficultyCoefficient;
  if (chosenDifficulty === "hard") {
    difficultyCoefficient = 100;
  } else if (chosenDifficulty === "normal") {
    difficultyCoefficient = 81;
  } else if (chosenDifficulty === "easy") {
    difficultyCoefficient = 49;
  }
  generateField(
    boardContainer,
    chosenDifficulty,
    difficultyCoefficient,
    gameStatus,
    clickCounter
  );
  gameStatus.innerHTML = `Scoperte ${clickCounter} Caselle corrette`;
});
