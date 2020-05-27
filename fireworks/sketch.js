// Fireworks
// Liam Dallaire
// 
//
// Extra for Experts:
// the firework forms a circle, using trig to make each piece travel at a diffenent angle around the circle

let fireworks = [];
let birds = [];
let up;
let down;

function setup() {
  createCanvas(windowWidth, windowHeight);
  window.setInterval(addBird, 2000);
}

function draw() {
  background(20);
  for (let firework of fireworks){
    firework.move();
    firework.show();
    if (firework.a <= 0){
      fireworks.splice(firework, 1);
    }
  }

  for (let bird of birds){
    bird.update();
    bird.display();
    bird.isAlive();
  }
}

function addBird(){
  let y = random(0, height);
  let bird = new Bird(0, y , "white");
  birds.push(bird);
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
    this.dy += .1;
  }

  show() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    ellipse(this.x, this.y, this.radius);
    this.a -= 2.8;
  }
}

class Bird {
  constructor(x, y, color, dy, up, down){
    this.x = x;
    this.y = y;
    this.color = color;
  }
  update(){
    this.x += 3;
  }

  display(){
    fill(this.color);
    rect(this.x, this.y, 20, 10);
  }

  isAlive(){
    if (this.x > width){
      birds.splice(this, 1);
    }
  }
}

function mouseClicked(){   
  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);
  for (let i = 0; i < 100; i++){
    let angle = i * 3.6;
    let speed = random(1, 4);
    let dx = speed * sin(angle);
    let dy = speed * cos(angle);
    let firework = new Firework(mouseX, mouseY, 5, dx, dy, r, g, b, 255);
    fireworks.push(firework);
  }
}