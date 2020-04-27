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
let startScreen = true;
let playingGame = false;
let overStartButton;
let myTurn = enemyTurn = false;
let enemyMoves = [];
let enemyKillMoves = [];
let enemyChosenMove;

function setup() {
  strokeWeight(2);
  rectMode(CENTER);
  noStroke();
  textAlign(CENTER);

  createCanvas(windowWidth, windowHeight);
  cellSize = height / 10;

  yOffset = height/2 - (cellSize * (rows/2)) + cellSize/2;
  xOffset =  width/2 - (cellSize * (cols/2)) + cellSize/2;
}


function draw() {
  background(220);
  if (startScreen){
    drawStartScreen();
  }
  if (playingGame){
    createGrid();
    addCheckers();
    if (myTurn){
      choosePiece();
      pickMove();
      movePiece();
    }
    if (enemyTurn){
      canEnemiesMove();
      console.log(enemyKillMoves);
      console.log(enemyMoves);
    }
  }
}

function drawStartScreen(){
  textSize(width/8);
  fill("blue");
  text("Checkers", width/2, height *2/5);

  overStartButton = collidePointRect(mouseX, mouseY,width/2 - width/14, height*2/3 - height/20, width/7, height/10);

  stroke("black");
  strokeWeight(6);

  if (!overStartButton){
    fill("white");
  }
  else{
    fill("grey");
  }
  rect(width/2, height*2/3, width/7, height/10);
  noStroke();
  fill("black");
  textSize(width/25);
  text("START", width/2, height*11/16);
}

function setupGrid(){
  for (let i = 0; i < cols; i++){
    grid[i] = [];
    for (let j = 0; j < rows; j++){
      grid[i][j] = "empty";
    }
  }

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

function createGrid(){
  stroke("black");
  strokeWeight(10);
  rect(width/2, height/2, cellSize*8, cellSize*8);
  noStroke();

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
      enemyTurn = true;
      myTurn = false;
    }
    if(moveLeft && canMoveLeft){
      grid[selectingI][selectingJ] = "empty";
      grid[selectingI - 1][selectingJ - 1] = "player";
      moveLeft = false;
      selected = false;
      enemyTurn = true;
      myTurn = false;
    }
    if(jumpRight && canJumpRight){
      grid[selectingI][selectingJ] = "empty";
      grid[selectingI + 2][selectingJ - 2] = "player";
      grid[selectingI + 1][selectingJ - 1] = "empty";
      jumpRight = false;
      selected = false;
      enemyTurn = true;
      myTurn = false;
    }
    if(jumpLeft && canJumpLeft){
      grid[selectingI][selectingJ] = "empty";
      grid[selectingI - 2][selectingJ - 2] = "player";
      grid[selectingI - 1][selectingJ - 1] = "empty";
      jumpLeft = false;
      selected = false;
      enemyTurn = true;
      myTurn = false;
    }
  }
}

function canEnemiesMove(){      // format for possible moves, x, y, xmove, ymove
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      if (grid[i][j] === "enemy"){
        if (grid[i + 1][j + 1] === "empty"){
          enemyMoves.append([i, j, i + 1, j + 1]);
        }
        else if (grid[i + 1][j + 1] === "player"){
          if (grid[i + 2][j + 2] === "empty"){
            enemyKillMoves.append([i, j, i + 2, j + 2])
          }
        }
        if (grid[i - 1][j + 1] === "empty"){
          enemyMoves.append([i, j, i - 1, j + 1]);
        }
        else if (grid[i - 1][j + 1] === "player"){
          if (grid[i - 2][j + 2] === "empty"){
            enemyKillMoves.append([i, j, i - 2, j + 2])
          }
        }
      }
    }
  }
}

function mouseClicked(){
  if (startScreen && overStartButton){
    setupGrid();
    startScreen = false;
    playingGame = true;
    myTurn = true;
  }
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