const droppedZone = document.querySelectorAll(".droppedZone");
const circles = document.querySelectorAll(".circle");
const redField = document.querySelector(".redField");
const blueField = document.querySelector(".blueField");
const gameField = document.querySelector(".gameContainer");
const redDropZone = document.querySelector(".droppeRedZone");
const blueDropZone = document.querySelector(".droppeBlueZone");
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
        console.log("1");
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
  detectPlaceForRedCircle(gameField);
}, 1000);
function detectPlaceForRedCircle(gameField) {
  let coodrinatesOfField = gameField.getBoundingClientRect();
  let coordinatesOfRedZone = redDropZone.getBoundingClientRect();
  let coordinatesOfBlueZone = blueDropZone.getBoundingClientRect();
  let heightOfField = coodrinatesOfField.height;
  let widthOfField = coodrinatesOfField.width;
  let coorditanates = detectRandomCoordinates(heightOfField, widthOfField);
  if (
    coorditanates.randomLeft + coordinatesOfBlueZone.width >
    coodrinatesOfField.width
  ) {
    blueDropZone.style.left =
      coodrinatesOfField.width - coordinatesOfBlueZone.width + "px";
  } else {
    blueDropZone.style.left = coorditanates.randomLeft + "px";
  }
  if (
    coorditanates.randomTop + coordinatesOfBlueZone.height >
    coodrinatesOfField.height
  ) {
    blueDropZone.style.left =
      coodrinatesOfField.height - coordinatesOfBlueZone.height + "px";
  } else {
    blueDropZone.style.top = coorditanates.randomTop + "px";
  }
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
