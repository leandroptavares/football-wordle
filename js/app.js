import { keyboard, deleteButton, enterButton } from "./buttons.js";
import { selectLetterHandler, deleteLetterHandler, submitGuessHandler } from "./handlers.js";
// Event-listeners:
keyboard.addEventListener("click", selectLetterHandler);
deleteButton.addEventListener("click", deleteLetterHandler);
enterButton.addEventListener("click", submitGuessHandler);
