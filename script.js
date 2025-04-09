/*
Code written by Jackson L. Davis
*/

const cells = document.getElementsByClassName("cell");
let a1 = cells[0].innerHTML;
let a2 = cells[1].innerHTML;
let a3 = cells[2].innerHTML;
let b1 = cells[3].innerHTML;
let b2 = cells[4].innerHTML;
let b3 = cells[5].innerHTML;
let c1 = cells[6].innerHTML;
let c2 = cells[7].innerHTML;
let c3 = cells[8].innerHTML;
let XTurn = true;
let humanX = true;
let humanO = true;
let canHumanPlace = false;
let gameOver = false;
let turnMade = false;
let CPUvsCPUnumberOfTurns = 0;

function play() {
    canHumanPlace = false;
    document.getElementById("playerInfo").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("resetButton").style.display = "none";
    humanX = document.getElementById("humanX").checked;
    humanO = document.getElementById("humanO").checked;
    if (XTurn) {
        document.getElementById("turn").innerHTML = "X's turn";
    }
    else {
        document.getElementById("turn").innerHTML = "O's turn";
    }

    // play the first move depending on who is a CPU
    // case 1: both players are CPUs
    // let the game play itself
    if (!humanX && !humanO) {
        CPUvsCPUnumberOfTurns = 0;
        CPUvsCPUDelayedLoop();
    }
    // case 2: the first player is a CPU, but the second player is a human
    // let the CPU make the first move
    else if (!humanX && XTurn) {
        setTimeout(function() {
            cpuMove("X");
            canHumanPlace = true;
        }, 1000);
    }
    else if (!humanO && !XTurn) {
        setTimeout(function() {
            cpuMove("O");
            canHumanPlace = true;
        }, 1000);
    }
    // case 3: both players are humans
    // in this case, no action is needed
    else {
        canHumanPlace = true;
    }

    return true;
}

function reset() {
    document.getElementById("game").style.display = "none";
    document.getElementById("playerInfo").style.display = "block";
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }
    document.getElementsByClassName("cell").innerHTML = "";
    document.getElementById("winner").innerHTML = "";
    gameOver = false;

    return true;
}

function refreshCells() {
    a1 = cells[0].innerHTML;
    a2 = cells[1].innerHTML;
    a3 = cells[2].innerHTML;
    b1 = cells[3].innerHTML;
    b2 = cells[4].innerHTML;
    b3 = cells[5].innerHTML;
    c1 = cells[6].innerHTML;
    c2 = cells[7].innerHTML;
    c3 = cells[8].innerHTML;
    return true;
}

/**
 * Place an X or an O on the selected cell
 * @param {String} cellID the ID of the selected cell
 * @postcond: a X or an O is placed on the selected cell if the placement is allowed
 */
function place(cellID) {
    turnMade = false;
    // make sure cell is not taken
    if (isPlacementAllowed(cellID)) {
        if (XTurn) {
            document.getElementById(cellID).innerHTML = "X";
            document.getElementById("turn").innerHTML = "O's turn";
            XTurn = false;
        }
        else {
            document.getElementById(cellID).innerHTML = "O";
            document.getElementById("turn").innerHTML = "X's turn";
            XTurn = true;
        }
        turnMade = true
    }
    else {}

    if (turnMade) {
        // determine if there is a winner
        if (isWinner("X")) {
            document.getElementById("winner").innerHTML = "X Wins!";
            gameOver = true;
        }
        else if (isWinner("O")) {
            document.getElementById("winner").innerHTML = "O Wins!";
            gameOver = true;
        }
        else if (isTie()) {
            document.getElementById("winner").innerHTML = "Cat's Game!";
            gameOver = true;
        }
        else {}
    
        // end the game
        if (gameOver) {
            document.getElementById("resetButton").style.display = "inline-block";
            document.getElementById("turn").innerHTML = "Game Over";
        }
        // if the next player is a CPU, let the CPU make a move
        else {
            if (XTurn && !humanX) {
                canHumanPlace = false;
                setTimeout(function() {
                    cpuMove("X");
                    canHumanPlace = true;
                }, 1000);
            }
            else if (!XTurn && !humanO) {
                canHumanPlace = false;
                setTimeout(function() {
                    cpuMove("O");
                    canHumanPlace = true;
                }, 1000);
            }
            else {}
        }
    }
    
    return true;
}

/**
 * Determine if an X or O can be placed on the selected cell
 * @param {String} cellID the ID of the selected cell
 * @returns true if the placement is allowed, false otherwise
 */
function isPlacementAllowed(cellID) {
    if (!canHumanPlace) {
        return false;
    }
    // this case removes the need to check isTie()
    else if (document.getElementById(cellID).innerHTML != "") {
        return false;
    }
    else if (isWinner("X") || isWinner("O")) {
        return false;
    }
    else {
        return true;
    }
}

/**
 * Determine if X or O won the game
 * @param {String} xo either the string X or O
 * @returns true if xo won, false otherwise
 */
