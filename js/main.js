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
        let x = (j + i) % 2
        x ? square.style.backgroundColor = 'magenta'
            : square.style.backgroundColor = 'beige'
        square.textContent = f ? f.icon : ''
        gameBoard.appendChild(square)
    })
})