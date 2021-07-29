let board = [['0', '0', '0'], ['0', '0', '0'], ['0', '0', '0']];
let pos = [0, 0];
var winningCondition = false;
var continueGame = true;
var currentPlayer = 'o';
var waitMouse = false;


function setup() {
  canvas = createCanvas(600, 600);
  stroke(0);
  strokeWeight(5);
  button = createButton('RESET');
  button.position(300, 1010);
  button.mousePressed(resetBoard);
}

function draw() {
  background(220);
  line(0, 200, 600, 200);
  line(0, 400, 600, 400);
  line(200, 0, 200, 600);
  line(400, 0, 400, 600);

  fill(0);
  rect(0, 600, 600, 1);
  rect(0, 0, 600, 1);
  rect(0, 0, 1, 600);
  rect(600, 0, 600, 600);
  
  fill(220);
  while (checkWin('x') == false || checkWin('o') == false)
  {
    if (currentPlayer == 'o') {
      if (waitMouse) {
        takeTurn();
      }
      if (mouseIsPressed) waitMouse = true;
    }
    if (currentPlayer == 'x')
      takeTurn();
  }
  
}

function mouseReleased() {
  waitMouse = false;
}

function resetBoard()
{
  continueGame = true;
  for (var x = 0; x < 3; x++)
  {
    for (var y = 0; y < 3; y++)
    {
      board[x][y] = '0';
    }
  } 
}

function takeTurn()
{
    if (currentPlayer == 'o') {
      var x = Math.floor(mouseX/200);
      var y = Math.floor(mouseY/200);
      drawO(x, y);
      currentPlayer = 'x';
    }
    else {
      autoTurn();
      currentPlayer = 'o'
    }
    drawBoard();
}

function autoTurn()
{
    // two in a row
    for (var col = 0; col < 3; col++)
    {
      if (board[col][0] == chipType && board[col][1] == chipType) {
          drawX(col, 2);
          return;
      }
      else if (board[col][1] == chipType && board[col][2] == chipType) {
          drawX(col, 0);
          return;
      }
      else if (board[col][0] == chipType && board[col][2] == chipType) {
          drawX(col, 1);
          return;
      }
      else if (board[0][col] == chipType && board[1][col] == chipType) {
        drawX(2, col);
        return;
      }
      else if (board[1][col] == chipType && board[2][col] == chipType) {
        drawX(0, col);
        return;
      }
      else if (board[2][col] == chipType && board[0][col] == chipType) {
        drawX(1, col);
        return;
      }

    }

    // check for two in a diagon
    if (board[0][0] == chipType && board[1][1] == chipType) {
      drawX(2, 2);
      return;
    }
    else if (board[1][1] == chipType && board[2][2] == chipType) {
      drawX(0, 0);
      return;
    }
    else if (board[0][0] == chipType && board[2][2] == chipType) {
      drawX(1, 1);
      return;
    }

    //otherwise find empty
    for (var i = 0; i < 3; i++)
      for (var j = 0; j < 3; j++)
        if (board[i][j] == '0') drawX(i, j);

}


function drawO(x, y)
{
   if (board[x][y] == '0') board[x][y] = 'o';
}
function drawX(x, y) 
{
  if (board[x][y] == '0') board[x][y] = 'x';
}

function drawBoard()
{
  for ( var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (board[x][y] == 'x') {
        line((x*200)+50, (y*200)+50, (x*200)+150, (y*200)+150);
        line((x*200)+150, (y*200)+50, (x*200)+50, (y*200)+150);
      }
      else if (board[x][y] == 'o') {
        circle((x*200)+100, (y*200)+100, 120);
        
      }
    }
  }     
}

function checkWin(chipType)
{
  // check columns and rows
  for (var row = 0; row < 3; row++) 
  {
    if (board[row][0] == chipType && board[row][1] == chipType && board[row][2] == chipType)
      return true;
    if (board[0][row] == chipType && board[1][row] == chipType && board[2][row] == chipType) 
      return true;
  }
  
  // check diagonal
  if (board[0][0] == chipType && board[1][1] == chipType && board[2][2] == chipType)
    return true;

  return false;
}



