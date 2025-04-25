let mazeSize = 25;
let playerpos = {x: 0, y: 0};
let winpos = {x: mazeSize, y: mazeSize};
let step = {x: 26, y: 26};

if (window.innerWidth < 750) {
  step.x = 14;
  step.y = 14;
  mazeSize = 20;
}

window.addEventListener('resize', function(e) {
  if (window.innerWidth < 750) {
    step.x = 14;
    step.y = 14;
    mazeSize = 20;
  } else {
    step.x = 26;
    step.y = 26;
  }
});

function newMaze(x, y) {
  let totalCells = x * y;
  let cells = new Array();
  let unvis = new Array();
  for (let i = 0; i < y; i++) {
    cells[i] = new Array();
    unvis[i] = new Array();
    for (let j = 0; j < x; j++) {
      cells[i][j] = [0, 0, 0, 0];
      unvis[i][j] = true;
    }
  }

  let currentCell = [Math.floor(Math.random() * y), Math.floor(Math.random() * x)];
  let path = [currentCell];
  unvis[currentCell[0]][currentCell[1]] = false;
  let visited = 1;

  while (visited < totalCells) {
    let pot = [
      [currentCell[0] - 1, currentCell[1], 0, 2],
      [currentCell[0], currentCell[1] + 1, 1, 3],
      [currentCell[0] + 1, currentCell[1], 2, 0],
      [currentCell[0], currentCell[1] - 1, 3, 1]
    ];
    let neighbors = [];

    for (let l = 0; l < 4; l++) {
      if (
        pot[l][0] > -1 &&
        pot[l][0] < y &&
        pot[l][1] > -1 &&
        pot[l][1] < x &&
        unvis[pot[l][0]][pot[l][1]]
      ) {
        neighbors.push(pot[l]);
      }
    }

    if (neighbors.length) {
      let next = neighbors[Math.floor(Math.random() * neighbors.length)];
      cells[currentCell[0]][currentCell[1]][next[2]] = 1;
      cells[next[0]][next[1]][next[3]] = 1;
      unvis[next[0]][next[1]] = false;
      visited++;
      currentCell = [next[0], next[1]];
      path.push(currentCell);
    } else {
      currentCell = path.pop();
    }
  }
  return cells;
}
