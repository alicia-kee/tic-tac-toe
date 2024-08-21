const cells = document.querySelectorAll(".cell"); //querySelectorAll returns all CSS elements w/ class cell
const statusText = document.querySelector("#statusText"); //querySelector returns first CSS element w/ id statusText
const restartBtn = document.querySelector("#restartBtn");
const winningCombos = [[0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]
                    ]
let options = ["","","","","","","","",""]; //cell contents in array (keep track in code)
let currPlayer = "X";
let isGameRunning = false;

initializeGame(); //start game!

function initializeGame(){
    isGameRunning = true;
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); //if cell clicked, call cellClicked()
    restartBtn.addEventListener("click", restartGame); //if restart button clicked, call restartGame()
    statusText.style.color = "blue";
    statusText.textContent = `${currPlayer}'s turn`;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex"); //this refers to the cell clicked, get and store cellIndex #
    if (options[cellIndex]!="" || !isGameRunning){
        return;
    }
    //if cell is empty and game still running:
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell,index){ //index needed to change in options array
    options[index] = currPlayer;
    cell.textContent = currPlayer;

    if(currPlayer==="X"){
        cell.style.color = "blue";
    }else{
        cell.style.color = "red";
    }
    
}
function changePlayer(){
    if(currPlayer === "X"){
        currPlayer = "O";
        statusText.style.color = "red";
    }
    else{
        currPlayer="X";
        statusText.style.color = "blue";
    }
    statusText.textContent = `${currPlayer}'s turn`;
}
function checkWinner(){
    let hasWinner = false;
    for (let i=0; i<winningCombos.length; i++){
        const conditions = winningCombos[i]; //this iteration's winning combo (check) (array from the 2D array)
        //store value of the 3 cells in this iteration's winning combo (get from array)
        const cell1 = options[conditions[0]]; //condition[0] is value of 1st index in winning combo
        const cell2 = options[conditions[1]];
        const cell3 = options[conditions[2]];

        if(cell1!="" && cell2!="" && cell3!="" && cell1==cell2 && cell2==cell3){
            hasWinner = true;
            break;
        }
    }

    if(hasWinner){
        statusText.textContent = `${currPlayer} wins!`
        isGameRunning = false;

    }else if(!options.includes("")){ //if values of cells is all not empty (grid full), game over, draw
        statusText.style.color = "white";
        statusText.textContent = `It's a draw!`;
        isGameRunning = false;

    }else{//game not over yet
        changePlayer();
    }

}
function restartGame(){
    options = ["","","","","","","","",""]; //reset cell contents (stored in code) to all empty
    currPlayer = "X";
    cells.forEach(cell=>cell.textContent=null);
    initializeGame();
}
