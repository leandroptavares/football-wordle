// keyboard:
const keyboard = document.querySelector(".keyboard");
const keyboardLettters = Array.from(keyboard.querySelectorAll('.key'));
// grid:
const grid = document.querySelector(".grid");
// message box:
const messageBoxElement = document.getElementById('message-box');
// enter and delete buttons:
const enterButton = document.getElementById("enter");
const deleteButton = document.getElementById("delete");
// modal:
const modalBox = document.getElementById("modal-box");
const playAgainBtn = document.getElementById("play-again-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
// container:
const container = document.getElementById("container");
enterButton.disabled = true;
export { keyboard, keyboardLettters, enterButton, deleteButton, grid, messageBoxElement, modalBox, container, playAgainBtn, closeModalBtn };
