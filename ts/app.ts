// CORRECT ANSWER:
const CORRECT_ANSWER: string = "MILAN";

// custom types:
type BoxMessage = "invalid" | "correct" | "lost"

// game running? /correct answer?
let isGameRunning: boolean = true;
let isTheGuessCorret: boolean = false;
let statusMessage: BoxMessage;

// user attempts:
let attemptNumber: number = 1;

//keyboard:
const keyboard = document.querySelector(".keyboard") as HTMLDivElement;
const keyboardLettters = Array.from(keyboard.children) as HTMLButtonElement[];

//grid and current row/tiles:
const grid = document.querySelector(".grid") as HTMLDivElement;
let currentRow: Element[] = Array.from(grid.children).filter((tile) => tile.getAttribute("data-row") === `${attemptNumber}`);

//enter and delete buttons:
const enterButton = document.getElementById("enter") as HTMLButtonElement;
const deleteButton = document.getElementById("delete") as HTMLButtonElement;

// message box:
const messageBoxElement = document.getElementById('message-box') as HTMLDivElement;

enterButton.disabled = true;
let userGuessAsString: string;


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
  const validGuess: boolean | undefined = await isUserGuessValid(userGuessAsString)

  if (validGuess) {
    checkAnswerHandler(userGuessLetters)
  } else {
    statusMessage = "invalid"
    showMessageBox(statusMessage)
  }
}

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
    userGuessAsString = userGuessLetters.join("");
  }
  return userGuessLetters;
}

function checkAnswerHandler(userGuessLetters: string[]): void {
  let remainingLetters: string[] = [...CORRECT_ANSWER]

  userGuessLetters.forEach((letter: string, index) => {
    if (CORRECT_ANSWER.includes(letter) && remainingLetters.includes(letter)) {
      if (CORRECT_ANSWER[index] === letter) {
        remainingLetters[index] = "";
        currentRow[index].classList.add("correct-color")
        updateKeyboad(letter, "correct-color")
      } else {
        currentRow[index].classList.add("present-color")
        updateKeyboad(letter, "present-color")
      }
    } else {
      currentRow[index].classList.add("absent-color")
      updateKeyboad(letter, "absent-color")
    }
  })

  if (userGuessAsString === CORRECT_ANSWER) {
    isTheGuessCorret = true;
    isGameOver();
  } else {
    selectNextRow();
  }
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

function showMessageBox(statusMessage: BoxMessage): void {
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

    } else if (statusMessage === "lost"){
      messageBoxElement.textContent = `${CORRECT_ANSWER}`;
      messageBoxElement.classList.add("show", "lost");
    }
    else {
      messageBoxElement.textContent = "WOW! You got it!";
      messageBoxElement.classList.add("show", "correct");
    }
  }
}

function isRowFull(): void {
  enterButton.disabled = currentRow.every(tile => tile.textContent?.trim() !== "") ? false : true;
}

function selectNextRow(): void {
  attemptNumber++
  isGameRunning = attemptNumber > 6 ? false : true;

  isGameOver()

  if (isGameRunning) {
    currentRow = Array.from(grid.children).filter((tile) => tile.getAttribute("data-row") === `${attemptNumber}`)
    console.log(`attempt: ${attemptNumber}`)
    isRowFull();
  }
}

function isGameOver(): void {
  if (!isTheGuessCorret && isGameRunning){
    return
  }

  if (isTheGuessCorret) {
    statusMessage = "correct"
    showMessageBox(statusMessage)
  } else {
    statusMessage = "lost"
    showMessageBox(statusMessage)
  }

  enterButton.disabled = true;
  deleteButton.disabled = true;
 }


// Event-listeners:
keyboard.addEventListener("click", selectLetterHandler);
deleteButton.addEventListener("click", deleteLetterHandler);
enterButton.addEventListener("click", submitGuessHandler);

// TODO: add a "try again button"
