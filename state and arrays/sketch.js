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
let shipV = 5;
let xMove;
let yMove;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  turnShip();
  moveShip();
  drawShip();
}

function drawShip() {

  push();
  translate(shipX, shipY);
  rotate(shipAngle);
  triangle(0, 30, -15, -30, 15, -30);
  pop();
}

function turnShip() {
  if (keyIsPressed && key === "a"){
    shipAngle += 0.12;
  }
  if (keyIsPressed && key === "d"){
    shipAngle -= 0.12;
  }
  if (shipAngle > 2*PI || shipAngle < -2*PI){
    shipAngle = 0;
  }
}

function moveShip() {
  text(shipAngle, 100,100);
  
  // if the angle in in intervals of pi/2 in certain places, sin gives the y change and cos gives the x change
  if (shipAngle > - 2*PI && shipAngle < - 7*PI/4 || shipAngle > -5*PI/4 && shipAngle < -3*PI/4 || shipAngle > -PI/4 && shipAngle < PI/4 && shipAngle < 5*PI/4 && shipAngle > 7*PI/4 || shipAngle > 7*PI/4 && shipAngle < 2*PI){
    xMove = Math.sin(shipAngle) * shipV;
    yMove = Math.cos(shipAngle) * shipV;
    if (keyIsPressed && key === "w"){
      shipY += yMove;
      shipX += xMove;
    }
  }
}