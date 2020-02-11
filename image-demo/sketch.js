// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shrek;

function preload() {
  shrek = loadImage("assets/shrek.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill("red");
  // rect(mouseX, mouseY, 75, 75);
  image(shrek, mouseX, mouseY)
}
