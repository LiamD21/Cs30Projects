// Grid based game
// Liam Dallaire
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cols = 10;
let rows = 10;
let cellSize = 50;
let mySide = [];
let enemySide = [];
let yOffsetMe;
let yOffsetEnemy;
let xOffset;
let OCEAN = [17, 163, 207];
let mini;
let small;
let sub;
let big;
let aircraftCarrier

function preload() {
  mini = loadImage("assets/mini.png")
  small = loadImage("assets/small.png")
  big = loadImage("assets/big.png")
  aircraftCarrier = loadImage("assets/aircraftcarrier.png")
  sub = loadImage("assets/sub.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);

  yOffsetMe = height*3/4 - (cellSize * (rows/2));
  yOffsetEnemy = height/4 - (cellSize * (rows/2));
  xOffset =  width/2 - (cellSize * (cols/2));

  for (let i = 0; i < cols; i++){
    mySide[i] = [];
    for (let j = 0; j < rows; j++){
    }
  }

  for (let k = 0; k < cols; k++){
    enemySide[k] = [];
    for (let l = 0; l < rows; l++){
    }
  }
}

function draw() {
  background(220);
  createGrids();
  drawShips();
}

function createGrids(){
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      fill(OCEAN);
      rect(cellSize * i + xOffset, cellSize * j + yOffsetMe, cellSize, cellSize);
    }
  }

  for (let k = 0; k < cols; k++){
    for (let l = 0; l < rows; l++){
      fill(OCEAN);
      rect(cellSize * k + xOffset, cellSize * l + yOffsetEnemy, cellSize, cellSize);
    }
  }
}

function drawShips(){
  image(mini, 100, 100, mini.width * 0.65, mini.height * 0.65);
  image(small, 100, 150, small.width * 0.65, small.height * 0.65);
  image(big, 100, 250, big.width * 0.65, big.height * 0.65);
  image(sub, 100, 200, sub.width * 0.6, sub.height * 0.65);
  image(aircraftCarrier, 100, 300, aircraftCarrier.width * 0.6, aircraftCarrier.height * 0.6);
}