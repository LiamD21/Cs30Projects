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
let shipV = 6;
let xMove;
let yMove;
let movingForward = false;
let turningLeft = false;
let turningRight = false;

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
  triangle(30, 0, -30, 15, -30, -15);
  pop();
}

function turnShip() {
  if (turningRight){
    shipAngle += 0.08;
  }
  if (turningLeft){
    shipAngle -= 0.08;
  }
  if (shipAngle > 2*PI || shipAngle < -2*PI){
    shipAngle = 0;
  }
}

function moveShip() {
  
  yMove = Math.sin(shipAngle) * shipV;
  xMove = Math.cos(shipAngle) * shipV;
  if (movingForward){
    shipY += yMove;
    shipX += xMove;
  }
}

function keyPressed(){
  if (key === "a"){
    turningLeft = true;
  }
  if (key === "d"){
    turningRight = true;
  }
  if (key === "w"){
    movingForward = true;
  }
}

function keyReleased(){
  if (key === "a"){
    turningLeft = false;
  }
  if (key === "d"){
    turningRight = false;
  }
  if (key === "w"){
    movingForward = false;
  }
}