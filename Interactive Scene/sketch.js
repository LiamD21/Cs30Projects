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

function setup() {
  createCanvas(windowWidth, windowHeight);
  carY = height - 45;

  for (i = 0; i < 10; i++){

    let y = 100;
    let vertV = random(1.5, 2.5);
    let horV = random(2, 7);
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

  drawCar();
  drawBall();
  carMoveOnKeyPress();
  writeTime();
  ballBouncing();
  respawnBalls();
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
      ballArray[i].horizontalV -= 0.01;
    }
    else if (ballArray[i].horizontalV < 0){
      ballArray[i].horizontalV += 0.01;
    }

    ballArray[i].ballY += ballArray[i].verticalV;
    ballArray[i].ballX += ballArray[i].horizontalV;
  }
}

function respawnBalls(){
  lastBallSpawned = millis() - lastBallSpawned;

  if (millis() - lastBallSpawned > 3000){
    ballArray.pop(0);
    
    let y = 100;
    let vertV = random(1.5, 2.5);
    let horV = random(2, 7);
    let x = random(75, width - 75);

    let ball = {
      ballX: x,
      ballY: y,
      verticalV: vertV,
      horizontalV: horV
    };
    ballArray.push(ball);
    lastBallSpawned = millis();
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
  seconds = millis()/1000;
  seconds = seconds.toFixed(1);
  text(seconds, 100, 100);
}

function keyPressed(){
  if (key === "a" || key === "d"){
    carV = 5;
  }
}