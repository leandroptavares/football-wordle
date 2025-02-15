// keyboard:
const keyboard = document.querySelector(".keyboard") as HTMLDivElement;
const keyboardLettters = Array.from(keyboard.querySelectorAll('.key')) as HTMLButtonElement[];

// grid:
const grid = document.querySelector(".grid") as HTMLDivElement;

// message box:
const messageBoxElement = document.getElementById('message-box') as HTMLDivElement;

// enter and delete buttons:
const enterButton = document.getElementById("enter") as HTMLButtonElement;
const deleteButton = document.getElementById("delete") as HTMLButtonElement;

// modals:
const modalBox = document.getElementById("modal-box") as HTMLDivElement
const playAgainBtn = document.getElementById("play-again-btn") as HTMLButtonElement;
const closeModalBtn = document.getElementById("close-modal-btn") as HTMLButtonElement;


const modalInstructions = document.getElementById("modal-instructions") as HTMLDivElement
const closeModalInstructionsBtn = document.getElementById("close-modal-instructions-btn") as HTMLButtonElement;

// container:
const container = document.getElementById("container") as HTMLDivElement

enterButton.disabled = true;

export { keyboard, keyboardLettters, enterButton, deleteButton, grid, messageBoxElement, modalBox, container, playAgainBtn, closeModalBtn, modalInstructions, closeModalInstructionsBtn }
