/*----- constants -----*/
const rows = 9;
const columns = rows;
const difficulty = {
    easy: .1234,
    medium: .1563
};

class Tile {
    constructor(id, adjoiningTiles, isReveald, isVirus, isQuarentined) {
        this.id = id;
        this.adjoiningTiles = adjoiningTiles;
        this.isReveald = isReveald;
        this.isVirus = isVirus;
        this.isQuarentined = isQuarentined;
    }
}


/*----- app's state (variables) -----*/
let board = [
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null]
    ];



/*----- cached element references -----*/
let gameBoard = document.getElementById('board')

/*----- event listeners -----*/



/*----- functions -----*/
function initialize(){

}

function initializeBoard(){
    let board = [];
    let row = [];
    let counter = 0;
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            counter++
            console.log('id: ', 'r', i, 'c', j, ' counter: ', counter);
            // logic for determining the id
            // logic for determining the ids of adjoining tiles
            // isRevealed = false
            // result for function for determining which square is a virus
                // use Math.flooor(Math.random) to pick ten numbers between 1 and 81, then use
                // a counter to determine if that tile is a virus or not
        }
    }
}
initializeBoard();

function virusInit(num){
    // Math.floor the difficulty factor multiplied by the number of tiles to determine virus number
    // for each virus, / use Math.flooor(Math.random) to pick ten numbers between 1 and 81, then use
                // a counter to determine if that tile is a virus or not
}

// render board 
board.forEach((e, i) => {
    e.forEach((f, j) => {
        let square = document.createElement('div')
        square.setAttribute('id', `r${i}c${j}`)
        square.setAttribute('class', 'square')
        square.style.backgroundColor = 'grey';
        square.style.border = '1px solid magenta';
        square.textContent = f ? f.icon : ''
        gameBoard.appendChild(square)
    })
})






