// Grid based game
// Liam Dallaire
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cols;
let rows;
let cellSize = 35;
let array = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(windowWidth / cellSize);
  rows = floor(windowHeight / cellSize);

  for (let i = 0; i < cols; i++){
    array[i] = [];
    for (let j = 0; j < rows; j++){
      array[i][j] = random(255);
    }
  }
}

function draw() {
  background(220);
  createGrid();
}

function createGrid(){
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      fill(array[i][j])
      rect(cellSize * i, cellSize * j, cellSize, cellSize);
      if (i === 7 && j === 15){
        fill("red");
      }
    }
  }
}