// Interactive Scene
// Liam Dallaire
// 2/12/2020
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballX = 800;
let ballY = 300;
let verticalV = -2;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill(245, 135, 66);
  ellipse(ballX, ballY, 75, 75);
  line(ballX, ballY + 75/2, ballX, ballY - 75/2);

  if (ballY > 75/2){
    
  }
}