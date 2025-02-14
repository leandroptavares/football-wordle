import { keyboardLettters, messageBoxElement, enterButton, deleteButton, grid } from "./buttons.js";
import { CORRECT_ANSWER, attemptNumber, userGuessAsString, isGameRunning, isTheGuessCorret } from "./game-status.js";
import { MessageBox } from "./types.js";

async function isUserGuessValid(userGuess: string): Promise<boolean | undefined> {
  try {
    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${userGuess}`);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data.teams ? true : false;

  } catch (error) {
    console.error("Unable to fetch data:", error);
  }
}

function convertUserGuess(): string[] {
  const userGuessLetters: string[] = [];
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

function updateKeyboad(letter: string, classToAdd: string): void {
  const keyboardLettter = keyboardLettters.find((key) => letter === key.textContent) as HTMLButtonElement

  if (keyboardLettter) {
    if (keyboardLettter.classList.contains("correct-color")) {
      return
    } else if (keyboardLettter.classList.contains("present-color")) {
      keyboardLettter.classList.replace("present-color", classToAdd);
    } else {
      keyboardLettter.classList.add(classToAdd);
    }
  }
}

function showMessageBox(statusMessage: MessageBox): void {
  if (messageBoxElement) {
    if (statusMessage === "invalid") {
      messageBoxElement.textContent = "Club not found... Try another one!";
      messageBoxElement.classList.add("visible", "invalid-word");

      setTimeout(() => {
        messageBoxElement.classList.remove("visible", "invalid-word");
      }, 2000);

      currentRow.forEach((tile) => {
        tile.classList.add("bg-red-400");
        console.log(messageBoxElement)

        setTimeout(() => {
          tile.classList.remove("bg-red-400");
        }, 400);
      });

    } else if (statusMessage === "lost"){
      messageBoxElement.textContent = `${CORRECT_ANSWER}`;
      messageBoxElement.classList.add("visible", "game-over");
    }
    else {
      messageBoxElement.textContent = "WOW! You got it";
      messageBoxElement.classList.add("visible", "correct-word");
    }
  }
}

function isRowFull(): void {
  enterButton.disabled = currentRow.every(tile => tile.textContent?.trim() !== "") ? false : true;
}

function selectNextRow(): void {
  attemptNumber.attempt++
  isGameRunning.status = attemptNumber.attempt > 6 ? false : true;

  isGameOver()

  if (isGameRunning.status) {
  currentRow = rowElements
   .map((row) => Array.from(row.querySelectorAll('.tile') as NodeListOf<HTMLElement>))
   .flat()
   .filter((tile) => tile.getAttribute("data-row") === `${attemptNumber.attempt}`);

   isRowFull();
  }
}

function isGameOver(): void {
  if (!isTheGuessCorret.status && isGameRunning.status){
    return
  }

  if (isTheGuessCorret.status) {
    showMessageBox("correct")
  } else {
    showMessageBox("lost")
  }

  enterButton.disabled = true;
  deleteButton.disabled = true;
 }

 const rowElements = Array.from(grid.children) as HTMLDivElement[];

 let currentRow: HTMLElement[] = rowElements
   .map((row) => Array.from(row.querySelectorAll('.tile') as NodeListOf<HTMLElement>))
   .flat()
   .filter((tile) => tile.getAttribute("data-row") === `${attemptNumber.attempt}`);



 export { isRowFull, convertUserGuess, isUserGuessValid, showMessageBox, updateKeyboad, isGameOver, selectNextRow, currentRow }
