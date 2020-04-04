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
let hit = false;
let homeScreen = true;
let playingGame = false;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  window.setInterval(createEnemy, 2000);
}

function draw() {
  background(220);

  if (playingGame){
    turnShip();
    moveShip();
    drawShip();
    drawEnemy();
    moveEnemy();
    detectHit();
  }
}

function drawShip() {
  shipVectors = [createVector(30, 0), createVector(-30, 20), createVector(-15, 0), createVector(-30, -20)];

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

function detectHit(){
  shipVectors = [createVector(30 + shipX, 0 + shipY), createVector(-30 + shipX, 20 + shipY), createVector(-15 + shipX, 0 + shipY), createVector(-30 + shipX, -20 + shipY)];

  for (let i = 0; i < enemyArray.length; i++){

    hit = collideCirclePoly(enemyArray[i].x, enemyArray[i].y, 50, shipVectors);

    if (hit){
      background("red");
    }
  }
}


function createEnemy() {
  
  let enemy = {
    x: 0,
    y: random(0, height),
    angle: 0,
    v: random(2, 4.5),
  };
  enemyArray.push(enemy);
}

function drawEnemy() {
  for (let i = 0; i < enemyArray.length; i++){
    fill("red");
    ellipse(enemyArray[i].x, enemyArray[i].y, 50, 50);

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