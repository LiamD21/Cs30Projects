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

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill(245, 135, 66);
  ellipse(ballX, ballY, 75, 75);
  line(ballX, ballY + 75/2, ballX, ballY - 75/2);
  noFill();
  arc(ballX - 75/4, ballY - 75/4, 75, 75, 0, THIRD_PI)

  if (ballY < height - 75/2.5){
    verticalV += 0.35;
  }
  else if (ballY >= height - 75/2){
    verticalV *= -0.75;
  }

  if (ballX > width - 75/2|| ballX < 75/2){
    horizontalV *= -1;
  }

  if (horizontalV > 0){
    horizontalV -= 0.01;
  }
  else if (horizontalV < -0){
    horizontalV += 0.01;
  }

  ballY += verticalV;
  ballX += horizontalV;
}