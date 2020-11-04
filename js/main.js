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
    constructor() {
        this.id;
        this.adjoiningVirus = 0;
        this.adjoiningTiles = [];
        this.isReveald;
        this.isVirus;
        this.isQuarantined;
        this.quarantineClickCount;
    }
    toggleRevealed() {
        this.isReveald = true;
    }
    toggleQuarantined() {
        switch(this.isQuarantined) {
            case true :
                return this.isQuarantined = false;
                break;
            case false :
                return this.isQuarantined = true;
                break;
        }
    }

    // tally the number of adjacent squares in which 'isVirus = true'


    // when a tile is revealed by the user, this.revealed = true
    // if it has no adjacent virus, each adjacent virus is revealed and so on.
    // revealAndSpread(adjoined) {
    //     this.toggleRevealed();

    //     if(this.countAdjacentlVirus() > 0){
    //         return;
    //     } else {
    //         this.adjoiningTiles.forEach(function(adjoined){
    //             this.revealAndSpread(adjoined);
    //         });
    //     }
    // }
}



/*----- app's state (variables) -----*/
let timer;
let virusCount;
let virusCountRender;
let setting;
let board = [];
let virusLocations;
let targetedTile;

/*----- cached element references -----*/
let gameBoardElem = document.getElementById('board')
let virusRemainingElem = document.getElementById('virus-remaining');
let timerElem = document.getElementById('timer');
let newGameButtonElem = document.getElementById('new-game');
let tileElements = [];


/*----- event listeners -----*/

// new game button - 'click'
// each tile 'click release'

newGameButtonElem.addEventListener('click', initialize);
gameBoardElem.addEventListener('click', tileClick);
gameBoardElem.addEventListener('contextmenu', quarantineClick);

initialize();

/*----- functions -----*/

/*------------------------- INIT FUNCTION -------------------------------------------*/
function initialize(){
    timer = 0;
    setting = difficulty.easy;
    virusCount = Math.round(rows * columns * setting);
    virusCountRender = virusCount;
    board.length > 0 ? console.log(board.length) : createBoard();
    initializeBoard();
    
    
    
    render(); // need to separate the initial board render from the update render
}

/*------------------------- INIT HELPER FUNCTIONS -------------------------------------------*/

// initialize board where each tile is an instance of the class tile
// id will be the i and j values separated by x and y to denote axis and to
// keep from confusing coordinates with integers
function createBoard(){
    console.log('init is firing');
    for(let i = 0; i < rows; i++){
        // initialize an array for every row of tiles
        // each row is an array at board[i]
        board[i] = [];
        for(let j = 0; j < columns; j++){
            // make a new tile as an instance of the class Tile 
            let newTile = new Tile();
            // newTile.adjoiningTiles.push(defineAdjacentTiles(i, j));
            // push each new tile into it's row's array
            board[i].push(newTile);
            // console.log(newTile);   
        }
    }
    return board;
}

function initializeBoard(){
    virusLocations = virusInit();
    for(let i = 0; i < rows; i++){
        // initialize an array for every row of tiles
        // each row is an array at board[i]
        for(let j = 0; j < columns; j++){
            // initialize attributes in each Tile instance
            
            board[i][j].id = generateId(i,j);
            board[i][j].adjoiningTiles = defineAdjacentTiles(i, j);
            board[i][j].isVirus = defineVirus(i, j, virusLocations);
            board[i][j].adjoiningVirus = countAdjacentlVirus(board[i][j].adjoiningTiles, virusLocations);
            board[i][j].isReveald = false;
            board[i][j].isQuarantined = false;
            board[i][j].quarantineClickCount = 0;
            console.log(`initialized: ${board[i][j].isVirus}`);
        }
    }
}

// id should be have x and y coordinates to coorespond with DOM id for rendering
function generateId(x, y){
    return `x${x}y${y}`;
}

