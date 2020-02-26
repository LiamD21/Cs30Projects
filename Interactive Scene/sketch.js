// Interactive Scene
// Liam Dallaire
// 2/12/2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let carX = 300;
let carY;
let carWidth = 80;
let carHeight = 45;
let carV = 5;
let seconds;

function setup() {
  createCanvas(windowWidth, windowHeight);
  carY = height - 54;
  let ballArray = [];
  for (i = 0; i < 11; i++){

    let y = random(75 ,width - 75);
    let vertV = random(1.5, 2.5);
    let horV = random(2, 7);
    let x = height - 100;

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
  ballBouncing();
  carMoveOnKeyPress();
  writeTime();
}

function drawBall(){
  for (i = 0; i <= ballArray.length; i++){
    stroke("black");
    fill(245, 135, 66);
    ellipse(ballArray[i].ballX, ballY, 75, 75);
    line(ballX, ballY + 75/2, ballX, ballY - 75/2);
  }
}

function drawCar(){
  fill(175, 0, 100);
  noStroke();
  rect(carX, carY, carWidth, carHeight);
  rect(carX - 25,carY + 18, 25, 27);
  rect(carX + carWidth, carY + 18, 25, 27);
  fill("black");
  ellipse(carX, carY + carHeight - 4, 25, 25);
  ellipse(carX + carWidth, carY + carHeight - 4, 25, 25);
}

function ballBouncing(){
  if (ballY < height - 75/2){
    verticalV += 0.35;
  }
  else if (ballY > height - 75/2){
    verticalV *= -0.8;
    ballY = height - 75/2;
  }

  if (ballX > width - 75/2|| ballX < 75/2){
    horizontalV *= -1;
  }

  if (horizontalV > 0){
    horizontalV -= 0.01;
  }
  else if (horizontalV < 0){
    horizontalV += 0.01;
  }

  ballY += verticalV;
  ballX += horizontalV;
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