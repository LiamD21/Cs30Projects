// Interactive Scene
// Liam Dallaire
// 03/07/2020
//
// Extra for Experts:
// I used the mouse wheel to custom make colors by changing the r g b  values of each color for the car
// I used state variables to make start and end screens and kept track of session high scores
// I used collisions and made a button without the built in library

let carX = 300;
let carY;
let carWidth = 60;
let carHeight = 40;
let carV;
let seconds;
let ballArray = [];
let i;
let lastBallSpawned = 0;
let ballToRespawn;
let lastNewBall = 0;
let respawnTime = 500;
let startScreen = true;
let playingGame = false;
let gameOverScreen = false;
let finalScore;
let numberOfStartingBalls = 4;
let gameStartTime;
let thisBallColor;
let highScore = 0;
let r = 100;
let g = 100;
let b = 100;
let ballR;
let ballG;
let ballB;

function setup() {

  // create the canvas and setup
  createCanvas(windowWidth, windowHeight);
  noStroke();

  carY = height - carHeight/2  -11;
}

function draw() {
  background(220);

  // drawing the start screen and things on that page
  if (startScreen){
    drawStartScreen();
    drawStartButton();
    drawColorPicker();
    createBallArray();
  }

  // drawing everything to play the game
  if (playingGame){
    drawCar();
    drawBall();
    carMoveOnKeyPress();
    writeTime();
    ballBouncing();
    respawnBalls();
    detectHit();
    addBalls();
  }

  // drawing the gameover stuff
  if (gameOverScreen){
    drawGameOver();
  }
}

function drawStartScreen(){

  //write the title and highscore on start screen
  textAlign(CENTER);
  rectMode(CENTER);
  textSize(150);
  fill(50, 50, 200);
  text("Falling Balls", width/2, height/2);
  fill("black");
  textSize(40);
  text("Your highest score yet is " + highScore + "s", width/2, 40);
}

function drawStartButton(){
  // create a button to start
  textSize(75);
  stroke(20);
  fill("yellow");
  rect(width/2, 3*height/4 - 20, 200, 100);
  fill("black");
  text("Start", width/2, 3*height/4);

  // when hovering the button changes color, ui
  if(mouseX > width/2 - 100 && mouseX < width/2 + 100 && mouseY > 3*height/4 - 60 && mouseY < 3*height/4 + 30){
    fill("orange");
    rect(width/2, 3*height/4 - 20, 200, 100);
    fill("black");
    text("Start", width/2, 3*height/4);
  }
}

function drawColorPicker(){
  // the square showing the picked color
  fill(r ,g ,b);
  rect(width/6, height/6, 100, 100);

  // the smaller squares
  fill("red");
  rect(width/6 - 100, height/6, 50, 50);
  fill("blue");
  rect(width/6 - 100, height/6 + 75, 50, 50);
  fill("green");
  rect(width/6 - 100, height/6 + 150, 50, 50);

    // the instructions
  textSize(20);
  fill(0);
  text("Scroll The Mouse Wheel in",width/11, height/2 - 20);
  text("a Box to Select Color", width/11, height/2);
}

function drawGameOver(){
  // update the highscore of the session if you beat it
  if (finalScore - highScore > 0){
    highScore = finalScore;
  }

  //write game over on the screen
  textSize(175);
  fill(200, 50, 50);
  text("GAME OVER", width/2, height/2);
  fill("black");
  textSize(50);
  text("You Survived For " + str(finalScore) + " Seconds!", width/2, height/2 + 100);
  text("Press Space To Play Again", width/2, height/2 + 200);
}

function drawBall(){
  // alll balls in the array are drawn where theyre supposed to be
  for (i = 0; i < ballArray.length; i++){
    fill(ballArray[i].color[0], ballArray[i].color[1], ballArray[i].color[2]);
    ellipse(ballArray[i].ballX, ballArray[i].ballY, 75, 75);
  }
}

function createBallArray(){
  ballArray = [];

  // creates an array of ball objects to begin with
  for (i = 0; i < numberOfStartingBalls; i++){

    // the ball colors
    ballR = random(0, 255);
    ballG = random(0, 255);
    ballB = random(0, 255);

    // the velocity x and y cordinates
    let y = 100;
    let vertV = random(1, 3);
    let horV = random(-7, 7);
    let x = random(75, width - 75);
    let color = [ballR, ballG, ballB];

    // create the objects
    let ball = {
      ballX: x,
      ballY: y,
      verticalV: vertV,
      horizontalV: horV,
      color: color
    };
    ballArray.push(ball);
  }
}

function drawCar(){
  // draw the car at the proper position with the proper color
  fill(r, g, b);
  noStroke();
  rect(carX, carY, carWidth, carHeight);
  rect(carX - carWidth/2 - 10,carY + 10, 20, 20);
  rect(carX + carWidth/2 + 10, carY + 10, 20, 20);
  fill("black");
  ellipse(carX - carWidth/2, carY + carHeight/2, 22, 22);
  ellipse(carX + carWidth/2, carY + carHeight/2, 22, 22);
}

