// Grid based game
// Liam Dallaire
// 09/05/2020
//
// Extra for Experts:
// The computer plays against you, and will kill you if possible, lower difficuties will make the opponent miss certain opportunities
// to eliminate your piece

// calling many global variables
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
let modeSelectScreen = false;
let easy = medium = hard = false;
let overEasyButton = overMediumButton = overHardButton = false;
let difficultyConstant;
let instructions = false;
let overStartButtonInst = false;

function setup() {
  strokeWeight(2);
  rectMode(CENTER);
  noStroke();
  textAlign(CENTER);

  createCanvas(windowWidth, windowHeight);
  cellSize = height / 10;

  // the offset to center the grid
  yOffset = height/2 - (cellSize * (rows/2)) + cellSize/2;
  xOffset =  width/2 - (cellSize * (cols/2)) + cellSize/2;
}


function draw() {
  background(220);
  if (startScreen){
    drawStartScreen();
  }
  if (modeSelectScreen){
    gameModeButtons();
  }
  if (instructions){
    drawInstructions();
  }
  if (playingGame){
    createGrid();
    addCheckers();
    pieceCounter();
    makeKings();
    turnIndicator();
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
  // the start screen is created
  textSize(width/8);
  fill("blue");
  text("Checkers", width/2, height *2/5);

  // checks if you hover over the button
  overStartButton = collidePointRect(mouseX, mouseY,width/2 - width/14, height*2/3 - height/20, width/7, height/10);

  stroke("black");
  strokeWeight(6);

  // creates the GUI
  if (!overStartButton){
    fill("white");
  }
  else{
    fill("grey");
  }

  // draws the button
  rect(width/2, height*2/3, width/7, height/10);
  noStroke();
  fill("black");
  textSize(width/25);
  text("START", width/2, height*11/16);
}

function gameModeButtons(){
  // game mode select screen created
  textSize(width/8);
  fill("blue");
  text("Select Difficulty", width/2, height *2/5);

  stroke("black");
  strokeWeight(6);

  // checks hovering on all buttons
  overHardButton = collidePointRect(mouseX, mouseY,width/2 - width/14, height*5/9 - height/20, width/7, height/10);
  overMediumButton = collidePointRect(mouseX, mouseY,width/2 - width/12, height*6/9 - height/20, width/6, height/10);
  overEasyButton = collidePointRect(mouseX, mouseY,width/2 - width/14, height*7/9 - height/20, width/7, height/10);

  stroke("black");
  strokeWeight(6);

  // all 3 GUIs
  if (!overHardButton){
    fill("white");
  }
  else{
    fill("grey");
  }
  rect(width/2, height*5/9, width/7, height/10);

  if (!overMediumButton){
    fill("white");
  }
  else{
    fill("grey");
  }
  rect(width/2, height*6/9, width/6, height/10);

  if (!overEasyButton){
    fill("white");
  }
  else{
    fill("grey");
  }
  rect(width/2, height*7/9, width/7, height/10);

  // all buttons drawn
  noStroke();
  fill("black");
  textSize(width/25);
  text("HARD", width/2, height*15/26);
  text("MEDIUM", width/2, height*11/16);
  text("EASY", width/2, height*15/19);

}

function drawInstructions(){
  // instructions displayed on the screen
  textSize(width/40);
  text("Click on your piece to select it, your possible moves will be highlighted", width/2, height/20);
  text("Then click on where you want to go", width/2, height*2/20);
  text("To unselect a piece, press space", width/2, height*3/20);
  text("The numbers on the left shows remaining pieces", width/2, height*4/20);
  text("You can jump over enemies to eliminate their piece, there is no double jumping", width/2, height*5/20);
  text("Reaching the opposite end turns your piece into a king, marked by a yellow dot", width/2, height*6/20);
  text("Kings can also move backwards", width/2, height*7/20);
  text("The token on the right shows whose turn it is", width/2, height*8/20);

  // check for hovering
  overStartButtonInst = collidePointRect(mouseX, mouseY,width/2 - width/14, height*2/3 - height/20, width/7, height/10);

  stroke("black");
  strokeWeight(6);

  // GUI
  if (!overStartButtonInst){
    fill("white");
  }
  else{
    fill("grey");
  }
  // draws button
  rect(width/2, height*2/3, width/7, height/10);
  noStroke();
  fill("black");
  textSize(width/25);
  text("START", width/2, height*11/16);
}

function drawGameOver(){
  // draws gameover screen
  textSize(width/8);
  fill("blue");

  // writes you win or lose depending what happens
  if (youLose){
    text("YOU LOSE", width/2, height *2/5);
  }
  if (youWin){
    text("YOU WIN", width/2, height *2/5);
  }

  // checks hovering
  overRestartButton = collidePointRect(mouseX, mouseY,width/2 - width/10, height*2/3 - height/16, width/6, height/9);

  stroke("black");
  strokeWeight(6);

  // GUI
  if (!overRestartButton){
    fill("white");
  }
  else{
    fill("grey");
  }
  // draws button
  rect(width/2, height*2/3, width/5, height/8);
  noStroke();
  fill("black");
  textSize(width/25);
  text("RESTART", width/2, height*11/16);
}

function setupGrid(){
  // runs before starting a game, creates the 2D array and fills the correct spots with players and enemies
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
  // draws the physical board
  stroke("black");
  strokeWeight(10);
  rect(width/2, height/2, cellSize*8, cellSize*8);
  noStroke();

  // the checkerboard pattern
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
  // adds things to the cells depending on what should be displayed
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      // drawing enemies
      if(grid[i][j] === "enemy"){
        fill("red");
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8);
      }
      // drawing players
      if (grid[i][j] === "player"){
        fill("blue");
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8);
      }
      // highlighting the choices
      if (grid[i][j] === "choice" || grid[i][j] === "choiceKing"){
        fill("black");
        stroke("yellow");
        strokeWeight(8);
        rect(cellSize * i + xOffset, cellSize * j + yOffset, cellSize, cellSize);
        noStroke();
      }
      //drawing player's kings
      if (grid[i][j] === "playerKing"){
        fill("blue");
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8);
        fill("yellow");
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize/3);
      }
      // drawing the enemy kings
      if (grid[i][j] === "enemyKing"){
        fill("red");
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8);
        fill("yellow");
        ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize/3);
      }
    }
  }
}

