// OOP assingment
// Liam Dallaire
// 30/05/2019
//
// Extra for Experts:
// the firework forms a circle, using trig to make each piece travel at a diffenent angle around the circle

let fireworks = [];
let birds = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  window.setInterval(addBird, 2000);
}

function draw() {
  background(20);

  //going through all fireowrks to draw and move them all
  for (let firework of fireworks){
    firework.move();
    firework.show();
    //remove them from the array once they become transparent
    if (firework.a <= 0){
      fireworks.splice(firework, 1);
    }
    // check collision with all of the birds
    for (let bird of birds){
      firework.checkCollision(bird);
    }
  }
  // drawing and moving birds
  for (let bird of birds){
    bird.update();
    bird.display();
    bird.isAlive();
  }
}

function addBird(){
  // Called every 2 seconds to add a new bird
  let y = random(0, height);
  let bird = new Bird(0, y , "white", 3);
  birds.push(bird);
}

// the firework class
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
    // moving with gravity
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

  checkCollision(bird){
    // changing direction and color of the birds if hit by a firework
    if (collideRectCircle(bird.x, bird.y, 20, 10, this.x, this.y, this.radius)){
      bird.dx *= -1;
      if (bird.dx === -3){
        bird.color = "blue";
      }
      if (bird.dx === 3){
        bird.color = "red";
      }
    }
  }
}

class Bird {
  constructor(x, y, color, dx){
    this.x = x;
    this.y = y;
    this.color = color;
    this.dx = dx;
  }
  update(){
    this.x += this.dx;
  }

  display(){
    fill(this.color);
    rect(this.x, this.y, 20, 10);
  }

  isAlive(){
    // remove from array if it gets off the screen
    if (this.x > width || this.x < -20){
      birds.splice(this, 1);
    }
  }
}

function mouseClicked(){   
// adding a firework when i press the mouse

  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);

  //eaceh of the 100 pieces has a differet angle and random speed so it forms a pleasant circle that is more realistic
  for (let i = 0; i < 100; i++){
    let angle = i * 3.6;
    let speed = random(1.5, 4);
    let dx = speed * sin(angle);
    let dy = speed * cos(angle);
    let firework = new Firework(mouseX, mouseY, 5, dx, dy, r, g, b, 255);
    fireworks.push(firework);
  }
}