function ballBouncing(){
  // rules applied to all balls to make them bounce

  for (i = 0; i < ballArray.length; i++){

    // ball accelerates towards the ground
    if (ballArray[i].ballY < height - 75/2){
      ballArray[i].verticalV += 0.35;
    }

    // ball bounces on hitting the ground and loses 10% of its energy
    else if (ballArray[i].ballY > height - 75/2){
      ballArray[i].verticalV *= -0.9;
      ballArray[i].ballY = height - 75/2;
    }

    //the ball bounces off the sides of the screen
    if (ballArray[i].ballX > width - 75/2|| ballArray[i].ballX < 75/2){
      ballArray[i].horizontalV *= -1;
    }

    //the ball slowly loses horizontal momentum
    if (ballArray[i].horizontalV > 0){
      ballArray[i].horizontalV -= 0.005;
    }
    else if (ballArray[i].horizontalV < 0){
      ballArray[i].horizontalV += 0.005;
    }

    ballArray[i].ballY += ballArray[i].verticalV;
    ballArray[i].ballX += ballArray[i].horizontalV;
  }
}

function detectHit(){

  // we see if a ball hit the car
  for (i = 0; i < ballArray.length; i++){
    if (ballArray[i].ballX - 75/2 < carX + carWidth/2 + 20 && ballArray[i].ballX + 75/2 > carX - carWidth/2 - 20){

      // if there was a hit, gameover
      if (ballArray[i].ballY + 75/2 > carY - carHeight/2){
        finalScore = seconds;
        playingGame = false;
        gameOverScreen = true;
        
      }
    }
  }
}

function addBalls(){

  //a new ball every 3 seconds
  if (playingGame){
    if (millis() - lastNewBall > 3000){
      // a new object is created and added to the array
      ballR = random(0, 255);
      ballG = random(0, 255);
      ballB = random(0, 255);

      let y = 100;
      let vertV = random(1, 3);
      let horV = random(-7, 7);
      let x = random(75, width - 75);
      let color = [ballR, ballG, ballB];

      let ball = {
        ballX: x,
        ballY: y,
        verticalV: vertV,
        horizontalV: horV,
        color: color
      };
      ballArray.push(ball);

      lastNewBall = millis();
    }
  }
}

function respawnBalls(){
  // balls are respawned often to ensure that they dont stop on the ground 
  if (playingGame){
    if (millis() - lastBallSpawned > respawnTime){
      ballToRespawn = random(0, ballArray.length - 1);
      ballToRespawn = Math.round(ballToRespawn);

      //created back up in the air with velocity on both axes
      ballArray[ballToRespawn].ballY = 100;
      ballArray[ballToRespawn].ballX = random(75, width - 75);
      ballArray[ballToRespawn].verticalV = random(1, 3);
      ballArray[ballToRespawn].horizontalV = random(-7, 7);

      lastBallSpawned = millis();
    }
  }
}

function carMoveOnKeyPress(){

  // on press of a or d the car moves as long as it is between the boundaries
  if (carX >= carWidth/2 + 20 && carX <= width - carWidth/2 - 20){
    if (keyIsDown(68)){
      carX += carV;
      carV += 0.5;
    }
    else if (keyIsDown(65)){
      carX -= carV;
      carV += 0.5;
    }
  }

  // keep the car inside the boundaries
  if (carX < carWidth/2 + 20 || carX > width - carWidth/2 - 20){
    if (carX < carWidth/2 + 20){
      carX = carWidth/2 + 20;
    }
    else{
      carX = width - carWidth/2 - 20;
    }
  }
}

function writeTime(){

  // write the time up top to keep score
  textSize(50);
  fill(0);
  seconds = (millis() - gameStartTime)/1000;
  seconds = seconds.toFixed(1);
  text(seconds, 100, 100);
}

function keyPressed(){

  // when keys a and d are pressed, the velocity is set to 10 to counteract the car's acceleration when it starts to go the other way
  if (key === "a" || key === "d"){
    carV = 10;
  }

  // when space pressed on gameoevr screen we return to main menu
  if (gameOverScreen) {
    if (key === " ") {
      gameOverScreen = false;
      startScreen = true;
    }
  }
}

function mouseClicked(){

  // when you click on the button, the game starts
  if(startScreen && mouseX > width/2 - 100 && mouseX < width/2 + 100 && mouseY > 3*height/4 - 60 && mouseY < 3*height/4 + 30){
    startScreen = false;
    playingGame = true;
    gameStartTime = millis();
    lastNewBall = gameStartTime;
    lastBallSpawned = gameStartTime;
  }
}

function mouseWheel(event){

  // when the mouse is scrolled in a colored box, the r, g, or b value goes up or down
  if (startScreen && mouseX > width/6 - 125 && mouseX < width/6 - 75 && mouseY > height/6 - 25 && mouseY < height/6 + 25){
    if(event.delta > 0 && r > 0){
      r -= 20;
    }
    if(event.delta < 0 && r < 255){
      r += 20;
    }
  }
  if (startScreen && mouseX > width/6 - 125 && mouseX < width/6 - 75 && mouseY > height/6 + 50 && mouseY < height/6 + 100){
    if(event.delta > 0 &&  b > 0){
      b -= 20;
    }
    if(event.delta < 0 &&  b < 255){
      b += 20;
    }
  }
  if (startScreen && mouseX > width/6 - 125 && mouseX < width/6 - 75 && mouseY > height/6 + 125 && mouseY < height/6 + 175){
    if(event.delta > 0 && g > 0){
      g -= 20;
    }
    if(event.delta < 0 && g < 255){
      g += 20;
    }
  }
}