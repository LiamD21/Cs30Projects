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
let enemyMoves = [];
let enemyKillMoves = [];
let enemies = [];
let enemyChosenMove;
let moveIndex;
let myPieces = enemyPieces = 0;
let youWin = youLose = false;
let gameOverScreen = false;
let overRestartButton;
let enemyTurnTimer;
let myTurn = enemyTurn = false;
let king = false;

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
    makeKings();
    if (myTurn){
      choosePiece();
    }
    if (enemyTurn){
      pickEnemyMove();
    }
  }
  if (gameOverScreen){
    drawGameOver();
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

function drawGameOver(){
  textSize(width/8);
  fill("blue");
  text("Checkers", width/2, height *2/5);

  overRestartButton = collidePointRect(mouseX, mouseY,width/2 - width/14, height*2/3 - height/20, width/7, height/10);

  stroke("black");
  strokeWeight(6);

  if (!overRestartButton){
    fill("white");
  }
  else{
    fill("grey");
  }
  rect(width/2, height*2/3, width/7, height/10);
  noStroke();
  fill("black");
  textSize(width/25);
  text("RESTART", width/2, height*11/16);
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
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8);
      }
      if (grid[i][j] === "player"){
        fill("blue");
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8);
      }
      if (grid[i][j] === "choice" || grid[i][j] === "choiceKing"){
        fill("black");
        stroke("yellow");
        strokeWeight(8);
        rect(cellSize * i + xOffset, cellSize * j + yOffset, cellSize, cellSize);
        noStroke();
      }
      if (grid[i][j] === "playerKing"){
        fill("blue");
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8);
        fill("yellow")
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize/3);
      }
    }
  }
}

function choosePiece(){
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      if (collidePointRect(mouseX, mouseY, cellSize * i + xOffset - cellSize/2, cellSize * j + yOffset - cellSize/2, cellSize, cellSize)){
        if (!selected){
          if (grid[i][j] === "player" || grid[i][j] === "playerKing"){
            strokeWeight(8);
            stroke("yellow");
            fill(255, 255, 255, 0);
            selecting = true;
            selectingI = i;
            selectingJ = j;
            ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8);
          }
          else{
            selecting = false;
          }
        }
      }
      noStroke();
    }
  }
}

function pickMove(){
  stroke("yellow");
  fill("blue");
  ellipse(cellSize * selectingI + xOffset, cellSize * selectingJ +yOffset, cellSize * 7/8, cellSize * 5/6);

  if (grid[selectingI][selectingJ] === "player"){ // NON KINGS
    if (selectingI !== 0 && grid[selectingI - 1][selectingJ - 1] === "empty"){ //left
      grid[selectingI - 1][selectingJ - 1] = "choice";
    }
    if (selectingI !==7 && grid[selectingI + 1][selectingJ - 1] === "empty"){ //right
      grid[selectingI + 1][selectingJ - 1] = "choice";
    }
    if( selectingI !== 6 && selectingI !== 7 && grid[selectingI + 1][selectingJ - 1] === "enemy" ){ // jump right
      if(grid[selectingI + 2][selectingJ - 2] === "empty"){
        grid[selectingI + 2][selectingJ - 2] = "choice";
      }
    }
    if(selectingI !== 1 && selectingI !== 0 && grid[selectingI - 1][selectingJ - 1] === "enemy" ){ // jump left
      if(grid[selectingI - 2][selectingJ - 2] === "empty"){
        grid[selectingI - 2][selectingJ - 2] = "choice";
      }
    }
  }

  if (grid[selectingI][selectingJ] === "playerKing"){  // KINGS backwards
    if (selectingI !== 0 && grid[selectingI - 1][selectingJ + 1] === "empty"){
      grid[selectingI - 1][selectingJ + 1] = "choiceKing";
    }
    if (selectingI !==7 && grid[selectingI + 1][selectingJ + 1] === "empty"){
      grid[selectingI + 1][selectingJ + 1] = "choiceKing";
    }
    if( selectingI !== 6 && selectingI !== 7 && grid[selectingI + 1][selectingJ + 1] === "enemy" ){
      if(grid[selectingI + 2][selectingJ + 2] === "empty"){
        grid[selectingI + 2][selectingJ + 2] = "choiceKing";
      }
    }
    if(selectingI !== 1 && selectingI !== 0 && grid[selectingI - 1][selectingJ + 1] === "enemy" ){
      if(grid[selectingI - 2][selectingJ + 2] === "empty"){
        grid[selectingI - 2][selectingJ + 2] = "choiceKing";
      }
    }
            // KINGS forward
    if (selectingI !== 0 && grid[selectingI - 1][selectingJ - 1] === "empty"){
      grid[selectingI - 1][selectingJ - 1] = "choiceKing";
    }
    if (selectingI !==7 && grid[selectingI + 1][selectingJ - 1] === "empty"){
      grid[selectingI + 1][selectingJ - 1] = "choiceKing";
    }
    if( selectingI !== 6 && selectingI !== 7 && grid[selectingI + 1][selectingJ - 1] === "enemy" ){
      if(grid[selectingI + 2][selectingJ - 2] === "empty"){
        grid[selectingI + 2][selectingJ - 2] = "choiceKing";
      }
    }
    if(selectingI !== 1 && selectingI !== 0 && grid[selectingI - 1][selectingJ - 1] === "enemy" ){
      if(grid[selectingI - 2][selectingJ - 2] === "empty"){
        grid[selectingI - 2][selectingJ - 2] = "choiceKing";
      }
    }
  }
    noStroke();
}

