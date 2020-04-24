// Grid based game
// Liam Dallaire
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cols = 8;
let rows = 8;
let cellSize;
let grid = [];
let yOffset;
let xOffset;
let BEIGE = [207, 185, 157];
let patternCount = 0;
let selecting = false;
let selectingI;
let selectingJ;
let selected = false;

function setup() {
  strokeWeight(2);
  rectMode(CENTER);
  noStroke();

  createCanvas(windowWidth, windowHeight);
  cellSize = height / 10;

  yOffset = height/2 - (cellSize * (rows/2)) + cellSize/2;
  xOffset =  width/2 - (cellSize * (cols/2)) + cellSize/2;

  for (let i = 0; i < cols; i++){
    grid[i] = [];
    for (let j = 0; j < rows; j++){
      grid[i][j] = "empty";
    }
  }
  setupGrid();
}


function draw() {
  background(220);
  createGrid();
  addCheckers();
  choosePiece();
  movePiece();
}

function createGrid(){
  for (let i = 0; i < cols; i++){
    patternCount ++;
    for (let j = 0; j < rows; j++){
      patternCount ++;

      if (patternCount % 2 === 0){
        fill(BEIGE);
        grid[i][j] = "empty";
      }
      else{
        fill("black");
      }

      rect(cellSize * i + xOffset, cellSize * j + yOffset, cellSize, cellSize);
    }
  }
}

function setupGrid(){
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < 3; j++){
      grid[i][j] = "enemy";
    }
  }

  for (let i = 0; i < cols; i++){
    for (let j = 5; j < 8; j++){
      grid[i][j] = "player";
    }
  }
}

function addCheckers(){
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      if(grid[i][j] === "enemy"){
        fill("red");
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8, cellSize * 5/6);
      }
      else if (grid[i][j] === "player"){
        fill("blue");
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8, cellSize * 5/6);
      }
    }
  }
}

function choosePiece(){
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      if (collidePointRect(mouseX, mouseY, cellSize * i + xOffset - cellSize/2, cellSize * j + yOffset - cellSize/2, cellSize, cellSize)){
        if (grid[i][j] === "player" && !selected){
          strokeWeight(8);
          stroke("yellow");
          fill("blue")
          selecting = true;
          selectingI = i;
          selectingJ = j;
          ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8, cellSize * 5/6);
        }
        else{
          selecting = false;
        }
      }
      noStroke();
    }
  }
}

function movePiece(){
  if (selected){
    stroke("yellow");
    ellipse(cellSize * selectingI + xOffset, cellSize * selectingJ +yOffset, cellSize * 7/8, cellSize * 5/6);

    fill("black")
    if (selectingI !== 0 && grid[selectingI - 1][selectingJ - 1] === "empty"){
      rect(cellSize * (selectingI - 1) + xOffset, cellSize * (selectingJ - 1) + yOffset, cellSize, cellSize)
    }
    if (selectingI !==7 && grid[selectingI + 1][selectingJ - 1] === "empty"){
      rect(cellSize * (selectingI + 1) + xOffset, cellSize * (selectingJ - 1) + yOffset, cellSize, cellSize)
    }
    noStroke();
  }
}

function mouseClicked(){
  if(selecting){
    selected = true;
    selecting = false;
  }
}

function keyPressed(){
  if (key === " " && selected){
    selected = false;
    selecting = true;
  }
}