"use strict";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// Funzione genera 16bombe in base al coefficiente
function generateBombs(array, wantedNumber, ceiling) {
  let bomb;
  // for (let i = 0; i < wantedNumber; i++) {
  //   do {
  //     bomb = getRandomInt(1, ceiling);
  //   } while (array.includes(bomb));
  //   array.push(bomb);
  // }
  while (array.length < wantedNumber) {
    bomb = getRandomInt(1, ceiling);
    if (!array.includes(bomb)) {
      array.push(bomb);
    }
  }
  return array;
}
// Funzione per generare le celle a seconda di difficoltà e coefficiente
function generateField(container, difficulty, coefficient, status, counter) {
  container.innerHTML = "";
  status.innerHTML = `Scoperte ${counter} Caselle corrette`;
  // Inizializzazione bombe
  const bombs = [];
  const wantedBombs = 16;
  generateBombs(bombs, wantedBombs, coefficient);
  console.log(bombs);
  // Creazione celle
  for (let i = 1; i <= coefficient; i++) {
    const cell = document.createElement("div");
    cell.innerHTML = i;
    cell.classList.add(`board-number-${difficulty}`);
    // Generazione Event listener su click caselle bomba o giuste
    cell.addEventListener("click", function () {
      if (bombs.includes(i)) {
        const bombed = document.querySelectorAll(`[class*="board-number"]`);
        // for (let x = 0; x < bombs.length; x++) {
        //   bombed[bombs[x] - 1].classList.add("boom");
        // }
        bombs.forEach((element) => {
          bombed[element - 1].classList.add("boom");
        });
        // Messaggio Sconfitta
        status.innerHTML = `Hai perso dopo ${counter} Caselle corrette`;
        setTimeout(function () {
          alert(`Hai perso dopo ${counter} Caselle corrette`);
          alert(`La pagina verrà ricaricata proseguendo`);
          container.innerHTML = "";
          status.innerHTML = "Inizia a Giocare!";
        }, 0);
      } else if (!this.classList.contains("clicked")) {
        this.classList.add("clicked");
        status.innerHTML = `Scoperte ${++counter} Caselle corrette`;
        // Messaggio Vittoria
        if (counter === coefficient - wantedBombs) {
          status.innerHTML = `Scoperte tutte le Caselle corrette!!`;
          setTimeout(function () {
            alert(`Hai vinto cliccando ${counter} Caselle corrette!!`);
            alert(`La pagina verrà ricaricata proseguendo`);
            container.innerHTML = "";
            status.innerHTML = "Inizia a Giocare!";
          }, 0);
        }
      }
    });

    container.append(cell);
  }
}

// Localizzazione form
const generator = document.getElementById("generator");
// Event listener su submit
generator.addEventListener("submit", function (event) {
  event.preventDefault();

  // Localizzazione container celle
  const boardContainer = document.getElementById("board");
  // Localizzazione difficoltà
  const chosenDifficulty = document.getElementById("difficulty").value;
  // Definizione coefficiente
  let difficultyCoefficient;
  if (chosenDifficulty === "hard") {
    difficultyCoefficient = 100;
  } else if (chosenDifficulty === "normal") {
    difficultyCoefficient = 81;
  } else if (chosenDifficulty === "easy") {
    difficultyCoefficient = 49;
  }
  // Localizzazione stato gioco, inizializzazione counter
  const gameStatus = document.getElementById("game-status");
  let clickCounter = 0;

  generateField(
    boardContainer,
    chosenDifficulty,
    difficultyCoefficient,
    gameStatus,
    clickCounter
  );
});
