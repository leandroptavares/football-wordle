import { keyboardLettters, messageBoxElement, enterButton, deleteButton, grid, container, modalBox } from "./buttons.js";
import { CORRECT_ANSWER, attemptNumber, userGuessAsString, isGameRunning, isTheGuessCorret, selectNewAnswer } from "./game-status.js";
const rowElements = Array.from(grid.children);
let currentRow = rowElements
    .map((row) => Array.from(row.querySelectorAll('.tile')))
    .flat()
    .filter((tile) => tile.getAttribute("data-row") === `${attemptNumber.attempt}`);
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
        userGuessAsString.userGuess = userGuessLetters.join("");
    }
    return userGuessLetters;
}
function updateKeyboad(letter, classToAdd) {
    const keyboardLettter = keyboardLettters.find((key) => letter === key.textContent);
    if (keyboardLettter) {
        if (keyboardLettter.classList.contains("correct-color")) {
            return;
        }
        else if (keyboardLettter.classList.contains("present-color") && classToAdd != "absent-color") {
            keyboardLettter.classList.replace("present-color", classToAdd);
        }
        else {
            if (!keyboardLettter.classList.contains("present-color")) {
                keyboardLettter.classList.add(classToAdd);
            }
        }
    }
}
function showMessageBox(statusMessage) {
    if (messageBoxElement) {
        if (statusMessage === "invalid") {
            messageBoxElement.textContent = "Club not found... Try another one!";
            messageBoxElement.classList.add("visible", "invalid-word");
            setTimeout(() => {
                messageBoxElement.classList.remove("visible", "invalid-word");
            }, 2000);
            currentRow.forEach((tile) => {
                tile.classList.add("bg-red-400");
                setTimeout(() => {
                    tile.classList.remove("bg-red-400");
                }, 400);
            });
        }
        else if (statusMessage === "lost") {
            messageBoxElement.textContent = `${CORRECT_ANSWER}`;
            messageBoxElement.classList.add("visible", "game-over");
        }
        else {
            messageBoxElement.textContent = "WOW! You got it";
            messageBoxElement.classList.add("visible", "correct-word");
        }
    }
}
function isRowFull() {
    enterButton.disabled = currentRow.every(tile => tile.textContent?.trim() !== "") ? false : true;
}
function selectNextRow() {
    attemptNumber.attempt++;
    isGameRunning.status = attemptNumber.attempt > 6 ? false : true;
    isGameOver();
    if (isGameRunning.status) {
        currentRow = rowElements
            .map((row) => Array.from(row.querySelectorAll('.tile')))
            .flat()
            .filter((tile) => tile.getAttribute("data-row") === `${attemptNumber.attempt}`);
        isRowFull();
    }
}
function isGameOver() {
    if (!isTheGuessCorret.status && isGameRunning.status) {
        return;
    }
    if (isTheGuessCorret.status) {
        showMessageBox("correct");
    }
    else {
        showMessageBox("lost");
    }
    enterButton.disabled = true;
    deleteButton.disabled = true;
    setTimeout(() => {
        modalBox.classList.remove("hidden");
        container.classList.add("opacity-25", "pointer-events-none");
    }, 3000);
}
function resetGrid() {
    rowElements.forEach((row) => row.querySelectorAll('.tile').forEach((tile) => {
        tile.textContent = "";
        tile.classList.remove("correct-color", "present-color", "absent-color");
    }));
    keyboardLettters.forEach((key) => key.className = "key");
    attemptNumber.attempt = 0;
    isGameRunning.status = true;
    isTheGuessCorret.status = false;
    selectNextRow();
    selectNewAnswer();
    enterButton.disabled = false;
    deleteButton.disabled = false;
    messageBoxElement.classList.remove("visible", "correct-word", "game-over", "invalid-word");
}
export { isRowFull, convertUserGuess, isUserGuessValid, showMessageBox, updateKeyboad, isGameOver, selectNextRow, currentRow, resetGrid };
