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
let enemyArray = [];
let shipVectors;
let enemyVectors;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  window.setInterval(createEnemy, 2000);

  shipVectors = [createVector(30, 0), createVector(-30, 20), createVector(-15, 0), createVector(-30, -20)];
  enemyVectors = [createVector(20, 0), createVector(-20, -10), createVector(-20, 10)];
}

function draw() {
  background(220);

  turnShip();
  moveShip();
  drawShip();
  drawEnemy();
  moveEnemy();
}

function drawShip() {
  push();
  translate(shipX, shipY);
  rotate(shipAngle);
  fill("blue");
  beginShape();
  for (let i = 0; i < shipVectors.length; i++){
    vertex(shipVectors[i].x, shipVectors[i].y);
  }
  endShape(CLOSE);
  pop();
}


function createEnemy() {
  
  let enemy = {
    x: 0,
    y: random(0, height),
    angle: 0,
    v: random(2, 3.5),
    type: "red"
  };
  enemyArray.push(enemy);
}

function drawEnemy() {
  for (let i = 0; i < enemyArray.length; i++){
    push();
    translate(enemyArray[i].x, enemyArray[i].y);
    rotate(enemyArray[i].angle);

    fill("red");
    beginShape();
    for (let i = 0; i < enemyVectors.length; i++){
      vertex(enemyVectors[i].x, enemyVectors[i].y);
    }
    endShape(CLOSE);
    pop();
  }
}

function moveEnemy(){
  for (let i = 0; i < enemyArray.length; i++){
    enemyArray[i].angle = Math.atan2(shipY - enemyArray[i].y, shipX - enemyArray[i].x);

    enemyArray[i].y += Math.sin(enemyArray[i].angle) * enemyArray[i].v;
    enemyArray[i].x += Math.cos(enemyArray[i].angle) * enemyArray[i].v;
  }
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