function isWinner(xo) {
    // make sure cell information is updated
    refreshCells();
    // check rows
    if (xo == a1 && xo == a2 && xo == a3) {
        return true;
    }
    else if (xo == b1 && xo == b2 && xo == b3) {
        return true;
    }
    else if (xo == c1 && xo == c2 && xo == c3) {
        return true;
    }
    // check columns
    else if (xo == a1 && xo == b1 && xo == c1) {
        return true;
    }
    else if (xo == a2 && xo == b2 && xo == c2) {
        return true;
    }
    else if (xo == a3 && xo == b3 && xo == c3) {
        return true;
    }
    // check diagonals
    else if (xo == a1 && xo == b2 && xo == c3) {
        return true;
    }
    else if (xo == a3 && xo == b2 && xo == c1) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Determine if the game has ended in a tie
 * @returns true if the game has ended in a tie, false otherwise
 */
function isTie() {
    if (!isWinner("X") && !isWinner("O")) {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == "") {
                return false;
            }
            else {}
        }
        return true;
    }
    else {
        return false;
    }
}

/**
 * A loop for CPU vs CPU play, wait one second between turns
 */
function CPUvsCPUDelayedLoop() {
    setTimeout(function() {
        if (XTurn) {
            cpuMove("X");
        }
        else {
            cpuMove("O");
        }
        CPUvsCPUnumberOfTurns += 1;
        if (!gameOver && CPUvsCPUnumberOfTurns < 9) {
            CPUvsCPUDelayedLoop();
        }
    }, 1000)
}

/**
 * The CPU selects a cell to place an X or O on based on the following rules
 * in order from highest priority to lowest priority:
 * 1) the CPU will always select the middle cell if possible
 * 2) if the CPU has two in a row with the third open, the CPU selects the third to win
 * 3) if the CPU's opponent has two in a row with the third open, the CPU selects the third to block the opponent
 * 4) the CPU selects a random cell
 * @param {String} xo either the string X or O
 * @postcond: a X or an O is placed on the cell the CPU selects
 */
function cpuMove(xo) {
    turnMade = false;
    let cp; // the CPU's character
    let opp; // the opponent's character
    if (xo == "X") {
        cp = "X";
        opp = "O";
    }
    else {
        cp = "O";
        opp = "X";
    }
    refreshCells();

    // 1) the CPU will always select the middle cell if possible
    if (b2 == "") {
        document.getElementById("B2").innerHTML = xo;
        turnMade = true;
    }
    else {}

    // 2) if the CPU has two in a row with the third open, the CPU selects the third to win
    if (!turnMade) {
        cpuCheckPossibilities(xo, cp);
    }
    else {}

    // 3) if the CPU's opponent has two in a row with the third open, the CPU selects the third to block the opponent
    if (!turnMade) {
        cpuCheckPossibilities(xo, opp);
    }
    else {}

    // 4) the CPU selects a random cell
    if (!turnMade) {
        const availableCells = new Array();
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == "") {
                availableCells.push(i);
            }
            else {}
        }

        // pick a random number
        if (availableCells.length >= 1) {
            let randomIndex = Math.floor(Math.random() * availableCells.length);
            switch(availableCells[randomIndex]) {
                case 0:
                    document.getElementById("A1").innerHTML = xo;
                    turnMade = true;
                    break;
                case 1:
                    document.getElementById("A2").innerHTML = xo;
                    turnMade = true;
                    break;
                case 2:
                    document.getElementById("A3").innerHTML = xo;
                    turnMade = true;
                    break;
                case 3:
                    document.getElementById("B1").innerHTML = xo;
                    turnMade = true;
                    break;
                case 4:
                    document.getElementById("B2").innerHTML = xo;
                    turnMade = true;
                    break;
                case 5:
                    document.getElementById("B3").innerHTML = xo;
                    turnMade = true;
                    break;
                case 6:
                    document.getElementById("C1").innerHTML = xo;
                    turnMade = true;
                    break;
                case 7:
                    document.getElementById("C2").innerHTML = xo;
                    turnMade = true;
                    break;
                default:
                    document.getElementById("C3").innerHTML = xo;
                    turnMade = true;
            }
        }
        else {
            // this should not happen, but do nothing if it does
        }
    }
    else {}

    // switch turns at the end
    if (XTurn) {
        document.getElementById("turn").innerHTML = "O's turn";
        XTurn = false;
    }
    else {
        document.getElementById("turn").innerHTML = "X's turn";
        XTurn = true;
    }

    if (turnMade) {
        // determine if there is a winner
        if (isWinner("X")) {
            document.getElementById("winner").innerHTML = "X Wins!";
            gameOver = true;
        }
        else if (isWinner("O")) {
            document.getElementById("winner").innerHTML = "O Wins!";
            gameOver = true;
        }
        else if (isTie()) {
            document.getElementById("winner").innerHTML = "Cat's Game!";
            gameOver = true;
        }
        else {}
    
        // end the game
        if (gameOver) {
            document.getElementById("resetButton").style.display = "inline-block";
            document.getElementById("turn").innerHTML = "Game Over";
        }
        else {}
    }

    return true;
}

