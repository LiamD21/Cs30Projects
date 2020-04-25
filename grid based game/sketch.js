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
let moveRight = moveLeft = jumpRight = jumpLeft = false;
let canMoveRight = canMoveLeft = canJumpRight = canJumpLeft = false;

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
  pickMove();
  movePiece();
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
  grid[3][4] = "enemy";
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

function pickMove(){
  if (selected){
    stroke("yellow");
    ellipse(cellSize * selectingI + xOffset, cellSize * selectingJ +yOffset, cellSize * 7/8, cellSize * 5/6);

    fill("black")
    if (selectingI !== 0 && grid[selectingI - 1][selectingJ - 1] === "empty"){
      rect(cellSize * (selectingI - 1) + xOffset, cellSize * (selectingJ - 1) + yOffset, cellSize, cellSize);
      canMoveLeft = true;
    }
    if (selectingI !==7 && grid[selectingI + 1][selectingJ - 1] === "empty"){
      rect(cellSize * (selectingI + 1) + xOffset, cellSize * (selectingJ - 1) + yOffset, cellSize, cellSize);
      canMoveRight = true;
    }
    if( selectingI !== 6 && selectingI !== 7 && grid[selectingI + 1][selectingJ - 1] === "enemy" ){
      if(grid[selectingI + 2][selectingJ - 2] === "empty"){
        rect(cellSize * (selectingI + 2) + xOffset, cellSize * (selectingJ - 2) + yOffset, cellSize, cellSize);
        canJumpRight = true;
      }
    }
    if(selectingI !== 1 && selectingI !== 0 && grid[selectingI - 1][selectingJ - 1] === "enemy" ){
      if(grid[selectingI - 2][selectingJ - 2] === "empty"){
        rect(cellSize * (selectingI - 2) + xOffset, cellSize * (selectingJ - 2) + yOffset, cellSize, cellSize);
        canJumpLeft = true;
      }
    }
    noStroke();
  }
  if(!selected){
    canJumpRight = false;
    canJumpLeft = false;
    canMoveLeft = false;
    canMoveRight = false;
  }
}

function movePiece(){
  if (selected){
    if(moveRight && canMoveRight){
      grid[selectingI][selectingJ] = "empty";
      grid[selectingI + 1][selectingJ - 1] = "player";
      moveRight = false;
      selected = false;
    }
    if(moveLeft && canMoveLeft){
      grid[selectingI][selectingJ] = "empty";
      grid[selectingI - 1][selectingJ - 1] = "player";
      moveLeft = false;
      selected = false;
    }
    if(jumpRight && canJumpRight){
      grid[selectingI][selectingJ] = "empty";
      grid[selectingI + 2][selectingJ - 2] = "player";
      grid[selectingI + 1][selectingJ - 1] = "empty";
      jumpRight = false;
      selected = false;
    }
    if(jumpLeft && canJumpLeft){
      grid[selectingI][selectingJ] = "empty";
      grid[selectingI - 2][selectingJ - 2] = "player";
      grid[selectingI - 1][selectingJ - 1] = "empty";
      jumpLeft = false;
      selected = false;
    }
  }
}

function mouseClicked(){
  if(selecting){
    selected = true;
    selecting = false;
  }

  if (selected){
    //move left
    if (collidePointRect(mouseX, mouseY, cellSize * (selectingI - 1) - cellSize/2 + xOffset, cellSize * (selectingJ - 1) + yOffset - cellSize/2, cellSize, cellSize)){
      moveLeft = true;
    }
    //move right
    if (collidePointRect(mouseX, mouseY, cellSize * (selectingI + 1) - cellSize/2 + xOffset, cellSize * (selectingJ - 1) + yOffset - cellSize/2, cellSize, cellSize)){
      moveRight = true;
    }
    //jump left
    if (collidePointRect(mouseX, mouseY, cellSize * (selectingI - 2) - cellSize/2 + xOffset, cellSize * (selectingJ - 2) + yOffset - cellSize/2, cellSize, cellSize)){
      jumpLeft = true;
    }
    //jump right
    if (collidePointRect(mouseX, mouseY, cellSize * (selectingI + 2) - cellSize/2 + xOffset, cellSize * (selectingJ - 2) + yOffset - cellSize/2, cellSize, cellSize)){
      jumpRight = true;
    }
  }
}

function keyPressed(){
  if (key === " " && selected){
    selected = false;
    selecting = true;
  }
}