// Grid based game
// Liam Dallaire
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cols = 10;
let rows = 20;
let cellSize = 45;
let colors = [];
let xOffset;
let yOffset;
let shapeType;
let blockStartX;
let readyForBlock = true;
let lastHitBottom = 0;
let iToMOve = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  yOffset = height/2 - (cellSize * (rows/2));
  xOffset =  width/2 - (cellSize * (cols/2));

  for (let i = 0; i < cols; i++){
    colors[i] = [];
    for (let j = 0; j < rows; j++){
      colors[i][j] = "White";
    }
  }
}

function draw() {
  background(220);
  createGrid();
  spawnTimer();
}

function createGrid(){
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      fill(colors[i][j])
      rect(cellSize * i + xOffset, cellSize * j + yOffset, cellSize, cellSize);
    }
  }
}

function addShape() {
  blockStartX = round(random(6));
  shapeType = round(random(6));
  // types are: 0 - flat, 1 - box, 2 - L, 3 - reverse L, 4 - T, 5 - S, 6 - Z
  shapeType = 0;

  if (shapeType === 0){
    for (let b = 0; b < 4; b++){
      colors[blockStartX + b][1] = "red";
    }
  }
}

function moveDownShape(){
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      if (colors[i][j] !== "white"){
        colors[i][j] = "white";
        colors[i+1][j] = "red";
      }
    }
  }
}

function spawnTimer(){
  if (lastHitBottom + 1500 < millis() && readyForBlock){
    addShape();
    lastHitBottom = millis();
    readyForBlock = false;
  }
}

function keyReleased(){
  if (key === " "){
    moveDownShape();
  }
}