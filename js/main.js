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
    constructor(id, adjoiningTiles, isVirus) {
        this.id = id;
        this.adjoiningTiles = adjoiningTiles;
        this.isReveald = false;
        this.isVirus = isVirus;
        this.isQuarentined = false;
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
    let timer;
    let virusCount;
    let setting;
    let board = [];


/*----- cached element references -----*/
let gameBoard = document.getElementById('board')
let virusRemaining = document.getElementById('virus-remaining');
let timerElem = document.getElementById('timer');
let newGameButton = document.getElementById('new-game');

/*----- event listeners -----*/

// new game button - 'click'
// each tile 'click release'

newGameButton.addEventListener('click', initialize);
gameBoard.addEventListener('mouseup', tileClick)

initialize();

/*----- functions -----*/
function initialize(){
    timer = 0;
    setting = difficulty.easy;
    virusCount = Math.floor(rows * columns * setting);
    board = initializeBoard();
    

    render();
}

// initialize board where each tile is an instance of the class tile
// id will be the i and j values separated by x and y to denote axis and to
// keep from confusing coordinates with integers
function initializeBoard(){
    console.log('init is firing');
    const virusLocations = virusInit();
    for(let i = 0; i < rows; i++){
        // initialize an array for every row of tiles
        // each row is an array at board[i]
        board[i] = [];
        for(let j = 0; j < columns; j++){
            // make a new tile as an instance of the class Tile 
            let newTile = new Tile(generateId(i, j), defineAdjacentTiles(i, j), defineVirus(i, j, virusLocations));
            // push each new tile into it's row's array
            board[i].push(newTile);
            // console.log(newTile);   
        }
    }
    return board;
}

function render(elem){
    console.log('render is rendering');
    renderBoard(elem);
}

function renderBoard(){
    // adjust the css so that the colums in the CSS will always be the number of columns
// on the game board
    board.forEach((e, i) => {
    e.forEach((f, j) => {
        let square = document.createElement('div')
        square.setAttribute('id', `${generateId(i, j)}`)
        square.setAttribute('class', 'square, shadow')
        square.style.backgroundColor = 'lightgray';
        square.textContent = `${generateId(i, j)}`;
        // square.style.border = '1px solid dark-gray';
        // square.textContent = f ? f.icon : ''
        gameBoard.appendChild(square)
    });
});
}

    // id should be have x and y coordinates to coorespond with DOM id for rendering
function generateId(x, y){
    return `x${x}y${y}`;
}

function defineAdjacentTiles(x, y){
    let adjacentArr = [];
    // both x and y values must be either one less, equal to, or one more
    for(let i = -1; i < 2; i++){
        if(x + i >= 0 && x + i < rows){
            for(let j = -1; j < 2; j++){
                if(y + j >= 0 && y + j < columns){
                    if(i !== 0 || j !== 0){
                    adjacentArr.push(generateId(x + i, y + j));
                    }
                }
            }
        }
    }
    return adjacentArr;
}

function defineVirus(x, y, arr){
    return (arr.includes(generateId(x, y)) ? true : false);
}

// create an array of ten unique x and y coordinates within range for the given 
// rows and columns
function virusInit(){
    let virusArr = [];
    while(virusArr.length < 10){
        let virusAxisX = Math.floor(Math.random() * rows);
        let virusAxisY = Math.floor(Math.random() * columns);
        let virusXY = `x${virusAxisX}y${virusAxisY}`
        if(virusArr.includes(virusXY) === false){
            virusArr.push(virusXY);
        }
    }
    return virusArr;   
}


// /*-------------------event listener functions----------------------*/ 

function tileClick(e){
    console.log(e.target.id);

}


/// code recycle bin
// render board 

// adjust the css so that the colums in the CSS will always be the number of columns
// on the game board
// board.forEach((e, i) => {
//     e.forEach((f, j) => {
//         let square = document.createElement('div')
//         square.setAttribute('id', `r${i}c${j}`)
//         square.setAttribute('class', 'square, shadow')
//         square.style.backgroundColor = 'lightgray';
//         // square.style.border = '1px solid dark-gray';
//         square.textContent = f ? f.icon : ''
//         gameBoard.appendChild(square)
//     })
// })






