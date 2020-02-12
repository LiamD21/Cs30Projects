// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shrek;
let scalar = 1.0;

function preload() {
  shrek = loadImage("assets/shrek.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill("red");
  image(shrek, mouseX, mouseY, shrek.width/1.5*scalar, shrek.height/1.5*scalar);
}

function mouseWheel(event) {
  if (event.delta > 0) {
    scalar *= 1.1;
  }
  else {
    scalar *= 0.9;
  }
}