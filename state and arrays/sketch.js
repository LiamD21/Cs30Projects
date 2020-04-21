// State variables and arrays assignment
// Liam Dallaire
// 18/04/2020
//
// Extra for Experts:
// I have a very basic enemy AI, the enemy following around to attempt to beat the player
// I have also translate and rotate to turn the player's Ship
// the home screen and game over screen will scale based on the window size

//variables
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
let numbersArray = [];
let bomb = false;
let bombX; 
let bombY;
let bombSize = 10;
let lastBomb = 0;
let instructions = false;
let overPlayButton = false;
let bombTimer = 0;

function preload(){
  //loading the background for the gameover and start screens

  milkyWay = loadImage("assets/milkyWay.jpg");
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
    // all functions for the home screen
    imageBackground();
    drawHomeScreen();
    }
  
  if (instructions){
    // all functions for the instructions screen
    background(220);
    drawInstructionScreen();
  }

  if (playingGame){
    // all functions for the game playing
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
    writeScoreOnKill();
    useBomb();
    checkBombHit();
    bombTimeLeft();
  }

  if (gameOver){
    //all functions for the gameover screen
    imageBackground();
    drawGameOver();
  }
}

function imageBackground(){
  //creates the milky way image in the background
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  image(milkyWay, width/2, height/2, width, height);
}

