"use strict";

// alert('Привет, человек! Я сценарий игры в крестики нолики. Поиграем?');
const xName = "Игрок"; /* prompt('Кто ты есть?') */
document.querySelector("#player__name").innerHTML = xName;

const gameCell = document.querySelectorAll(".game__cell");
let xScore = 0;
let oScore = 0;
let adsPlace = document.querySelector(".ads");
const resetBtn = document.querySelector(".reset");
const restartBtn = document.querySelector(".restart");
let isGameOn = true;

gameCell.forEach((cell) => {
  if (cell.textContent === "") {
    cell.addEventListener("mouseover", function () {
      cell.style.backgroundColor = "rgba(31, 40, 51, .5)";
    });
    cell.addEventListener("mousedown", function () {
      cell.style.backgroundColor = "rgba(31, 40, 51, .7)";
    });
    cell.addEventListener("mouseup", function () {
      cell.style.backgroundColor = "rgba(31, 40, 51, .6)";
    });
    cell.addEventListener("mouseout", function () {
      cell.style.backgroundColor = "";
    });
  }
  cell.addEventListener("click", function () {
    if (!isGameOn) {
      return;
    } else {
      if (cell.textContent === "") {
        cell.classList.add("x__fill__cell");
        cell.textContent = "x";
        if (checkWin("x")) {
          return (adsPlace.textContent = `${xName} победил(-а)!`);
        } else {
          let emptyCells = getEmptyCells(gameCell);
          let randomTarget = getRandomTarget(emptyCells);
          if (randomTarget) {
            randomTarget.textContent = "o";
            randomTarget.classList.add("o__fill__cell");
            if (checkWin("o")) {
              return (adsPlace.textContent = "Бот победил!");
            }
          }
        }
      }
    }
  });
});

resetBtn.addEventListener("click", function () {
  if (!isGameOn) {
    gameCell.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("o__fill__cell", "x__fill__cell");
    });
    isGameOn = true;
    resetBtn.classList.remove("vibrate-3");
    adsPlace.textContent = `Играем дальше!`;
  } else {
    adsPlace.textContent = "Игра ещё не окончена!";
    setTimeout(function () {
      adsPlace.textContent = "Играем дальше!";
    }, 1000);
  }
});

restartBtn.addEventListener("click", function () {
  gameCell.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("o__fill__cell", "x__fill__cell");
  });
  isGameOn = true;
  resetBtn.classList.remove("vibrate-3");
  xScore = 0;
  document.querySelector("#x__counter").innerHTML = "0";
  oScore = 0;
  document.querySelector("#o__counter").innerHTML = "0";
  adsPlace.textContent = `Начнём сначала!`;
});

function getEmptyCells(cells) {
  let emptyCells = [];
  cells.forEach((cell, index) => {
    if (cell.textContent === "") {
      emptyCells.push(index);
    }
  });
  return emptyCells;
}

function getRandomTarget(taregetArray) {
  if (taregetArray.length > 0) {
    let randomIndex = Math.floor(Math.random() * taregetArray.length);
    return gameCell[taregetArray[randomIndex]];
  } else {
    adsPlace.textContent = "Ничья";
    resetBtn.classList.add("vibrate-3");
    isGameOn = false;
  }
}

function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    let combination = winningCombinations[i];
    let win = true;
    for (let j = 0; j < combination.length; j++) {
      if (gameCell[combination[j]].textContent !== player) {
        win = false;
        break;
      }
    }
    if (win) {
      scoreAdding(player);
      resetBtn.classList.add("vibrate-3");
      isGameOn = false;
      return true;
    }
  }
  return false;
}

function scoreAdding(player) {
  if (player == "x") document.querySelector("#x__counter").innerHTML = ++xScore;
  else document.querySelector("#o__counter").innerHTML = ++oScore;
}
