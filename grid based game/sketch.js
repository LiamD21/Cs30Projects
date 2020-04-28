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
let moveToI;
let movetoJ;
let move = false;
let selected = false;
let startScreen = true;
let playingGame = false;
let overStartButton;
let myTurn = enemyTurn = false;
let enemyMoves = [];
let enemyKillMoves = [];
let enemyChosenMove;
let moveIndex;
let myPieces = enemyPieces = 0;

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
    pieceCounter();
    if (myTurn){
      choosePiece();
      pickMove();
      movePiece();
    }
    if (enemyTurn){
      pickEnemyMove();
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
      if (grid[i][j] === "player"){
        fill("blue");
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8, cellSize * 5/6);
      }
      if (grid[i][j] === "choice"){
        fill("black");
        stroke("yellow");
        strokeWeight(8);
        rect(cellSize * i + xOffset, cellSize * j + yOffset, cellSize, cellSize);
        noStroke();
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
          fill("blue");
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
    fill("blue");
    ellipse(cellSize * selectingI + xOffset, cellSize * selectingJ +yOffset, cellSize * 7/8, cellSize * 5/6);

    if (selectingI !== 0 && grid[selectingI - 1][selectingJ - 1] === "empty"){
      grid[selectingI - 1][selectingJ - 1] = "choice";
    }
    if (selectingI !==7 && grid[selectingI + 1][selectingJ - 1] === "empty"){
      grid[selectingI + 1][selectingJ - 1] = "choice";
    }
    if( selectingI !== 6 && selectingI !== 7 && grid[selectingI + 1][selectingJ - 1] === "enemy" ){
      if(grid[selectingI + 2][selectingJ - 2] === "empty"){
        grid[selectingI + 2][selectingJ - 2] = "choice";
      }
    }
    if(selectingI !== 1 && selectingI !== 0 && grid[selectingI - 1][selectingJ - 1] === "enemy" ){
      if(grid[selectingI - 2][selectingJ - 2] === "empty"){
        grid[selectingI - 2][selectingJ - 2] = "choice";
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
  if (selected && move){
    grid[moveToI][moveToJ] = "player";
    grid[selectingI][selectingJ] = "empty";
    if (selectingJ - moveToJ === 2){
      if (selectingI - moveToI > 0){ // jumping left
        grid[selectingI - 1][selectingJ - 1] = "empty";
      }
      if (selectingI - moveToI < 0){ // jumping right
        grid[selectingI + 1][selectingJ - 1] = "empty";
      }
    }
    move = false;
    selected = false;
    for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++){
        if (grid[i][j] === "choice"){
          grid[i][j] = "empty";
        }
      }
    }
    enemyTurn = true;
    myTurn = false;
  }
}

function pickEnemyMove(){      // format for possible moves, i, j, next i, next j
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      if (grid[i][j] === "enemy"){
        if (i !== 7){
          if (grid[i + 1][j + 1] === "empty"){
            enemyMoves.push([i, j, i + 1, j + 1]);
          }
          if (i !== 6){
            if (grid[i + 1][j + 1] === "player"){
              if (grid[i + 2][j + 2] === "empty"){
                enemyKillMoves.push([i, j, i + 2, j + 2])
              }
            }
          }
        }
        if (i !== 0){
          if (grid[i - 1][j + 1] === "empty"){
            enemyMoves.push([i, j, i - 1, j + 1]);
          }
          if (i !== 1){
            if (grid[i - 1][j + 1] === "player"){
              if (grid[i - 2][j + 2] === "empty"){
                enemyKillMoves.push([i, j, i - 2, j + 2])
              }
            }
          }
        }
      }
    }
  }
  if (enemyKillMoves !== []){
    moveIndex = floor(random(enemyMoves.length))
    enemyChosenMove = enemyMoves[moveIndex];
  }
  else{
    moveIndex = floor(random(enemyKillMoves.length))
    enemyChosenMove = enemyKillMoves[moveIndex];
  }

  grid[enemyChosenMove[0]][enemyChosenMove[1]] = "empty";
  grid[enemyChosenMove[2]][enemyChosenMove[3]] = "enemy";
  console.log(enemyChosenMove);
  console.log(grid);
  enemyTurn = false;
  myTurn = true;
}

function pieceCounter(){
  enemyPieces = 0;
  myPieces = 0;

  for (let i = 0; i < 8; i++){
    for (let j = 0; j< 8; j++){
      if(grid[i][j] === "player"){
        myPieces ++;
      }
      if(grid[i][j] === "enemy"){
        enemyPieces ++;
      }
    }
  }

  fill("red");
  textSize(width/20);
  text(enemyPieces, width/5, height/4);
  fill("blue");
  textSize(width/20);
  text(myPieces, width*4/5, height*3/4);
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
    for (let i = 0; i < cols; i++){
      for (let j = 0; j< rows; j++){
        if (grid[i][j] === "choice"){
          if (collidePointRect(mouseX, mouseY, cellSize * i - cellSize/2 + xOffset, cellSize * j + yOffset - cellSize/2, cellSize, cellSize)){
            moveToI = i;
            moveToJ = j;
            move = true;
          }
        }
      }
    }
  }
}

function keyPressed(){
  if (key === " " && selected){
    selected = false;
    selecting = true;

    for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++){
        if (grid[i][j] === "choice"){
          grid[i][j] = "empty";
        }
      }
    }
  }
}