// keyboard:
const keyboard = document.querySelector(".keyboard") as HTMLDivElement;
const keyboardLettters = Array.from(keyboard.children) as HTMLButtonElement[];

// grid:
const grid = document.querySelector(".grid") as HTMLDivElement;

// message box:
const messageBoxElement = document.getElementById('message-box') as HTMLDivElement;

// enter and delete buttons:
const enterButton = document.getElementById("enter") as HTMLButtonElement;
const deleteButton = document.getElementById("delete") as HTMLButtonElement;

enterButton.disabled = true;

export { keyboard, keyboardLettters, enterButton, deleteButton, grid, messageBoxElement }