function choosePiece(){
  // this created the GUI when hovering over pieces and allows me to select a piece
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      if (collidePointRect(mouseX, mouseY, cellSize * i + xOffset - cellSize/2, cellSize * j + yOffset - cellSize/2, cellSize, cellSize)){
        if (!selected){
          // if there is no selected piece to move then make the GUI
          if (grid[i][j] === "player" || grid[i][j] === "playerKing"){
            strokeWeight(8);
            stroke("yellow");
            fill(255, 255, 255, 0);
            selecting = true;
            // if mouse is clicked when we are over a piece, it is selected to move
            selectingI = i;
            selectingJ = j;
            ellipse(cellSize * i + xOffset, cellSize * j +yOffset, cellSize * 7/8);
          }
          else{
            // if a piece is already selected, there is no more GUI and we cannot select another piece until we stop selecting with space
            selecting = false;
          }
        }
      }
      noStroke();
    }
  }
}

function pickMove(){
  // you pick the move to make if there are options
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
    if( selectingI !== 6 && selectingI !== 7){
      if (grid[selectingI + 1][selectingJ - 1] === "enemy" ||  grid[selectingI + 1][selectingJ - 1] === "enemyKing"){ // jump right
        if(grid[selectingI + 2][selectingJ - 2] === "empty"){
          grid[selectingI + 2][selectingJ - 2] = "choice";
        }
      }
    }
    if(selectingI !== 1 && selectingI !== 0){
      if (grid[selectingI - 1][selectingJ - 1] === "enemy"  ||  grid[selectingI - 1][selectingJ - 1] === "enemyKing"){ // jump left
        if(grid[selectingI - 2][selectingJ - 2] === "empty"){
          grid[selectingI - 2][selectingJ - 2] = "choice";
        }
      }
    }
  }

  if (grid[selectingI][selectingJ] === "playerKing"){  // KINGS backwards
    if (selectingI !== 0 && grid[selectingI - 1][selectingJ + 1] === "empty"){   // left
      grid[selectingI - 1][selectingJ + 1] = "choiceKing";
    }
    if (selectingI !==7 && grid[selectingI + 1][selectingJ + 1] === "empty"){   // right
      grid[selectingI + 1][selectingJ + 1] = "choiceKing";
    }
    if( selectingI !== 6 && selectingI !== 7){
      if (grid[selectingI + 1][selectingJ + 1] === "enemy"  ||  grid[selectingI + 1][selectingJ + 1] === "enemyKing"){   // jump right
        if(grid[selectingI + 2][selectingJ + 2] === "empty"){
          grid[selectingI + 2][selectingJ + 2] = "choiceKing";
        }
      }
    }
    if(selectingI !== 1 && selectingI !== 0){
      if (grid[selectingI - 1][selectingJ + 1] === "enemy"  ||  grid[selectingI - 1][selectingJ + 1] === "enemyKing"){  // jump left
        if(grid[selectingI - 2][selectingJ + 2] === "empty"){
          grid[selectingI - 2][selectingJ + 2] = "choiceKing";
        }
      }
    }
            // KINGS forward
    if (selectingI !== 0 && grid[selectingI - 1][selectingJ - 1] === "empty"){ // left
      grid[selectingI - 1][selectingJ - 1] = "choiceKing";
    }
    if (selectingI !==7 && grid[selectingI + 1][selectingJ - 1] === "empty"){ // right
      grid[selectingI + 1][selectingJ - 1] = "choiceKing";
    }
    if( selectingI !== 6 && selectingI !== 7){
      if (grid[selectingI + 1][selectingJ - 1] === "enemy"  ||  grid[selectingI + 1][selectingJ - 1] === "enemyKing"){  // jump right
        if(grid[selectingI + 2][selectingJ - 2] === "empty"){
          grid[selectingI + 2][selectingJ - 2] = "choiceKing";
        }
      }
    }
    if(selectingI !== 1 && selectingI !== 0){
      if  (grid[selectingI - 1][selectingJ - 1] === "enemy"  ||  grid[selectingI - 1][selectingJ - 1] === "enemyKing"){  // jump left
        if(grid[selectingI - 2][selectingJ - 2] === "empty"){
          grid[selectingI - 2][selectingJ - 2] = "choiceKing";
        }
      }
    }
  }
    noStroke();
}

