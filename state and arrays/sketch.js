// Project Title
// Liam Dallaire
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shipX = 200;
let shipY = 200;
let SHIP;
let shipAngle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  drawShip();
  rotateShip();
}

function drawShip() {
  triangle(shipX, shipY + 30, shipX - 15, shipY - 30, shipX + 15, shipY - 30);

  push();
  translate(shipX, shipY);
  rotate(shipAngle);
  pop();
}

function rotateShip() {
  if (keyIsPressed && key === "a"){
    shipAngle += 3;
  }
  if (keyIsPressed && key === "a"){
    shipAngle -= 3;
  }
}