/**
 * Have the CPU check if it is possible to win or block the opponent
 * @param {String} xo the CPU's character, either X or O
 * @param {String} cpOrOpp either the CPU's character (to find a win) or the opponent's character (to find a block)
 * @postcond turnMade is true if the CPU found a possible win or block, false otherwise
 */
function cpuCheckPossibilities(xo, cpOrOpp) {
    // check row A
    if (cells[0].innerHTML == "" && cells[1].innerHTML == cpOrOpp && cells[2].innerHTML == cpOrOpp) {
        document.getElementById("A1").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[0].innerHTML == cpOrOpp && cells[1].innerHTML == "" && cells[2].innerHTML == cpOrOpp) {
        document.getElementById("A2").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[0].innerHTML == cpOrOpp && cells[1].innerHTML == cpOrOpp && cells[2].innerHTML == "") {
        document.getElementById("A3").innerHTML = xo;
        turnMade = true;
    }
    // check row B
    else if (cells[3].innerHTML == "" && cells[4].innerHTML == cpOrOpp && cells[5].innerHTML == cpOrOpp) {
        document.getElementById("B1").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[3].innerHTML == cpOrOpp && cells[4].innerHTML == "" && cells[5].innerHTML == cpOrOpp) {
        document.getElementById("B2").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[3].innerHTML == cpOrOpp && cells[4].innerHTML == cpOrOpp && cells[5].innerHTML == "") {
        document.getElementById("B3").innerHTML = xo;
        turnMade = true;
    }
    // check row C
    else if (cells[6].innerHTML == "" && cells[7].innerHTML == cpOrOpp && cells[8].innerHTML == cpOrOpp) {
        document.getElementById("C1").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[6].innerHTML == cpOrOpp && cells[7].innerHTML == "" && cells[8].innerHTML == cpOrOpp) {
        document.getElementById("C2").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[6].innerHTML == cpOrOpp && cells[7].innerHTML == cpOrOpp && cells[8].innerHTML == "") {
        document.getElementById("C3").innerHTML = xo;
        turnMade = true;
    }
    // check column 1
    else if (cells[0].innerHTML == "" && cells[3].innerHTML == cpOrOpp && cells[6].innerHTML == cpOrOpp) {
        document.getElementById("A1").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[0].innerHTML == cpOrOpp && cells[3].innerHTML == "" && cells[6].innerHTML == cpOrOpp) {
        document.getElementById("B1").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[0].innerHTML == cpOrOpp && cells[3].innerHTML == cpOrOpp && cells[6].innerHTML == "") {
        document.getElementById("C1").innerHTML = xo;
        turnMade = true;
    }
    // check column 2
    else if (cells[1].innerHTML == "" && cells[4].innerHTML == cpOrOpp && cells[7].innerHTML == cpOrOpp) {
        document.getElementById("A2").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[1].innerHTML == cpOrOpp && cells[4].innerHTML == "" && cells[7].innerHTML == cpOrOpp) {
        document.getElementById("B2").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[1].innerHTML == cpOrOpp && cells[4].innerHTML == cpOrOpp && cells[7].innerHTML == "") {
        document.getElementById("C2").innerHTML = xo;
        turnMade = true;
    }
    // check column 3
    else if (cells[2].innerHTML == "" && cells[5].innerHTML == cpOrOpp && cells[8].innerHTML == cpOrOpp) {
        document.getElementById("A3").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[2].innerHTML == cpOrOpp && cells[5].innerHTML == "" && cells[8].innerHTML == cpOrOpp) {
        document.getElementById("B3").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[2].innerHTML == cpOrOpp && cells[5].innerHTML == cpOrOpp && cells[8].innerHTML == "") {
        document.getElementById("C3").innerHTML = xo;
        turnMade = true;
    }
    // check A1-B2-C3 diagonal
    else if (cells[0].innerHTML == "" && cells[4].innerHTML == cpOrOpp && cells[8].innerHTML == cpOrOpp) {
        document.getElementById("A1").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[0].innerHTML == cpOrOpp && cells[4].innerHTML == "" && cells[8].innerHTML == cpOrOpp) {
        document.getElementById("B2").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[0].innerHTML == cpOrOpp && cells[4].innerHTML == cpOrOpp && cells[8].innerHTML == "") {
        document.getElementById("C3").innerHTML = xo;
        turnMade = true;
    }
    // check A3-B2-C1 diagonal
    else if (cells[2].innerHTML == "" && cells[4].innerHTML == cpOrOpp && cells[6].innerHTML == cpOrOpp) {
        document.getElementById("A3").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[2].innerHTML == cpOrOpp && cells[4].innerHTML == "" && cells[6].innerHTML == cpOrOpp) {
        document.getElementById("B2").innerHTML = xo;
        turnMade = true;
    }
    else if (cells[2].innerHTML == cpOrOpp && cells[4].innerHTML == cpOrOpp && cells[6].innerHTML == "") {
        document.getElementById("C1").innerHTML = xo;
        turnMade = true;
    }
    else {}
    return true;
}