function movePiece(){
  // once the selection is made the piece moves to the correct place and any enemies jumped will be eliminated
  if (selected && move){
    // make sure the proper player or king is placed after the move
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
    // removing all choices after the move is made
    for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++){
        if (grid[i][j] === "choice" || grid[i][j] === "choiceKing"){
          grid[i][j] = "empty";
        }
      }
    }// sets a timer so the enemies move is slightly delayed. makes for a cleaner gameplay
    enemyTurn = true;
    myTurn = false;
    enemyTurnTimer = millis();
  }
}

function pickEnemyMove(){     // format for possible moves, i, j, L or R for left or right
  // this will run once, the enemy finds all moves and picks one to make
  // it will prioritize kills over moves but depending on the difficulty it may not make a kill move
  if (enemyTurnTimer + 500 < millis()){
    // this function runs in the enemy turn loop until the wait time is up
    for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++){
        if (grid[i][j] === "enemy" || grid[i][j] === "enemyKing"){
          // looks for enemies to find all moves and created objects in a list of moves
          // different lists for kill moves and not

          if (i < 7){ // all forwards enemy moves
            if (grid[i + 1][j + 1] === "empty"){ // right
              let move = {
                enemyI: i,
                enemyJ: j,
                side: "R",
                jump: false,
                king: false,
                back: false
              };
              if (grid[i][j] === "enemyKing"){
                move.king = true;
              }
              enemyMoves.push(move);
            }
          }
          if (i > 0){
            if (grid[i - 1][j + 1] === "empty"){ // left
              let move = {
                enemyI: i,
                enemyJ: j,
                side: "L",
                jump: false,
                king: false,
                back: false
              };
              if (grid[i][j] === "enemyKing"){
                move.king = true;
              }
              enemyMoves.push(move);
            }
          }
          if (i < 6){
            if (grid[i + 1][j + 1] === "player" || grid[i + 1][j + 1] === "playerKing"){ // jump right
              if(grid[i + 2][j + 2] === "empty"){
                let move = {
                  enemyI: i,
                  enemyJ: j,
                  side: "R",
                  jump: true,
                  king: false,
                  back: false
                };
                if (grid[i][j] === "enemyKing"){
                  move.king = true;
                }
                enemyKillMoves.push(move);
              }
            }
          }
          if (i > 1){
            if (grid[i - 1][j + 1] === "player"  || grid[i - 1][j + 1] === "playerKing"){ // jump left
              if(grid[i - 2][j + 2] === "empty"){
                let move = {
                  enemyI: i,
                  enemyJ: j,
                  side: "L",
                  jump: true,
                  king: false,
                  back: false
                };
                if (grid[i][j] === "enemyKing"){
                  move.king = true;
                }
                enemyKillMoves.push(move);
              }
            }
          }


          if (grid[i][j] === "enemyKing"){
            if (i < 7){ // all backwards enemy moves for kings
              if (grid[i + 1][j - 1] === "empty"){ //right
                let move = {
                  enemyI: i,
                  enemyJ: j,
                  side: "R",
                  jump: false,
                  king: true,
                  back: true
                };
                enemyMoves.push(move);
              }
            }
            if (i > 0){
              if (grid[i - 1][j - 1] === "empty"){ // left
                let move = {
                  enemyI: i,
                  enemyJ: j,
                  side: "L",
                  jump: false,
                  king: true,
                  back: true
                };
                enemyMoves.push(move);
              }
            }
            if (i < 6){
              if (grid[i + 1][j - 1] === "player"  || grid[i + 1][j - 1] === "playerKing"){ // jump right
                if(grid[i + 2][j - 2] === "empty"){
                  let move = {
                    enemyI: i,
                    enemyJ: j,
                    side: "R",
                    jump: true,
                    king: true,
                    back: true
                  };
                  enemyKillMoves.push(move);
                }
              }
            }
            if (i > 1){
              if (grid[i - 1][j - 1] === "player"  || grid[i - 1][j - 1] === "playerKing"){ // jump left
                if(grid[i - 2][j - 2] === "empty"){
                  let move = {
                    enemyI: i,
                    enemyJ: j,
                    side: "L",
                    jump: true,
                    king: true,
                    back: true
                  };
                  enemyKillMoves.push(move);
                }
              }
            }
          }
        }
      }
    }
    // finding the random number to see if the computer will kill, this depends on the difficulty
    // hard will kill 100% of the time if it can, medium is 70% and 50%
    let jumpOrNot = random(10);
    let kill = false;

    if (enemyKillMoves.length > 0 && jumpOrNot <= difficultyConstant) {
      // if there is kill moves and the difficulty constant is greater than the random number then it will do the move
      moveIndex = random(enemyKillMoves.length);
      moveIndex = floor(moveIndex);
      enemyChosenMove = enemyKillMoves[moveIndex];
      kill = true;
    }

    if (enemyKillMoves.length === 0 || !kill){
      // if not kill then it will do a reguar move
      moveIndex = random(enemyMoves.length);
      moveIndex = floor(moveIndex);
      enemyChosenMove = enemyMoves[moveIndex];
    }

    // this segment will execute the enemy's move
    grid[enemyChosenMove.enemyI][enemyChosenMove.enemyJ] = "empty";
    if (!enemyChosenMove.back){ // forwards moves
      if (enemyChosenMove.jump){ // jumping moves
        if (enemyChosenMove.side === "R"){
          grid[enemyChosenMove.enemyI + 1][enemyChosenMove.enemyJ + 1] = "empty"; // right
          if (enemyChosenMove.king){
            grid[enemyChosenMove.enemyI + 2][enemyChosenMove.enemyJ + 2] = "enemyKing";
          }
          if (!enemyChosenMove.king){
            grid[enemyChosenMove.enemyI + 2][enemyChosenMove.enemyJ + 2] = "enemy";
          }

        }
        if (enemyChosenMove.side === "L"){
          grid[enemyChosenMove.enemyI - 1][enemyChosenMove.enemyJ + 1] = "empty"; // left
          if (enemyChosenMove.king){
            grid[enemyChosenMove.enemyI - 2][enemyChosenMove.enemyJ + 2] = "enemyKing";
          }
          if (!enemyChosenMove.king){
            grid[enemyChosenMove.enemyI - 2][enemyChosenMove.enemyJ + 2] = "enemy";
          }
        }
      }

      if (!enemyChosenMove.jump){ // non jumping moves
        if (enemyChosenMove.side === "R"){  // right
          if (enemyChosenMove.king){
            grid[enemyChosenMove.enemyI + 1][enemyChosenMove.enemyJ + 1] = "enemyKing";
          }
          if (!enemyChosenMove.king){
            grid[enemyChosenMove.enemyI + 1][enemyChosenMove.enemyJ + 1] = "enemy";
          }
        }
        if (enemyChosenMove.side === "L"){ // left
          if (enemyChosenMove.king){
            grid[enemyChosenMove.enemyI - 1][enemyChosenMove.enemyJ + 1] = "enemyKing";
          }
          if (!enemyChosenMove.king){
            grid[enemyChosenMove.enemyI - 1][enemyChosenMove.enemyJ + 1] = "enemy";
          }
        }
      }
    }
    if (enemyChosenMove.back){ // backwards moves, only kings
      if (enemyChosenMove.jump){ // jumping moves
        if (enemyChosenMove.side === "R"){  // jump right
          grid[enemyChosenMove.enemyI + 1][enemyChosenMove.enemyJ - 1] = "empty";
          grid[enemyChosenMove.enemyI + 2][enemyChosenMove.enemyJ - 2] = "enemyKing";
        }
        if (enemyChosenMove.side === "L"){  // jump left
          grid[enemyChosenMove.enemyI - 1][enemyChosenMove.enemyJ - 1] = "empty";
          grid[enemyChosenMove.enemyI - 2][enemyChosenMove.enemyJ - 2] = "enemyKing";
        }
      }

      if (!enemyChosenMove.jump){ // non jumping moves
        if (enemyChosenMove.side === "R"){  // right
          grid[enemyChosenMove.enemyI + 1][enemyChosenMove.enemyJ - 1] = "enemyKing";
        }
        if (enemyChosenMove.side === "L"){  // left
          grid[enemyChosenMove.enemyI - 1][enemyChosenMove.enemyJ - 1] = "enemyKing";
        }
      }
    }

    // clear the move lists and end the enemy turn loop
    enemyMoves = [];
    enemyKillMoves = [];
    enemyTurn = false;
    myTurn = true;
  }
}