function movePiece(){
  if (selected && move){
    if (!king){
      grid[moveToI][moveToJ] = "player";
    }
    if (king){
      grid[moveToI][moveToJ] = "playerKing";
    }
    grid[selectingI][selectingJ] = "empty";

    if (selectingJ - moveToJ === 2 && !king){
      if (selectingI - moveToI > 0){ // jumping left
        grid[selectingI - 1][selectingJ - 1] = "empty";
      }
      if (selectingI - moveToI < 0){ // jumping right
        grid[selectingI + 1][selectingJ - 1] = "empty";
      }
    }

    if (selectingJ - moveToJ === 2 && king){
      if (selectingI - moveToI > 0){ // jumping left
        grid[selectingI - 1][selectingJ - 1] = "empty";
      }
      if (selectingI - moveToI < 0){ // jumping right
        grid[selectingI + 1][selectingJ - 1] = "empty";
      }
    }

    if (moveToJ - selectingJ === 2 && king){
      if (selectingI - moveToI > 0){ // jumping left back
        grid[selectingI - 1][selectingJ + 1] = "empty";
      }
      if (selectingI - moveToI < 0){ // jumping right back
        grid[selectingI + 1][selectingJ + 1] = "empty";
      }
      
    }
    move = false;
    selected = false;
    for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++){
        if (grid[i][j] === "choice" || grid[i][j] === "choiceKing"){
          grid[i][j] = "empty";
        }
      }
    }
    enemyTurn = true;
    myTurn = false;
    enemyTurnTimer = millis();
  }
}

function pickEnemyMove(){     // format for possible moves, i, j, L or R for left or right
  if (enemyTurnTimer + 500 < millis()){
    for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++){
        if (grid[i][j] === "enemy"){

          if (i < 7){
            if (grid[i + 1][j + 1] === "empty"){
              let move = {
                enemyI: i,
                enemyJ: j,
                side: "R",
                jump: false
              };
              enemyMoves.push(move);
            }
          }
          if (i > 0){
            if (grid[i - 1][j + 1] === "empty"){
              let move = {
                enemyI: i,
                enemyJ: j,
                side: "L",
                jump: false
              };
              enemyMoves.push(move);
            }
          }
          if (i < 6){
            if (grid[i + 1][j + 1] === "player"){
              if(grid[i + 2][j + 2] === "empty"){
                let move = {
                  enemyI: i,
                  enemyJ: j,
                  side: "R",
                  jump: true
                };
                enemyKillMoves.push(move);
              }
            }
            if (i > 1){
              if (grid[i - 1][j + 1] === "player"){
                if(grid[i - 2][j + 2] === "empty"){
                  let move = {
                    enemyI: i,
                    enemyJ: j,
                    side: "L",
                    jump: true
                  };
                  enemyKillMoves.push(move);
                }
              }
            }
          }
        }
      }
    }
    if (enemyKillMoves.length === 0){
      moveIndex = random(enemyMoves.length);
      moveIndex = floor(moveIndex);
      enemyChosenMove = enemyMoves[moveIndex];
    }
    if (enemyKillMoves.length > 0) {
      moveIndex = random(enemyKillMoves.length);
      moveIndex = floor(moveIndex);
      enemyChosenMove = enemyKillMoves[moveIndex];
    }

    grid[enemyChosenMove.enemyI][enemyChosenMove.enemyJ] = "empty";
    if (enemyChosenMove.jump){
      if (enemyChosenMove.side === "R"){
        grid[enemyChosenMove.enemyI + 1][enemyChosenMove.enemyJ + 1] = "empty";
        grid[enemyChosenMove.enemyI + 2][enemyChosenMove.enemyJ + 2] = "enemy";

      }
      if (enemyChosenMove.side === "L"){
        grid[enemyChosenMove.enemyI - 1][enemyChosenMove.enemyJ + 1] = "empty";
        grid[enemyChosenMove.enemyI - 2][enemyChosenMove.enemyJ + 2] = "enemy";
      }
    }

    if (!enemyChosenMove.jump){
      if (enemyChosenMove.side === "R"){
        grid[enemyChosenMove.enemyI + 1][enemyChosenMove.enemyJ + 1] = "enemy";
      }
      if (enemyChosenMove.side === "L"){
        grid[enemyChosenMove.enemyI - 1][enemyChosenMove.enemyJ + 1] = "enemy";
      }
    }
    enemyMoves = [];
    enemyKillMoves = [];
    enemyTurn = false;
    myTurn = true;
  }
}

function makeKings(){
  for (let i = 0; i < cols; i++){
    let j = 0;
    if (grid[i][j] === "player"){
      grid[i][j] = "playerKing";
    }
  }
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
  text(enemyPieces, width/6, height/4);
  fill("blue");
  textSize(width/20);
  text(myPieces, width*5/6, height*3/4);

  if (myPieces === 0){
    gameOverScreen = true;
    youLose = true;
  }
  if (enemyPieces === 0){
    gameOverScreen = true;
    youWin = true;
  }
}

function mouseClicked(){
  if (startScreen && overStartButton){
    setupGrid();
    startScreen = false;
    playingGame = true;
    myTurn = true;
    enemyTurn = false;
  }
  if (gameOverScreen && overRestartButton){
    gameOverScreen = false;
    youWin = false;
    youLose = false;
    playingGame = true;
    myTurn = true;
    enemyTurn = false;
    setupGrid();
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
            king = false;
          }
        }
        if (grid[i][j] === "choiceKing"){
          if (collidePointRect(mouseX, mouseY, cellSize * i - cellSize/2 + xOffset, cellSize * j + yOffset - cellSize/2, cellSize, cellSize)){
            moveToI = i;
            moveToJ = j;
            move = true;
            king = true;
          }
        }
      }
    }
  }

  if(playingGame && selected){
    pickMove();
    movePiece();
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