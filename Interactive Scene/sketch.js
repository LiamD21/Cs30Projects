// Interactive Scene
// Liam Dallaire
// 2/12/2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let carX = 300;
let carY;
let carWidth = 60;
let carHeight = 40;
let carV;
let seconds;
let ballArray = [];
let i;
let lastBallSpawned = 0;
let ballToRespawn;
let lastNewBall = 0;
let respawnTime = 500;
let startScreen = true;
let playingGame = false;
let gameOverScreen = false;
let finalScore;
let numberOfStartingBalls = 4;
let gameStartTime;
let colorList  = ["blue", "red", "green", "yellow", "pink", "purple", "orange", "magenta", "cyan", "black", "brown", "grey"];
let thisBallColor;
let ballPit;
let highScores;
let r = 200;
let g = 100;
let b = 200;

function preload() {
  ballPit = loadImage("assets/ballpit.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  carY = height - 45;

  for (i = 0; i < numberOfStartingBalls; i++){

    thisBallColor = random(colorList);

    let y = 100;
    let vertV = random(1, 3);
    let horV = random(-7, 7);
    let x = random(75, width - 75);
    let color = thisBallColor;

    let ball = {
      ballX: x,
      ballY: y,
      verticalV: vertV,
      horizontalV: horV,
      color: color
    };
    ballArray.push(ball);
  }
}

function draw() {
  background(220);

  if (startScreen){
    drawStartScreen();
  }

  if (playingGame){
    drawCar();
    drawBall();
    carMoveOnKeyPress();
    writeTime();
    ballBouncing();
    respawnBalls();
    detectHit();
    addBalls();
  }

  if (gameOverScreen){
    drawGameOver();
  }
}

function drawStartScreen(){
  textSize(200);
  fill(50, 50, 200);
  text("Dropper", width/2 - 400, height/2);
  fill("black");
  textSize(100);
  stroke(20);
  fill("yellow");
  rect(width/2  - 200, height/2 + 100, 300, 150);
  fill("black");
  text("Start", width/2  - 150, height/2 + 200);
  if(mouseX > width/2 - 200 && mouseX < width/2 + 100 && mouseY > height/2 + 100 && mouseY < height/2 + 250){
    fill("orange");
    rect(width/2  - 200, height/2 + 100, 300, 150);
    fill("black");
    text("Start", width/2  - 150, height/2 + 200);
  }
  fill(r ,g ,b);
  rect(width/6, height/6, 100, 100);

  fill("red");
  rect(width/6 - 100, height/6, 50, 50);
  fill("blue");
  rect(width/6 - 100, height/6 + 75, 50, 50);
  fill("green");
  rect(width/6 - 100, height/6 + 150, 50, 50);
}

function drawGameOver(){
  textSize(200);
  fill(200, 50, 50);
  text("GAME OVER", width/2 - 600, height/2);
  fill("black");
  textSize(50);
  text("You Survived For " + str(finalScore) + " Seconds!", width/2 - 350, height/2 + 100);
  text("Press Space To Play Again", width/2 - 300, height/2 + 200);
}

function drawBall(){
  for (i = 0; i < ballArray.length; i++){
    fill(ballArray[i].color);
    ellipse(ballArray[i].ballX, ballArray[i].ballY, 75, 75);
  }
}

function createBallArray(){
  for (i = 0; i < numberOfStartingBalls; i++){

    thisBallColor = random(colorList);

    let y = 100;
    let vertV = random(1, 3);
    let horV = random(-7, 7);
    let x = random(75, width - 75);
    let color = thisBallColor;

    let ball = {
      ballX: x,
      ballY: y,
      verticalV: vertV,
      horizontalV: horV,
      color: color
    };
    ballArray.push(ball);
  }
}

function drawCar(){
  fill(r, g, b);
  noStroke();
  rect(carX, carY, carWidth, carHeight);
  rect(carX - 20,carY + 17, 20, 22);
  rect(carX + carWidth, carY + 17, 20, 22);
  fill("black");
  ellipse(carX, carY + carHeight - 3, 22, 22);
  ellipse(carX + carWidth, carY + carHeight - 3, 22, 22);
}

function ballBouncing(){
  for (i = 0; i < ballArray.length; i++){

    if (ballArray[i].ballY < height - 75/2){
      ballArray[i].verticalV += 0.35;
    }
    else if (ballArray[i].ballY > height - 75/2){
      ballArray[i].verticalV *= -0.9;
      ballArray[i].ballY = height - 75/2;
    }

    if (ballArray[i].ballX > width - 75/2|| ballArray[i].ballX < 75/2){
      ballArray[i].horizontalV *= -1;
    }

    if (ballArray[i].horizontalV > 0){
      ballArray[i].horizontalV -= 0.005;
    }
    else if (ballArray[i].horizontalV < 0){
      ballArray[i].horizontalV += 0.005;
    }

    ballArray[i].ballY += ballArray[i].verticalV;
    ballArray[i].ballX += ballArray[i].horizontalV;
  }
}

function detectHit(){
  for (i = 0; i < ballArray.length; i++){
    if (ballArray[i].ballX - 75/2 < carX + carWidth + 20 && ballArray[i].ballX + 75/2 > carX + 20){
      if (ballArray[i].ballY + 75/2 > carY){
        finalScore = seconds;
        playingGame = false;
        gameOverScreen = true;
      }
    }
  }
}

function addBalls(){
  if (playingGame){
    if (millis() - lastNewBall > 3000){
      thisBallColor = random(colorList);

      let y = 100;
      let vertV = random(1, 3);
      let horV = random(-7, 7);
      let x = random(75, width - 75);
      let color = thisBallColor;

      let ball = {
        ballX: x,
        ballY: y,
        verticalV: vertV,
        horizontalV: horV,
        color: color
      };
      ballArray.push(ball);

      lastNewBall = millis();
    }
  }
}

function respawnBalls(){
  if (playingGame){
    if (millis() - lastBallSpawned > respawnTime){
      ballToRespawn = random(0, ballArray.length - 1);
      ballToRespawn = Math.round(ballToRespawn);

      ballArray[ballToRespawn].ballY = 100;
      ballArray[ballToRespawn].ballX = random(75, width - 75);
      ballArray[ballToRespawn].verticalV = random(1, 3);
      ballArray[ballToRespawn].horizontalV = random(-7, 7);

      lastBallSpawned = millis();
    }
  }
}

function carMoveOnKeyPress(){
  if (carX >= 25 && carX <= width - carWidth - 25){
    if (keyIsDown(68)){
      carX += carV;
      carV += 0.5;
    }
    else if (keyIsDown(65)){
      carX -= carV;
      carV += 0.5;
    }
  }
  if (carX < 25 || carX > width - carWidth - 25){
    if (carX < 25){
      carX = 25;
    }
    else{
      carX = width - carWidth - 25;
    }
  }
}

function writeTime(){
  textSize(50);
  fill(0);
  seconds = (millis() - gameStartTime)/1000;
  seconds = seconds.toFixed(1);
  text(seconds, 100, 100);
}

function keyPressed(){
  if (key === "a" || key === "d"){
    carV = 10;
  }
  if (gameOverScreen) {
    if (key === " ") {
      gameOverScreen = false;
      startScreen = true;
      ballArray = [];
      createBallArray();
    }
  }
}

function mouseClicked(){
  if(startScreen && mouseX > width/2 - 200 && mouseX < width/2 + 100 && mouseY > height/2 + 100 && mouseY < height/2 + 250){
    startScreen = false;
    playingGame = true;
    gameStartTime = millis();
    lastNewBall = gameStartTime;
    lastBallSpawned = gameStartTime;
  }
}

function mouseWheel(event){
  if (startScreen && mouseX > width/6 - 100 && mouseX < width/6 - 50 && mouseY > height/6 && mouseY < height/6 + 50){
    if(event.delta > 0 && r > 0){
      r -= 20;
    }
    if(event.delta < 0 && r < 255){
      r += 20;
    }
  }
  if (startScreen && mouseX > width/6 - 100 && mouseX < width/6 - 50 && mouseY > height/6 + 75 && mouseY < height/6 + 125){
    if(event.delta > 0 &&  b > 0){
      b -= 20;
    }
    if(event.delta < 0 &&  b < 255){
      b += 20;
    }
  }
  if (startScreen && mouseX > width/6 - 100 && mouseX < width/6 - 50 && mouseY > height/6 + 150 && mouseY < height/6 + 200){
    if(event.delta > 0 && g > 0){
      g -= 20;
    }
    if(event.delta < 0 && g < 255){
      g += 20;
    }
  }
}