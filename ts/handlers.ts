import { isRowFull, convertUserGuess, isUserGuessValid, showMessageBox, updateKeyboad, isGameOver, selectNextRow, currentRow, resetGrid } from "./utils.js";
import { CORRECT_ANSWER, userGuessAsString, isTheGuessCorret } from "./game-status.js";
import { modalBox, container, modalInstructions, enterButton } from "./buttons.js";

function selectLetterHandler(event: MouseEvent): void {
  const chosenLetterButton = event.target as HTMLButtonElement;
  if (chosenLetterButton.id !== "enter" && chosenLetterButton.id !== "delete") {
    const chosenLetter: string | null = chosenLetterButton.textContent;
    if (chosenLetter && chosenLetter.length === 1) {
      addLetterHandler(chosenLetter);
    }
  }
}

function addLetterHandler(letter: string): void {
  const firstEmptyTile = currentRow.find((tile) => tile.textContent?.trim() === "");

  if (firstEmptyTile) {
    firstEmptyTile.textContent = letter;
    isRowFull()
  }
}

function deleteLetterHandler(): void {
  const allTilesEmpty: boolean = currentRow.every(tile => tile.textContent?.trim() === "");

  if (!allTilesEmpty) {
    const lastLetterInput = currentRow.reverse().find((tile) => tile.textContent?.trim() !== "") as Element;

    if (lastLetterInput) {
      lastLetterInput.textContent = "";
      currentRow.reverse()
      isRowFull()
    }
  }
}

async function submitGuessHandler() {
  console.log("running submit funcion")
  enterButton.disabled = true

  const userGuessLetters: string[] = convertUserGuess()
  const validGuess: boolean | undefined = await isUserGuessValid(userGuessAsString.userGuess)

  if (validGuess) {
    checkAnswerHandler(userGuessLetters)
  } else {
    showMessageBox("invalid")
  }
}

function checkAnswerHandler(userGuessLetters: string[]): void {
  let remainingLetters: string[] = [...CORRECT_ANSWER];

  // First, mark the correct letters. Remove the found letters from the remainingLetters array
  userGuessLetters.forEach((letter: string, index) => {
    if (CORRECT_ANSWER[index] === letter) {
      remainingLetters[index] = "";
      currentRow[index].classList.add("correct-color");
      updateKeyboad(letter, "correct-color");
    }
  });

  // Then, mark the present and absent letters
  userGuessLetters.forEach((letter: string, index) => {
    if (CORRECT_ANSWER[index] !== letter) { // this skips the correct letters
      if (remainingLetters.includes(letter)) { // this ensures we mark only letters that are still in the remainingLetters array
        currentRow[index].classList.add("present-color");
        updateKeyboad(letter, "present-color");

        remainingLetters[remainingLetters.indexOf(letter)] = ""; // remove the 1st occurrence of letter from the remainingLetters array
      } else {
        currentRow[index].classList.add("absent-color");
        updateKeyboad(letter, "absent-color");
      }
    }
  });

  if (userGuessAsString.userGuess === CORRECT_ANSWER) {
    isTheGuessCorret.status = true;
    isGameOver();
  } else {
    selectNextRow();
  }
}

function closeModalHandler(): void {
  modalInstructions.classList.add("hidden")
  modalBox.classList.add("hidden");
  container.classList.remove("opacity-25", "pointer-events-none");
}

function restartGameHandler(): void {
  resetGrid()
  closeModalHandler()
}

export { selectLetterHandler, deleteLetterHandler, submitGuessHandler, closeModalHandler, restartGameHandler }
