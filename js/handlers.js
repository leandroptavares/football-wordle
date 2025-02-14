import { isRowFull, convertUserGuess, isUserGuessValid, showMessageBox, updateKeyboad, isGameOver, selectNextRow, currentRow, resetGrid } from "./utils.js";
import { CORRECT_ANSWER, userGuessAsString, isTheGuessCorret } from "./game-status.js";
import { modalBox, container } from "./buttons.js";
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
    const validGuess = await isUserGuessValid(userGuessAsString.userGuess);
    if (validGuess) {
        checkAnswerHandler(userGuessLetters);
    }
    else {
        showMessageBox("invalid");
    }
}
function checkAnswerHandler(userGuessLetters) {
    let remainingLetters = [...CORRECT_ANSWER];
    let currentRoundLetters = [...CORRECT_ANSWER];
    userGuessLetters.forEach((letter, index) => {
        if (CORRECT_ANSWER.includes(letter) && remainingLetters.includes(letter)) {
            if (CORRECT_ANSWER[index] === letter) {
                remainingLetters[index] = "";
                currentRow[index].classList.add("correct-color");
                updateKeyboad(letter, "correct-color");
            }
            else {
                if (currentRoundLetters.includes(letter)) {
                    currentRow[index].classList.add("present-color");
                    updateKeyboad(letter, "present-color");
                    currentRoundLetters.splice(currentRoundLetters.findIndex(e => e === letter), 1);
                }
                else {
                    currentRow[index].classList.add("absent-color");
                    updateKeyboad(letter, "absent-color");
                }
            }
        }
        else {
            currentRow[index].classList.add("absent-color");
            updateKeyboad(letter, "absent-color");
        }
    });
    if (userGuessAsString.userGuess === CORRECT_ANSWER) {
        isTheGuessCorret.status = true;
        isGameOver();
    }
    else {
        selectNextRow();
    }
}
function closeModalHandler() {
    modalBox.classList.add("invisible", "opacity-0");
    container.classList.remove("opacity-25", "pointer-events-none");
}
function restartGameHandler() {
    resetGrid();
    closeModalHandler();
}
export { selectLetterHandler, deleteLetterHandler, submitGuessHandler, closeModalHandler, restartGameHandler };