function makeKings(){
  // and piece to make the end will become a king
  for (let i = 0; i < cols; i++){
    let j = 0;
    if (grid[i][j] === "player"){
      grid[i][j] = "playerKing";
    }
  }
  for (let i = 0; i < cols; i++){
    let j = 7;
    if (grid[i][j] === "enemy"){
      grid[i][j] = "enemyKing";
    }
  }
}

function pieceCounter(){
  // counts the pieces and shows how many. also determines winner
  enemyPieces = 0;
  myPieces = 0;

  // counting all pieces
  for (let i = 0; i < 8; i++){
    for (let j = 0; j< 8; j++){
      if(grid[i][j] === "player" || grid[i][j] === "playerKing"){
        myPieces ++;
      }
      if(grid[i][j] === "enemy" || grid[i][j] === "enemyKing"){
        enemyPieces ++;
      }
    }
  }

  // displaying the numbers
  fill("red");
  textSize(width/20);
  text(enemyPieces, width/6, height/4);
  fill("blue");
  textSize(width/20);
  text(myPieces, width/6, height*3/4);

  if (myPieces === 0){
    gameOverScreen = true;
    youLose = true;
    playingGame = false;
  }
  if (enemyPieces === 0){
    gameOverScreen = true;
    youWin = true;
    playingGame = false;
  }
}

