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
let carV = 5;
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

function setup() {
  createCanvas(windowWidth, windowHeight);

  carY = height - 45;

  for (i = 0; i < 5; i++){

    let y = 100;
    let vertV = random(1, 3);
    let horV = random(-7, 7);
    let x = random(75, width - 75);

    let ball = {
      ballX: x,
      ballY: y,
      verticalV: vertV,
      horizontalV: horV
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
  text("Dropper", width/2 - 400, height/2)
  fill("black");
  textSize(50);
  text("Press Space To Start", width/2  - 300, height/2 + 200);
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
    stroke("black");
    fill(245, 135, 66);
    ellipse(ballArray[i].ballX, ballArray[i].ballY, 75, 75);
    line(ballArray[i].ballX, ballArray[i].ballY + 75/2, ballArray[i].ballX, ballArray[i].ballY - 75/2);
  }
}

function drawCar(){
  fill(175, 0, 100);
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
      let y = 100;
      let vertV = random(1, 3);
      let horV = random(-7, 7);
      let x = random(75, width - 75);

      let ball = {
        ballX: x,
        ballY: y,
        verticalV: vertV,
        horizontalV: horV
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
      carV ++;
    }
    else if (keyIsDown(65)){
      carX -= carV;
      carV ++;
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
    carV = 1;
  }
  if (startScreen){
    if (key === " "){
      startScreen = false;
      playingGame = true;
      gameStartTime = millis();
      lastNewBall = gameStartTime;
      lastBallSpawned = gameStartTime;
    }
  }
}