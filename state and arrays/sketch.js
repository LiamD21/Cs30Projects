// State variables and arrays assignment
// Liam Dallaire
// 0/0/0
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

  turnShip();
  drawShip();
}

function drawShip() {

  push();
  translate(shipX, shipY);
  rotate(shipAngle);
  triangle(shipX, shipY + 30, shipX - 15, shipY - 30, shipX + 15, shipY - 30);
  pop();
}

function turnShip() {
  if (keyIsPressed && key === "a"){
    shipAngle += 3;
  }
  if (keyIsPressed && key === "d"){
    shipAngle -= 3;
  }
}