function turnIndicator(){
  // places the indicator next to whoever's turn it is
  fill("yellow");
  if (myTurn){
    ellipse(width*5/6, height*3/4, width/25);
  }
  else if (enemyTurn){
    ellipse(width*5/6, height/4, width/25);
  }
}

function mouseClicked(){
  // all events when the mouse is clicked
  if (startScreen && overStartButton){
    // pushing the start button
    setupGrid();
    startScreen = false;
    modeSelectScreen = true;
    myTurn = true;
    enemyTurn = false;
  }
  if (modeSelectScreen){
    // selecting difficulty with the button
    if (overHardButton){
      difficultyConstant = 10;
      modeSelectScreen = false;
      instructions = true;
    }
    if (overMediumButton){
      difficultyConstant = 7;
      modeSelectScreen = false;
      instructions = true;
    }
    if (overEasyButton){
      difficultyConstant = 5;
      modeSelectScreen = false;
      instructions = true;
    }
  }

  if (instructions && overStartButtonInst){
    // pressing the button on the instructions screen
    instructions = false;
    playingGame = true;
  }

  if (gameOverScreen && overRestartButton){
    // pressing the button on the game over screen
    gameOverScreen = false;
    youWin = false;
    youLose = false;
    modeSelectScreen = true;
    myTurn = true;
    enemyTurn = false;
    setupGrid();
  }
  if(selecting){
    // when selected a piece you can no longer select others
    selected = true;
    selecting = false;
  }

  if (selected){
    // clicking the choices to make the move
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
    // if a piece is selected then these functions loop over
    pickMove();
    movePiece();
  }
}

function keyPressed(){
  // pressing space unselects the piece
  if (key === " " && selected){
    selected = false;
    selecting = true;

    for (let i = 0; i < cols; i++){
      for (let j = 0; j < rows; j++){
        if (grid[i][j] === "choice" || grid[i][j] === "choiceKing"){
          grid[i][j] = "empty";
        }
      }
    }
  }
}