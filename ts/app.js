"use strict";
// CORRECT ANSWER:
const CORRECT_ANSWER = "INTER";
// game running? /correct answer?
let isGameRunning = true;
let isTheGuessCorret = false;
let statusMessage;
// user attempts:
let attemptNumber = 1;
//keyboard:
const keyboard = document.querySelector(".keyboard");
const keyboardLettters = Array.from(keyboard.children);
//grid and current row/tiles:
const grid = document.querySelector(".grid");
let currentRow = Array.from(grid.children).filter((tile) => tile.getAttribute("data-row") === `${attemptNumber}`);
//enter and delete buttons:
const enterButton = document.getElementById("enter");
const deleteButton = document.getElementById("delete");
// message box:
const messageBoxElement = document.getElementById('message-box');
enterButton.disabled = true;
let userGuessAsString;
function selectLetterHandler(event) {
    const chosenLetterButton = event.target;
    if (chosenLetterButton.id !== "enter" && chosenLetterButton.id !== "delete") {
        const chosenLetter = chosenLetterButton.textContent;
        if (chosenLetter && chosenLetter.length === 1) {
            addLetterHandler(chosenLetter);
        }
    }
}
function addLetterHandler(letter) {
    const firstEmptyTile = currentRow.find((tile) => tile.textContent?.trim() === "");
    if (firstEmptyTile) {
        firstEmptyTile.textContent = letter;
        isRowFull();
    }
}
function deleteLetterHandler() {
    const allTilesEmpty = currentRow.every(tile => tile.textContent?.trim() === "");
    if (!allTilesEmpty) {
        const lastLetterInput = currentRow.reverse().find((tile) => tile.textContent?.trim() !== "");
        if (lastLetterInput) {
            lastLetterInput.textContent = "";
            currentRow.reverse();
            isRowFull();
        }
    }
}
async function submitGuessHandler() {
    const userGuessLetters = convertUserGuess();
    const validGuess = await isUserGuessValid(userGuessAsString);
    if (validGuess) {
        checkAnswerHandler(userGuessLetters);
    }
    else {
        statusMessage = "invalid";
        showMessageBox(statusMessage);
    }
}
async function isUserGuessValid(userGuess) {
    try {
        const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${userGuess}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data.teams ? true : false;
    }
    catch (error) {
        console.error("Unable to fetch data:", error);
    }
}
function convertUserGuess() {
    const userGuessLetters = [];
    if (currentRow.every(tile => tile.textContent?.trim() !== "")) {
        currentRow.forEach(tile => {
            if (tile.textContent) {
                userGuessLetters.push(tile.textContent);
            }
        });
        userGuessAsString = userGuessLetters.join("");
    }
    return userGuessLetters;
}
function checkAnswerHandler(userGuessLetters) {
    let remainingLetters = [...CORRECT_ANSWER];
    userGuessLetters.forEach((letter, index) => {
        if (CORRECT_ANSWER.includes(letter) && remainingLetters.includes(letter)) {
            if (CORRECT_ANSWER[index] === letter) {
                remainingLetters[index] = "";
                currentRow[index].classList.add("correct-color");
                updateKeyboad(letter, "correct-color");
            }
            else {
                currentRow[index].classList.add("present-color");
                updateKeyboad(letter, "present-color");
            }
        }
        else {
            currentRow[index].classList.add("absent-color");
            updateKeyboad(letter, "absent-color");
        }
    });
    if (userGuessAsString === CORRECT_ANSWER) {
        isTheGuessCorret = true;
        isGameOver();
    }
    else {
        selectNextRow();
    }
}
function updateKeyboad(letter, classToAdd) {
    const keyboardLettter = keyboardLettters.find((key) => letter === key.textContent);
    if (keyboardLettter) {
        if (keyboardLettter.classList.contains("correct-color")) {
            return;
        }
        else if (keyboardLettter.classList.contains("present-color")) {
            keyboardLettter.classList.replace("present-color", classToAdd);
        }
        else {
            keyboardLettter.classList.add(classToAdd);
        }
    }
}
function showMessageBox(statusMessage) {
    if (messageBoxElement) {
        if (statusMessage === "invalid") {
            messageBoxElement.textContent = "Club not found... Try another one!";
            messageBoxElement.classList.add("show", "invalid");
            setTimeout(() => {
                messageBoxElement.classList.remove("show", "invalid");
            }, 2000);
            currentRow.forEach((tile) => {
                tile.classList.add("invalid-input");
                setTimeout(() => {
                    tile.classList.remove("invalid-input");
                }, 400);
            });
        }
        else if (statusMessage === "lost") {
            messageBoxElement.textContent = `${CORRECT_ANSWER}`;
            messageBoxElement.classList.add("show", "lost");
        }
        else {
            messageBoxElement.textContent = "WOW! You got it!";
            messageBoxElement.classList.add("show", "correct");
        }
    }
}
function isRowFull() {
    enterButton.disabled = currentRow.every(tile => tile.textContent?.trim() !== "") ? false : true;
}
function selectNextRow() {
    attemptNumber++;
    isGameRunning = attemptNumber > 6 ? false : true;
    isGameOver();
    if (isGameRunning) {
        currentRow = Array.from(grid.children).filter((tile) => tile.getAttribute("data-row") === `${attemptNumber}`);
        console.log(`attempt: ${attemptNumber}`);
        isRowFull();
    }
}
function isGameOver() {
    if (!isTheGuessCorret && isGameRunning) {
        return;
    }
    if (isTheGuessCorret) {
        statusMessage = "correct";
        showMessageBox(statusMessage);
    }
    else {
        statusMessage = "lost";
        showMessageBox(statusMessage);
    }
    enterButton.disabled = true;
    deleteButton.disabled = true;
}
// Event-listeners:
keyboard.addEventListener("click", selectLetterHandler);
deleteButton.addEventListener("click", deleteLetterHandler);
enterButton.addEventListener("click", submitGuessHandler);
// TODO: add a "try again button"
