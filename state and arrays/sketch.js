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
  translate(shipX, shipY);
  rotate(shipAngle);
  beginShape(SHIP);
  vertex(shipX, shipY - 50);
  vertex(shipX - 25, shipY + 25);
  vertex(shipX, shipY + 10);
  vertex(shipX + 25, shipY + 25);
  endShape(CLOSE);
  translate(-shipX, -shipY);
}

function rotateShip() {
  if (keyIsPressed && key === "a"){
    shipAngle += 10;
  }
  if (keyIsPressed && key === "a"){
    shipAngle -= 10;
  }
}