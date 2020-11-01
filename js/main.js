/*----- constants -----*/
const rows = 9;
const columns = rows;
const difficulty = {
    easy: .1234,
    medium: .1563
};

// each tile should have an id
// each tile needs a variable to store adjoining tiles
// each tile needs a variable to store if it has been revealed or not
// each tile needs a variable to store whether it is a virus or not
// each tile needs a variable to store whether it has been quarentined or not
// the user should be able to toggle between the revealed state
// if no adjacent tiles are viruses, the reveal function needs to spread to the 
// adjacent tiles. This should continue recursively.

class Tile {
    constructor(id, adjoiningTiles, isReveald, isVirus, isQuarentined) {
        this.id = id;
        this.adjoiningTiles = adjoiningTiles;
        this.isReveald = isReveald;
        this.isVirus = isVirus;
        this.isQuarentined = isQuarentined;
    }
    toggleRevealed() {
        this.isReveald = true;
    }

    // tally the number of adjacent squares in which 'isVirus = true'
    countAdjacentlVirus() {
        let count = 0;
        this.adjoiningTiles.forEach(function(adjoined){
            if (adjoined.isVirus === true) {
                count++;
            }
            return count;
        })
        return
    }

    // when a tile is revealed by the user, this.revealed = true
    // if it has no adjacent virus, each adjacent virus is revealed and so on.
    revealAndSpread() {
        this.toggleRevealed();
        if(this.countAdjacentlVirus() > 0){
            return;
        } else {
            this.adjoiningTiles.forEach(function(adjoined){
                adjoined.spread();
            });
        }
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

    let timer;
    let virusCount;
    let setting;
/*----- cached element references -----*/
let gameBoard = document.getElementById('board')

/*----- event listeners -----*/

// new game button - 'click'
// each tile 'click release'



/*----- functions -----*/
function initialize(){
    timer = 0;
    setting = difficulty.easy;
    virusCount = Math.floor(rows * columns * setting);

}

// initialize board where each tile is an instance of the class tile
// id will be the i and j values separated by x and y to denote axis and to
// keep from confusing coordinates with integers
function initializeBoard(){
    let board = [];
    let row = [];
    let counter = 0; // don't really need the counter- the id of the tiles is a counter- maybe use modulus w/ 9?
    let virusLocations = [];
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            counter++
            console.log('id: ', 'y', i, 'x', j, ' counter: ', counter);
            // make a new tile
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


function virusInit(counter, virus){
    // for each virus, / use Math.flooor(Math.random) to pick ten numbers between 1 and 81, then use
                // a counter to determine if that tile is a virus or not
}

// render board 

// adjust the css so that the colums in the CSS will always be the number of columns
// on the game board
board.forEach((e, i) => {
    e.forEach((f, j) => {
        let square = document.createElement('div')
        square.setAttribute('id', `r${i}c${j}`)
        square.setAttribute('class', 'square, shadow')
        square.style.backgroundColor = 'lightgray';
        // square.style.border = '1px solid dark-gray';
        square.textContent = f ? f.icon : ''
        gameBoard.appendChild(square)
    })
})






