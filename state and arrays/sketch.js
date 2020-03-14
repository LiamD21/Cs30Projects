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
let rockVectors;
let rockArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  window.setInterval(createEnemyRed, 2000);
  window.setInterval(createEnemyGreen, 5000);

  
  shipVectors = [createVector(30, 0), createVector(-30, 20), createVector(-15, 0), createVector(-30, -20)];
  enemyVectorsRed = [createVector(20, 0), createVector(-20, -10), createVector(-20, 10)];
  enemyVectorsGreen = [createVector(35, 0), createVector(10, 10), createVector(10, 27), createVector(-20, 27), createVector(-20, 7.5), createVector(-5, 7.5), createVector(-5, -7.5), createVector(-20, -7.5), createVector(-20, -27), createVector(10, -27), createVector(10, -10)];
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


function createEnemyRed() {

  let enemy = {
    x: 0 ,
    y: random(0, height),
    angle: 0,
    v: random(2, 3.5),
    type: "red"
  };
  enemyArray.push(enemy);
}

function createEnemyGreen(){
  let enemy = {
    x: width,
    y: random(0, height),
    angle: 0,
    v: random(1, 2),
    type: "green"
  };
  enemyArray.push(enemy);
}

function createRock(){
  rockVectors = [createVector(random(-1, -40), random(-1, -40)), createVector(random(1, 40), random(-1, -40)), createVector(random(1, 40), random(1, 40)), createVector(random(-1, -40), random(1, 40))];

  rock = {
    vectors: rockVectors,
    v = random(7, 10)
  }
  rockArray.push(rock);
}

function drawEnemy() {
  for (let i = 0; i < enemyArray.length; i++){
    push();
    translate(enemyArray[i].x, enemyArray[i].y);
    rotate(enemyArray[i].angle);

    if (enemyArray[i].type === "red"){
      fill("red");
      beginShape();
      for (let i = 0; i < enemyVectorsRed.length; i++){
        vertex(enemyVectorsRed[i].x, enemyVectorsRed[i].y);
      }
      endShape(CLOSE);
   }

   if (enemyArray[i].type === "green"){
     fill("green");
     beginShape();
     for (let i = 0; i < enemyVectorsGreen.length; i++){
       vertex(enemyVectorsGreen[i].x, enemyVectorsGreen[i].y);
     }
     endShape(CLOSE);
   }
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