function countAdjacentlVirus(adjacentArr, virusLocationArr) {
    let count = 0;
    adjacentArr.forEach(tile => {
        virusLocationArr.forEach(virusLocation => {
            if(tile === virusLocation){
                count++;
            } 
        })
    })
    return count;
    
}
// i want to define the adjacent tiles by refrence, so I have to use
// an id
function defineAdjacentTiles(x, y){
    let adjacentArr = [];
    // both x and y values must be either one less, equal to, or one more
    for(let i = -1; i < 2; i++){
        if((x + i) >= 0 && (x + i) < rows){
            for(let j = -1; j < 2; j++){
                if((y + j) >= 0 && (y + j) < columns){
                    if(i !== 0 || j !== 0){
                    adjacentArr.push(generateId((x + i),(y + j)));
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
    while(virusArr.length < virusCount){
        let virusAxisX = Math.floor(Math.random() * rows);
        let virusAxisY = Math.floor(Math.random() * columns);
        let virusXY = `x${virusAxisX}y${virusAxisY}`
        if(virusArr.includes(virusXY) === false){
            virusArr.push(virusXY);
        }
    }
    return virusArr;   
}
/*------------------------------ render and render helper functions ----------------------------*/

function render(){
    console.log('render is rendering');
    renderBoard();
    board.forEach((row, idx) => {
        row.forEach((tile, jdx) => {
            // tileElements[idx][jdx].style.backgroundColor = 'lightgray';
            if(tile.isReveald === true){
                console.log(`${tile.id} is revealed`)
                tileElements[idx][jdx].setAttribute('class', 'square revealed');
                if(tile.isVirus === true){
                    console.log(`${tile.id} is a virus`);
                    tileElements[idx][jdx].textContent = 'V';
                } else {
                    tileElements[idx][jdx].textContent = tile.adjoiningVirus
                }
            } else if(tile.isQuarantined === true){
                tileElements[idx][jdx].textContent = 'Q';
                tileElements[idx][jdx].setAttribute('class', 'square shadow quarantined');
            } else {
                tileElements[idx][jdx].setAttribute('class', 'square shadow');
                tileElements[idx][jdx].textContent = `${generateId(idx, jdx)}`;
            }
        });
    });
    virusRemainingElem.innerText = virusCountRender;

}

// create tile elements and cache them in the tileElements variable
function renderBoard(){
    // adjust the css so that the colums in the CSS will always be the number of columns
// on the game board
    if(tileElements.length > 0){
        return;
    } else{
    board.forEach((row, i) => {
        tileElements[i] = [];
        row.forEach((tile, j) => {
            let square = document.createElement('div')
            square.setAttribute('id', `${generateId(i, j)}`)
            
           
            // square.style.border = '1px solid dark-gray';
            // square.textContent = tile ? f.icon : ''
            gameBoardElem.appendChild(square)
            tileElements[i].push(document.getElementById(generateId(i, j)));
        });
    });
    }
}



// /*-------------------event listener functions----------------------*/ 

function tileClick(e){
    console.log(e.target.id);
    targetedTile = board[Number(e.target.id.charAt(1))][Number(e.target.id.charAt(3))];
    console.log(targetedTile);
    recursiveReveal(targetedTile);
    removeEventListener('click', tileClick);
    // board.forEach(function(row, idx){
    //     row.forEach(function(tile, jdx){
    //         if(tile.id === e.target.id){
    //             // tile.revealAndSpread();
    //             recursiveReveal(tile);
    //         }
    //     });
    // });
    render();
}

function quarantineClick(e){
    targetedTile = board[Number(e.target.id.charAt(1))][Number(e.target.id.charAt(3))];
    targetedTile.toggleQuarantined;
    adjustVirusCountRender(targetedTile);
}

function adjustVirusCountRender(tile){
    if(tile.quarantineClickCount > 0){
        tile.quarantineClickCount % 2 === 0 ? virusCountRender++ : virusCountRender--;
}
}

function recursiveReveal(clickedTile){
    clickedTile.toggleRevealed();
    console.log('toggleRevealed:', clickedTile.adjoiningTiles);
    if(clickedTile.adjoiningVirus !== 0){
        return;
    } else {
        console.log('virus log ', clickedTile.adjoiningVirus);
        clickedTile.adjoiningTiles.forEach(function(tile){
            let adjacentTile = board[Number(tile.charAt(1))][Number(tile.charAt(3))];
                    adjacentTile.toggleRevealed();
                    return;  
        });
    }

    // if (clickedTile.countAdjacentlVirus > 0){
    //     clickedTile.toggleRevealed();
    // } else {
    //     board.forEach(function(row, idx){
    //         row.forEach(function(tile, jdx){
    //             if(clickedTile.adjoiningTiles.includes(tile.id) === true){
    //                 clickedTile.toggleRevealed();
    //                 recursiveReveal(tile);
    //             }
                    
    //             });
    //         });
    // }
    
    }

    // if(clickedTile.countAdjacentlVirus() > 0){
    //     return;
    // } else {
    //     clickedTile.adjoiningTiles.forEach(function(adjoined){
    //         recursiveReveal(adjoined);
    //     });
    // }


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






