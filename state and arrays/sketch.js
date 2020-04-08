// State variables and arrays assignment
// Liam Dallaire
// 0/0/0
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shipX;
let shipY;
let SHIP;
let shipAngle = 0;
let shipV = 8;
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
let overStartButton = false;
let lastEnemyCreated = 0;
let bulletArray = [];
let shootBullet;
let overRestartButton = false;
let milkyWay;
let gameStartTime;
let score = 0;
let seconds;
let totalScore;

function preload(){
  milkyWay = loadImage("assets/milkyWay.jpg")
}

function setup() {
  noStroke();
  textAlign(CENTER);
  rectMode(CENTER);    
  createCanvas(windowWidth, windowHeight);

  shipY = height/2;
  shipX = width/2;
}

function draw() {
  if (homeScreen){
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    image(milkyWay, width/2, height/2, width, height);
    drawHomeScreen();
    }

  if (playingGame){
    background(200);
    addEnemies();
    turnShip();
    moveShip();
    drawShip();
    drawEnemy();
    moveEnemy();
    detectHit();
    shipShoots();
    drawBullets();
    keepScore();
  }

  if (gameOver){
    createCanvas(windowWidth, windowHeight);
    image(milkyWay, width/2, height/2, width, height);
    drawGameOver();
  }
}

function drawHomeScreen(){
  textSize(width/8);
  fill("white");
  text("Aliens", width/2, height*2/5);

  overStartButton = collidePointRect(mouseX, mouseY,width/2 - width/14, height*2/3 - height/20, width/7, height/10);

  stroke("black");
  strokeWeight(6);
  if (!overStartButton){
    fill(66, 236, 245);
  }
  else{
    fill(130, 100, 255);
  }
  rect(width/2, height*2/3, width/7, height/10);
  noStroke();
  fill("black");
  textSize(width/25);
  text("START", width/2, height*11/16);
}

function drawGameOver(){
  textSize(width/8);
  fill("red");
  text("Game Over", width/2, height*2/5);

  overRestartButton = collidePointRect(mouseX, mouseY,width/2 - width/14, height*2/3 - height/20, width/5, height/10);

  stroke("black");
  strokeWeight(6);
  if (!overRestartButton){
    fill(66, 236, 245);
  }
  else{
    fill(130, 100, 255);
  }
  rect(width/2, height*2/3, width/5, height/10);
  noStroke();
  fill("black");
  textSize(width/25);
  text("RESTART", width/2, height*11/16);
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
      playingGame = false;
      gameOver = true;
    }
  }
}


function createEnemy() {
  
  let enemy = {
    x: 0,
    y: random(0, height),
    angle: 0,
    v: random(2, 3),
  };
  enemyArray.push(enemy);
}

function addEnemies(){
  if (millis() - lastEnemyCreated >= 2000){
    createEnemy();
    lastEnemyCreated = millis();
  }
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
    shipAngle += 0.1;
  }
  if (turningLeft){
    shipAngle -= 0.1;
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

function shipShoots(){
  if (shootBullet){
    let bullet = {
      x: shipX,
      y: shipY,
      vx: xMove * 5,
      vy: yMove * 5
    };

    bulletArray.push(bullet);
    shootBullet = false;
  }
}

function drawBullets(){
  fill("black");
  for (let i = bulletArray.length - 1; i >= 0; i--){
    ellipse(bulletArray[i].x, bulletArray[i].y, 10, 10);
    bulletArray[i].x += bulletArray[i].vx;
    bulletArray[i].y += bulletArray[i].vy;

    for (let j = enemyArray.length  -1; j >= 0; j--){
      let hit = collideCircleCircle(bulletArray[i].x, bulletArray[i].y, 10, enemyArray[j].x, enemyArray[j].y, 50)
      if (hit){
        enemyArray.splice(j, 1);
        bulletArray.splice(i, 1);
        score += 20;
        break;
      }
    }
  }
}
function keepScore(){
  seconds = (millis() - gameStartTime)/1000;
  seconds = floor(seconds);

  totalScore = seconds + score;

  textSize(width/30);
  textAlign(LEFT);
  fill("white");
  text(totalScore, width/50, height/15);
  textAlign(CENTER);
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
  if (key === " "){
    shootBullet = true;
  }
}

function mouseClicked(){
  if (overStartButton && homeScreen){
    homeScreen = false;
    playingGame = true;
    gameStartTime = millis();
  }
  if (overRestartButton && gameOver){
    gameOver = false;
    enemyArray = [];
    bulletArray = [];
    shipX = width/2;
    shipY = height/2;
    gameStartTime= millis();
    playingGame = true;
  }
}