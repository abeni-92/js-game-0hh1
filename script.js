const fourBy4 = document.querySelector('.four');
const sixBy6 = document.querySelector('.six');


const freePlay = document.querySelector('.free-play');
const landingPage = document.querySelector('.landing-page');
const selectionPage = document.querySelector('.selection-page')

const play4 = document.querySelector('.btn-four');
const play6 = document.querySelector('.btn-six')

// const main = document.querySelector('main');

freePlay.addEventListener("click", () => {
  landingPage.style.display = 'none'
  selectionPage.style.display = 'flex'

})

play4.addEventListener("click", () => {
  console.log('four')
  selectionPage.style.display = 'none'
  fourBy4.style.display = 'flex'
  // fourBy4.style.display = 'grid'
})

play6.addEventListener("click", () => {
  console.log('six')
  selectionPage.style.display = 'none'
  fourBy4.style.display = 'none'
  sixBy6.style.display = 'flex'
})

// gameboard.addEventListener("mouseover", () => {
  //   gameboard.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.1)'
  // })

const boxes = fourBy4.querySelectorAll('.box')
const gameboardElements = [];
  
boxes.forEach(box => {
  gameboardElements.push(box.dataset)
})

boxes.forEach(box => {
  box.addEventListener("click", (e) => {

    if (box.classList.contains('red')) {
      box.classList.remove('red')
      box.classList.add('blue')
      e.target.dataset.color = "blue"
    } else if (box.classList.contains('blue')) {
      box.classList.remove('blue')
      e.target.dataset.color = ""
    } else {
      box.classList.add('red')
      e.target.dataset.color = "red"
    }
    gameLogic();
  })
})

function getRows() {
  const rows = [];
  for (let i = 0; i < 4; i++) {
    let row = gameboardElements.filter(box => { 
      return box.row == i 
    })
    
    let colors = row.map(box => box.color)
    rows.push(colors)
  }
  
  return rows
}

// console.log(getRows())
// console.log(checkSimilarRows())

function checkSimilarRows() {
  let rows = getRows();

  for (let i = 0; i < rows.length - 1; i++) {
    for (let j = i+1; j < rows.length; j++) {
      const isSimilar = rows[i].every((color, k) => color == rows[j][k])
 
      if (isSimilar) {
        return true
      }
    }
  }

  return false
}

function getColumns() {
  const cols = [];
  for (let i = 0; i < 4; i++) {
    let col = gameboardElements.filter(box => { 
      return box.col == i 
    })

    let colors = col.map(box => box.color)
    cols.push(colors)
  }

  return cols
}


function checkSimilarCols() {
  let cols = getColumns()
  
  for (let i = 0; i < cols.length - 1; i++) {
    for (let j = i+1; j < cols.length; j++) {
      const isSimilar = cols[i].every((color, k) => color == cols[j][k])
      
      if (isSimilar) {
        return true
      }
    }
  }

  return false
}

// console.log(getColumns())
// console.log(checkSimilarCols())

function isThreeAdjacentRow() {
  let rows = getRows();
  // console.log(rows)

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows.length - 2; j++) {
      if(rows[i][j] == rows[i][j+1] && rows[i][j] == rows[i][j+2]) {
        return true
      }
    }
  }

  return false
}

function isThreeAdjacentColumn() {
  let cols = getColumns();
  // console.log(cols)
 
  for (let i = 0; i < cols.length; i++) {
    for (let j = 0; j < cols.length - 2; j++) {
      if(cols[i][j] == cols[i][j+1] && cols[i][j] == cols[i][j+2]) {
        return true
      }
    }
  }

  return false
}

// console.log(isThreeAdjacentRow())
// console.log(isThreeAdjacentColumn())

function isEqualColorsInRow() {
  let rows = getRows()
  // console.log(rows)
  let red, blue;
  for (let i = 0; i < rows.length; i++) {
    red = rows[i].reduce((acc, color) => {
      return color == 'red' ? acc += 1 : acc += 0
    }, 0)
    blue = rows[i].filter(color => color == 'blue').length
    
    if (red !== blue) {
      return false
    }
  }

  return true
}

function isEqualColorsInColumn() {
  let cols = getColumns()
  // console.log(rows)
  let red, blue;
  for (let i = 0; i < cols.length; i++) {
    red = cols[i].reduce((acc, color) => {
      return color == 'red' ? acc += 1 : acc += 0
    }, 0)
    blue = cols[i].filter(color => color == 'blue').length
    
    if (red !== blue) {
      return false
    }
  }

  return true
}

function gameLogic() {
  //  gameboardElements
  let playedBox = 0;
  boxes.forEach(box => {
    if (box.dataset.color != "") {
      playedBox++
    }
  })

  let chRows = checkSimilarRows()
  let chCols = checkSimilarCols()
  let chRowAdj = isThreeAdjacentRow()
  let chColAdj = isThreeAdjacentColumn()
  let chRow = isEqualColorsInRow()
  let chCol = isEqualColorsInColumn()

  if (playedBox == 16) {
    if (chRows || chCols || chRowAdj || chColAdj || !chRow || !chCol) {
      console.log(chRows, chCols, chRowAdj, chColAdj, !chRow, !chCol)
      console.log('Not Correct')
      return false
    } else {
      console.log('You Win!')
      return true
    }
  } 

  console.log(playedBox)
}
// gameLogic()