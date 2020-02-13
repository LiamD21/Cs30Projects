// Interactive Scene
// Liam Dallaire
// 2/12/2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballX = 800;
let ballY = 300;
let verticalV = 2;
let horizontalV = 5;
let carX = 300;
let carY;
let carWidth = 80;
let carHeight = 45;

function setup() {
  createCanvas(windowWidth, windowHeight);
  carY = height - 54;
}

function draw() {
  background(220);

  fill(175, 0, 100);
  noStroke();
  rect(carX, carY, carWidth, carHeight);
  rect(carX - 25,carY + 18, 25, 27);
  rect(carX + carWidth, carY + 18, 25, 27);
  fill("black");
  ellipse(carX, carY + carHeight - 4, 25, 25);
  ellipse(carX + carWidth, carY + carHeight - 4, 25, 25);

  stroke("black");
  fill(245, 135, 66);
  ellipse(ballX, ballY, 75, 75);
  line(ballX, ballY + 75/2, ballX, ballY - 75/2);

  if (ballY < height - 75/2){
    verticalV += 0.35;
  }
  else if (ballY > height - 75/2){
    verticalV *= -0.75;
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

  if (carX >= 25 && carX <= width - carWidth - 25){
    if (keyIsDown(68)){
      carX += 8;
    }
    if (keyIsDown(65)){
      carX -= 8;
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

function keyPressed(){
  if (key === "m"){
    ballX = 800;
    ballY = 300;
  }
}