function drawHomeScreen(){
  //creates the homescreen

  textSize(width/8);
  fill("white");
  text("Aliens", width/2, height*2/5);

  //checks if the mouse is over the button for UI
  overStartButton = collidePointRect(mouseX, mouseY,width/2 - width/14, height*2/3 - height/20, width/7, height/10);

  stroke("black");
  strokeWeight(6);

  //Creates the UI
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

function drawInstructionScreen(){
  
  // Checks mouse position for the UI
  overPlayButton = collidePointRect(mouseX, mouseY,width/2 - width/14, height*2/3 - height/20, width/7, height/10);

  stroke("black");
  strokeWeight(6);

  //Creates the UI
  if (!overPlayButton){
    fill(66, 236, 245);
  }
  else{
    fill(130, 100, 255);
  }

  //The instructions written out
  rect(width/2, height*2/3, width/7, height/10);
  noStroke();
  fill("black");
  textSize(width/25);
  text("PLAY", width/2, height*11/16);

  textSize(width/40);
  text("Use W to go forwards and A and D to turn", width/2, height/20);
  text("Press SPACE to shoot at your enemies, eliminating one will give you 20 pts", width/2, height * 2/20);
  text("every five seconds you can use your bomb by pressing E,", width/2, height * 3/20);
  text("The bomb will eliminate enemies in a raduis around you for 10 pts each", width/2, height * 4/20);
  text("The top right corner shows the bomb timer and when you can use it", width/2, height * 5/20);
  text("The top left is your total score which also goes up 1pt per second", width/2, height * 6/20);
}

function drawGameOver(){

  // creates the gameover screen
  textSize(width/8);
  fill("red");
  text("Game Over", width/2, height*2/5);

  //checks mouse position for the UI
  overRestartButton = collidePointRect(mouseX, mouseY,width/2 - width/14, height*2/3 - height/20, width/5, height/10);

  stroke("black");
  strokeWeight(6);

  // Creates the UI
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

  // writes the finsl score
  fill("white");
  text("You Scored " + totalScore + " Pts", width/2, height*9/16);
}

function drawShip() {
  //The ship is drawn at the proper angle and position using translate and rotate
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
  //ship vectors set as it is not translated when checking for a hit
  shipVectors = [createVector(30 + shipX, 0 + shipY), createVector(-30 + shipX, 20 + shipY), createVector(-15 + shipX, 0 + shipY), createVector(-30 + shipX, -20 + shipY)];

  //check each enemy for a hit with the player
  for (let i = 0; i < enemyArray.length; i++){

    hit = collideCirclePoly(enemyArray[i].x, enemyArray[i].y, 50, shipVectors);

    //if there is a hit we go to the gameover screen
    if (hit){
      playingGame = false;
      gameOver = true;
    }
  }
}

function createEnemy() {
  // an enemy is created and added to the array of enemies
  let enemy = {
    x: 0,
    y: random(0, height),
    angle: 0,
    v: random(2, 3),
  };
  enemyArray.push(enemy);
}

function addEnemies(){
  // every two seconds a new enemy is created
  if (millis() - lastEnemyCreated >= 2000){
    createEnemy();
    lastEnemyCreated = millis();
  }
}

function drawEnemy() {
  // each enemy is drawn at the proper position
  for (let i = 0; i < enemyArray.length; i++){
    fill("red");
    ellipse(enemyArray[i].x, enemyArray[i].y, 75, 75);
  }
}

function moveEnemy(){
  for (let i = 0; i < enemyArray.length; i++){

    // we set the angle of the enemy so that it faces the player
    enemyArray[i].angle = Math.atan2(shipY - enemyArray[i].y, shipX - enemyArray[i].x);

    // we move the enemy the appropriate x and y distance based on its velocity value
    enemyArray[i].y += Math.sin(enemyArray[i].angle) * enemyArray[i].v;
    enemyArray[i].x += Math.cos(enemyArray[i].angle) * enemyArray[i].v;
  }
}

function turnShip() {
  // if the ship is in any state of movement, we change the angle but keep it in the range of -2PI to 2PI
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
  // the ship is moved the appropriate distance of x and y based on the velocity
  yMove = Math.sin(shipAngle) * shipV;
  xMove = Math.cos(shipAngle) * shipV;
  if (movingForward){
    shipY += yMove;
    shipX += xMove;
  }
}

function shipShoots(){
  // a bullet is created and added to an array of bullets
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
  // each bullet is drawn
  fill("black");
  for (let i = bulletArray.length - 1; i >= 0; i--){
    ellipse(bulletArray[i].x, bulletArray[i].y, 20, 20);

    // each bullet is moved the appropriate amount x and y
    bulletArray[i].x += bulletArray[i].vx;
    bulletArray[i].y += bulletArray[i].vy;

    // we check each bullet for a collision with each enemy
    for (let j = enemyArray.length  -1; j >= 0; j--){
      let hit = collideCircleCircle(bulletArray[i].x, bulletArray[i].y, 20, enemyArray[j].x, enemyArray[j].y, 75)

      // if it hits, the added points is displayed in a slightly animated number, added to the array of numbers currently displayed
      if (hit){
        let number = {
          x: enemyArray[j].x,
          y: enemyArray[j].y,
          score: "+20",
          size: 100
        };
        numbersArray.push(number);

        enemyArray.splice(j, 1);
        bulletArray.splice(i, 1);
        score += 20;
        break;
      }
    }
  }
}

function writeScoreOnKill(){
  // for each number in the number array, it si written and slowly gets bigger, giving an animated look
  for (let i = numbersArray.length - 1; i >= 0; i--){
    fill("red");
    textSize(width/numbersArray[i].size);
    text(numbersArray[i].score, numbersArray[i].x, numbersArray[i].y);
    if (numbersArray[i].size > 40){
      numbersArray[i].size --;
    }
    else{
      numbersArray.splice(i, 1);
    }
  }
}

function keepScore(){
  // every second since the start of the game, you get one point
  seconds = (millis() - gameStartTime)/1000;
  seconds = floor(seconds);

  // the total score is displayed, seconds added with the points from kills
  totalScore = seconds + score;

  textSize(width/30);
  textAlign(LEFT);
  fill("white");
  text(totalScore, width/50, height/15);
  textAlign(CENTER);
}

function useBomb(){
  // if a bomb is used, it is creatwed and slowly gets bigger until it is done
  if (bomb){
    fill("white");
    ellipse(bombX, bombY, bombSize, bombSize);
    if (bombSize < 400){
      bombSize += 10;
      lastBomb = millis();
    }
    else{
      bomb = false;
    }
  }
}

function checkBombHit(){
  // each enemy is checked to see if it got hit by the bomb
  for (let i = enemyArray.length - 1; i >= 0; i--){
    hit = collideCircleCircle(enemyArray[i].x, enemyArray[i].y, 75, bombX, bombY, bombSize);

    if (hit && bomb){

      //if there is a hit, points are displayed
      let number = {
        x: enemyArray[i].x,
        y: enemyArray[i].y,
        score: "+10",
        size: 100
      };
      enemyArray.splice(i, 1);
      numbersArray.push(number);
      score += 10;
    }
  }
}

function bombTimeLeft(){
  // a timer is created to show how much time between bomb uses
  bombTimer = (millis() - lastBomb)/1000;
  bombTimer = floor(bombTimer);
  bombTimer = 5 - bombTimer;

  textSize(width/30);
  textAlign(RIGHT);
  fill("black");

  if(bombTimer > 0){
    text(bombTimer, width * 49/50, height/15);
  }
  else if (bombTimer <= 0){
    text("READY", width * 49/50, height/15);
  }

  textAlign(CENTER);
}



function keyPressed(){
  // keys pressed to move
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
  // when keys are released, movement stops
  if (key === "a"){
    turningLeft = false;
  }
  if (key === "d"){
    turningRight = false;
  }
  if (key === "w"){
    movingForward = false;
  }
  // keys released after being pressed to use weapons
  if (key === " "){
    shootBullet = true;
  }
  if (key === "e"){
    if (millis() - lastBomb > 5000){
      bomb = true;
      bombSize= 10;
      bombX = shipX;
      bombY= shipY;
    }
  }
}

function mouseClicked(){
  // if start button is clicked we go to the instructions
  if (overStartButton && homeScreen){
    homeScreen = false;
    instructions = true;
  }

  // if play button is pressed, we go to the game
  if (overPlayButton && instructions){
    instructions = false;
    playingGame = true;
    gameStartTime = millis();
    lastBomb = 0;
  }

  // if restart button is pressed, we go to the game again
  if (overRestartButton && gameOver){
    gameOver = false;
    enemyArray = [];
    bulletArray = [];
    shipX = width/2;
    shipY = height/2;
    gameStartTime= millis();
    score = 0;
    numbersArray = [];
    bomb = false;
    lastBomb = 0;
    playingGame = true;
  }
}