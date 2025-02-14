import { keyboard, deleteButton, enterButton, closeModalBtn, playAgainBtn } from "./buttons.js";
import { selectLetterHandler, deleteLetterHandler, submitGuessHandler, closeModalHandler, restartGameHandler } from "./handlers.js";
// Event-listeners:
keyboard.addEventListener("click", selectLetterHandler);
deleteButton.addEventListener("click", deleteLetterHandler);
enterButton.addEventListener("click", submitGuessHandler);
// Modal Event-listeners:
closeModalBtn.addEventListener("click", closeModalHandler);
playAgainBtn.addEventListener("click", restartGameHandler);
