// constants
const rows = 9;

class Tile {
    constructor(id, adjoiningTiles, isReveald, isVirus, isQuarentined) {
        this.id = id;
        this.adjoiningTiles = adjoiningTiles;
        this.isReveald = isReveald;
    }
}


// make a class for tiles that has
// id, adjoiningTiles isVirus, isBomb, isQuarentined, isRevealed




let gameBoard = document.getElementById('board')
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
  ]
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