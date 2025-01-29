// keyboard:
const keyboard = document.querySelector(".keyboard");
const keyboardLettters = Array.from(keyboard.children);
// grid:
const grid = document.querySelector(".grid");
// message box:
const messageBoxElement = document.getElementById('message-box');
// enter and delete buttons:
const enterButton = document.getElementById("enter");
const deleteButton = document.getElementById("delete");
enterButton.disabled = true;
export { keyboard, keyboardLettters, enterButton, deleteButton, grid, messageBoxElement };
