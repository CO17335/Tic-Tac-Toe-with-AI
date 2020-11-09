let boxArray = [];
for (let i = 1; i < 10; ++i) {
    let str = "tictac";
    str += i;
    boxArray.push(document.getElementById(str));
}
let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
function makeBoard() {
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (boxArray[3 * i + j].innerHTML === " ") {
                board[i][j] = 0;
            }
            else if (boxArray[3 * i + j].innerHTML === "X") {
                board[i][j] = 1;
            }
            else if (boxArray[3 * i + j].innerHTML === "O") {
                board[i][j] = -1;
            }
        }
    }
}
let turnCount = 1;
function XO() {
    if (turnCount % 2 === 1) {
        event.srcElement.innerHTML = 'X';
        ++turnCount;
    }
    else {
        event.srcElement.innerHTML = 'O';
        ++turnCount;
    }
    makeBoard();
    if (hasOwon(board))
        window.alert("YOU WON!!");
    else if (isFull(board))
        window.alert("DRAW!!");
    makeBoard();
}
for (let i = 0; i < boxArray.length; ++i) {
    boxArray[i].addEventListener('click', XO);
}
function hasXwon(board) {
    let check = new Set();
    for (let i = 0; i < 3; ++i) {
        check.add(board[i][i]);
    }
    if (check.size === 1 && check.has(1)) {
        return true;
    }
    check.clear();
    for (let i = 0; i < 3; ++i) {
        let j = 2 - i;
        check.add(board[i][j]);
    }
    if (check.size === 1 && check.has(1)) {
        return true;
    }
    check.clear();
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            check.add(board[i][j]);
        }
        if (check.size === 1 && check.has(1)) {
            return true;
        }
        check.clear();
    }
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            check.add(board[j][i]);
        }
        if (check.size === 1 && check.has(1)) {
            return true;
        }
        check.clear();
    }
}
function hasOwon(board) {
    let check = new Set();
    for (let i = 0; i < 3; ++i) {
        check.add(board[i][i]);
    }
    if (check.size === 1 && check.has(-1)) {
        return true;
    }
    check.clear();
    for (let i = 0; i < 3; ++i) {
        let j = 2 - i;
        check.add(board[i][j]);
    }
    if (check.size === 1 && check.has(-1)) {
        return true;
    }
    check.clear();
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            check.add(board[i][j]);
        }
        if (check.size === 1 && check.has(-1)) {
            return true;
        }
        check.clear();
    }
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            check.add(board[j][i]);
        }
        if (check.size === 1 && check.has(-1)) {
            return true;
        }
        check.clear();
    }
}
function isFull(board) {
    let check = new Set();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; ++j) {
            check.add(board[i][j]);
        }
    }
    if (check.has(0))
        return false;
    else
        return true;
}
function nextMoves(board, XorY) {
    let moves = [];
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (board[i][j] !== 0)
                continue;
            else {
                let copyBoard = board.map(inner => inner.slice());
                if (XorY)
                    copyBoard[i][j] = 1;
                else
                    copyBoard[i][j] = -1;
                moves.push(copyBoard);
            }
        }
    }
    return moves;
}
let choiceBoard;
function minimax(board, depth, isXturn) {
    if (hasXwon(board))
        return 10 - depth;
    else if (hasOwon(board))
        return depth - 10;
    else if (isFull(board))
        return 0;
    else {
        ++depth;
        let moves = [];
        let score = [];
        let newMoves = [];
        newMoves = nextMoves(board, isXturn);
        for (let i = 0; i < newMoves.length; ++i) {
            score.push(minimax(newMoves[i], depth, !isXturn));
            moves.push(newMoves[i]);
        }
        if (isXturn) {
            let index = score.indexOf(Math.max(...score));
            choiceBoard = moves[index];
            return score[index];
        }
        else {
            let index = score.indexOf(Math.min(...score));
            choiceBoard = moves[index];
            return score[index];
        }
    }
}
function turnBoard(choiceBoard) {
    ++turnCount;
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            board[i][j] = choiceBoard[i][j];
            if (board[i][j] === 1)
                boxArray[3 * i + j].innerHTML = "X";
            else if (board[i][j] === -1)
                boxArray[3 * i + j].innerHTML = "0";
        }
    }
}
function AIplay() {
    minimax(board, 0, true);
    turnBoard(choiceBoard);
    if (hasXwon(board))
        window.alert("AI won!!");
    else if (isFull(board))
        window.alert("DRAW!!");
}
const AI = document.getElementById("AI");
AI.addEventListener('click', AIplay);