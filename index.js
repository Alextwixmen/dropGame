const droppedZone = document.querySelectorAll(".droppedZone");
const circles = document.querySelectorAll(".circle");
const redField = document.querySelector(".redField");
const blueField = document.querySelector(".blueField");
const gameField = document.querySelector(".gameContainer");
const redDropZone = document.querySelector(".droppeRedZone");
const blueDropZone = document.querySelector(".droppeBlueZone");
const timer = document.querySelector(".timer");
const seconds = document.querySelector(".seconds");
circles.forEach((element) => {
  element.addEventListener("dragstart", handlerDragStart);
  element.addEventListener("dragend", handlerDragEnd);
  element.addEventListener("drag", handlerDrag);
  element.addEventListener("dragleave", handlerDragleave);
});
let parentOfDraggedElement = null;
let draggedElement = null;

function handlerDragStart() {
  if (this.classList[0] === "blueCircle") {
    draggedElement = this;
    parentOfDraggedElement = this.parentElement;
  } else if (this.classList[0] === "redCircle") {
    draggedElement = this;
    parentOfDraggedElement = this.parentElement;
  }
}

function handlerDragEnd(event) {}

function handlerDrag() {}
function handlerDragleave(event) {}
droppedZone.forEach((element) => {
  element.addEventListener("dragenter", handlerDragEnter);
  element.addEventListener("dragleave", handlerDragleave);
  element.addEventListener("dragover", handlerDragOver);
  element.addEventListener("drop", handlerDrop);
});

function handlerDragEnter(event) {
  event.preventDefault();
}

function handlerDragOver(event) {
  event.preventDefault();
}
function handlerDrop(event) {
  Array.from(parentOfDraggedElement.children).forEach((element) => {
    if (
      element === draggedElement &&
      parentOfDraggedElement.getAttribute("data-color") ===
        this.getAttribute("data-color")
    ) {
      if (
        element.getAttribute("data-color") ===
        redField.getAttribute("data-color")
      ) {
        copyOffElement = element.cloneNode(true);
        copyOffElement.classList.add("colorOfWingRed");
        redField.appendChild(copyOffElement);
      }
      if (
        element.getAttribute("data-color") ===
        blueField.getAttribute("data-color")
      ) {
        copyOffElement = element.cloneNode(true);
        copyOffElement.classList.add("colorOfWingBlue");
        blueField.appendChild(copyOffElement);
      }
      element.remove();
    }
  });
}

setInterval(function () {
  detectPlaceForCircle(gameField);
}, 1000);
let timerNumber = detectGameTime();
function detectPlaceForCircle(gameField) {
  if (!timerNumber()) {
    blueDropZone.remove();
    redDropZone.remove();
    return;
  }
  let int = getRandomInt(0, 1);
  let coordinatesForCircle;
  let typeOfCircle;
  let coodrinatesOfField = gameField.getBoundingClientRect();
  let heightOfField = coodrinatesOfField.height;
  let widthOfField = coodrinatesOfField.width;
  let coordinatesOfRedZone = redDropZone.getBoundingClientRect();
  let coordinatesOfBlueZone = blueDropZone.getBoundingClientRect();
  let coorditanates = detectRandomCoordinates(heightOfField, widthOfField);
  if (int) {
    typeOfCircle = blueDropZone;
    coordinatesForCircle = blueDropZone.getBoundingClientRect();
    redDropZone.classList.remove("visibility");
    blueDropZone.classList.add("visibility");
  } else {
    typeOfCircle = redDropZone;
    coordinatesForCircle = redDropZone.getBoundingClientRect();
    blueDropZone.classList.remove("visibility");
    redDropZone.classList.add("visibility");
  }
  if (
    coorditanates.randomLeft + coordinatesForCircle.width >
    coodrinatesOfField.width
  ) {
    typeOfCircle.style.left =
      coodrinatesOfField.width - coordinatesForCircle.width + "px";
  } else {
    typeOfCircle.style.left = coorditanates.randomLeft + "px";
  }
  if (
    coorditanates.randomTop + coordinatesForCircle.height >
    coodrinatesOfField.height
  ) {
    typeOfCircle.style.left =
      coodrinatesOfField.height - coordinatesForCircle.height + "px";
  } else {
    typeOfCircle.style.top = coorditanates.randomTop + "px";
  }
}
function getRandomInt(min, max) {
  // 0 - красный кружок, 1 - синий кружок;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function detectRandomCoordinates(heightOfField, widthOfField) {
  let objWithRandomCoordinates = {
    randomLeft: 0,
    randomTop: 0,
  };
  randomLeft = Math.random() * (widthOfField - 0) + 0;
  randomTop = Math.random() * (heightOfField - 0) + 0;
  objWithRandomCoordinates.randomLeft += randomLeft;
  objWithRandomCoordinates.randomTop += randomTop;
  return objWithRandomCoordinates;
}

function detectGameTime() {
  let number = 60;
  return function () {
    if (number != 0) {
      seconds.innerHTML = --number;
      if (number > 40) {
        console.log("больше 40-ка");
        seconds.style.color = "green";
      }
      if (number > 15 && number < 40) {
        seconds.style.color = "orange";
      }
      if (number < 15) {
        seconds.style.color = "red";
      }
      return true;
    } else {
      return false;
    }
  };
}
