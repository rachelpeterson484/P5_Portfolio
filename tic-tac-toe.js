// ai players x, human plays o


let board = [['0', '0', '0'], ['0', '0', '0'], ['0', '0', '0']];
let player = 'human';
let count = 2;
let winningCondition = false;
let continueGame = true;

function setup() {
  createCanvas(600, 650);
  stroke(0);
  strokeWeight(5);
  
  button = createButton('RESET');
  button.position(300, 1010);
  button.mousePressed(resetBoard);
}

function draw() {
  background(255);
  line(0, 200, 600, 200);
  line(0, 400, 600, 400);
  line(200, 0, 200, 600);
  line(400, 0, 400, 600);

  fill(0);
  rect(0, 600, 600, 50);

  if (count % 2 == 0) {
  	player = 'human';
  }
  else player = 'AI';

  if (player == 'human') {
  	count++;
  	mousePressed();
  }
  else {
    count++;
    autoResponse();
  }

  printBoard();
}

// resets the board
function resetBoard() {
  continueGame = true;
  for (var x = 0; x < 3; x++)
  {
    for (var y = 0; y < 3; y++)
    {
      board[x][y] = '0';
    }
  } 
}

// prints the board
function print() {
	for (var row = 0; row < 3; row++) {
		for (var col = 0; col < 3; col++) {
			let posX = row * 200;
			let posY = col * 200;
			if (board[row][col] == 'x') {
			  line(x+50, y+50, x+150, y+150);
 			  line(x+150, y+50, x+50, y+150);
			}
			else if (board[row][col] == 'o') {
			  circle(row + 100, y+100, 120);
			}
		}
	}
}

// draws an 'x' or an 'o' to the board given the positions
function drawOnBoard(x, y) {
	if (player == 'human' && continueGame)
		board[x][y] = 'o';
	else if (player == 'ai' && continueGame)
		board[x][y] = 'x';

	if (winningCondition) {
    	console.log(chipType + " has won the game!");
    }
    else if (continueGame == false) {
      console.log("It's a tie!");
    }

}

// returns true if there has the potential to be three in a row, false otherwise
function threeRow(chipType) {
	// go through rows and check
	var pos = [0, 0];
	for (var row = 0; row < 3; row++) {
		for (var col = 0; col < 2; col++) {
			if (board[row][col] == chipType && board[row][col+1] == chipType) {
				pos[0] = row;
				pos[1] = col;
				return true;
			}
		}
	}

	// go through columns and check
    for (var col = 0; col < 3; col++) {
    	for (var row = 0; row < 2; row++) {
    		if (board[row][col] == chipType && board[row+1][col] == chipType) {
    			pos[0] = row;
    			pos[1] = col;
                return true;
    		}
    	}
    }

	if (board[0][0] == chipType && board[1][1] == chipType) {
      pos[0] = 2;
      pos[1] = 2;
      return true;
     }
     else if (board[1][1] == chipType && board[2][2] == chipType) {
       pos[0] = 0;
       pos[1] = 0;
       return true;
     }

     return false;
}

// finds an empty box
function emptyPos() {
	for (var row = 0; row < 3; row++) {
		for (var col = 0; col < 3; col++) {
			if (board[row][col] == '0') {
				pos[0] = row;
				pos[1] = col;
				return true;
			}
		}
	}
}

function autoResponse() {
  // if AI can win, then draw in that spot
  if (threeRow('x')) {
    drawOnBoard(pos[0], pos[1]);
  }

  // otherwise, check if player can win next turn and go there
  else if (threeRow('o')) {
    drawOnBoard(pos[0], pos[1]);
  }

  // else, go for an empty spot
  else if (emptyPos()) { 
  	drawOnBoard(pos[0], pos[1]);
  }
  checkWin();
}

function mousePressed() {
	var tempX = Math.floor(mouseX/200);
	var tempY = Math.floor(mouseY/200);
	drawOnBoard(tempX, tempY);
	checkWin();
}

function checkWin()
{
  // check columns
  if (board[0][0] == chipType && board[0][1] == chipType && board[0][2] == chipType)
    winningCondition = true;
  else if (board[1][0] == chipType && board[1][1] == chipType && board[1][2] == chipType)
    winningCondition = true;
  else if (board[2][0] == chipType && board[2][1] == chipType && board[2][2] == chipType)
    winningCondition = true;
  
  // check rows
  if (board[0][0] == chipType && board[1][0] == chipType && board[2][0] == chipType)
    winningCondition = true;
  else if (board[0][1] == chipType && board[1][1] == chipType && board[2][1] == chipType)
    winningCondition = true;
  else if (board[0][2] == chipType && board[1][2] == chipType && board[2][2] == chipType)
    winningCondition = true;
  
  // check diagonal
  if (board[0][0] == chipType && board[1][1] == chipType && board[2][2] == chipType)
    winningCondition = true;
  
  if (winningCondition == true) continueGame = false;
}
