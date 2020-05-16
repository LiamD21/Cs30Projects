// Fireworks
// Liam Dallaire
// 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let fireworks;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fireworks = [];
}

function draw() {
  background(220);
  for (let i = 0; i < fireworks.length; i++){
    Firework.move();
    Firework.show();
  }
}

class Firework {
  constructor(x, y, radius, dx, dy, r, g, b, a){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  show() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    ellipse(this.x, this.y, this.radius);
  }
}

function mouseClicked(){
  for (let i = 0; i < 1; i++){
    let firework = new Firework(mouseX, mouseY, 5, random(1, 3), random(1, 3), 255, 0, 0, 255);
    fireworks.push(firework);
  }
}