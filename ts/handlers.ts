import { isRowFull, convertUserGuess, isUserGuessValid, showMessageBox, updateKeyboad, isGameOver, selectNextRow, currentRow } from "./utils.js";
import { CORRECT_ANSWER, userGuessAsString, isTheGuessCorret } from "./game-status.js";

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
  const userGuessLetters: string[] = convertUserGuess()
  const validGuess: boolean | undefined = await isUserGuessValid(userGuessAsString.userGuess)

  if (validGuess) {
    checkAnswerHandler(userGuessLetters)
  } else {
    showMessageBox("invalid")
  }
}

function checkAnswerHandler(userGuessLetters: string[]): void {
  let remainingLetters: string[] = [...CORRECT_ANSWER]
  let currentRoundLetters: string[] = [...CORRECT_ANSWER]

  userGuessLetters.forEach((letter: string, index) => {
    if (CORRECT_ANSWER.includes(letter) && remainingLetters.includes(letter)) {
      if (CORRECT_ANSWER[index] === letter) {
        remainingLetters[index] = "";
        currentRow[index].classList.add("correct-color")
        updateKeyboad(letter, "correct-color")
      } else {
        if (currentRoundLetters.includes(letter)){
        currentRow[index].classList.add("present-color")
        updateKeyboad(letter, "present-color")
        currentRoundLetters.splice(currentRoundLetters.findIndex(e => e === letter), 1);
        } else {
          currentRow[index].classList.add("absent-color")
          updateKeyboad(letter, "absent-color")
        }
      }
    } else {
      currentRow[index].classList.add("absent-color")
      updateKeyboad(letter, "absent-color")
    }
  })

  if (userGuessAsString.userGuess === CORRECT_ANSWER) {
    isTheGuessCorret.status = true;
    isGameOver();
  } else {
    selectNextRow();
  }
}

export { selectLetterHandler, deleteLetterHandler, submitGuessHandler }
