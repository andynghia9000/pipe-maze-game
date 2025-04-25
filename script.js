let mazeSize = 25;
let playerpos = {x:0,y:0};
let step = {x: 25, y: 25};
let disp = [];

if(window.innerWidth < 750) {
  step.x = step.y = 14;
  mazeSize = 20;
}

function newMaze(x,y) {
  const totalCells = x*y;
  const cells = Array.from({ length: y }, () => Array.from({ length: x }, () => [0,0,0,0]));
  const unvis = Array.from({ length: y }, () => Array.from({ length: x }, () => true));

  let currentCell = [Math.floor(Math.random()*y), Math.floor(Math.random()*x)];
  const path = [currentCell];
  unvis[currentCell[0]][currentCell[1]] = false;
  let visited = 1;

  while (visited < totalCells) {
    const pot = [
      [currentCell[0]-1, currentCell[1], 0, 2],
      [currentCell[0], currentCell[1]+1, 1, 3],
      [currentCell[0]+1, currentCell[1], 2, 0],
      [currentCell[0], currentCell[1]-1, 3, 1]
    ];
    const neighbors = pot.filter(p => p[0] > -1 && p[0] < y && p[1] > -1 && p[1] < x && unvis[p[0]][p[1]]);
    
    if (neighbors.length) {
      const next = neighbors[Math.floor(Math.random()*neighbors.length)];
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

function renderMaze() {
  disp = newMaze(mazeSize, mazeSize);
  let myHTML = "";
  for (let i = 0; i < disp.length; i++) {
    myHTML += '<div class="row">';
    for (let j = 0; j < disp[i].length; j++) {
      const selector = i + "-" + j;
      myHTML += `<div id="${selector}" class="square ${
        disp[i][j][0] == 0 ? 'border-top ' : ''
      }${disp[i][j][1] == 0 ? 'border-right ' : ''
      }${disp[i][j][2] == 0 ? 'border-bottom ' : ''
      }${disp[i][j][3] == 0 ? 'border-left ' : ''
      }${i === mazeSize - 1 && j === mazeSize - 1 ? 'goal' : ''}">&nbsp;</div>`;
    }
    myHTML += '</div>';
  }
  document.getElementById('maze').innerHTML = myHTML;
  sky.style.left = "0px";
  sky.style.top = "0px";
  playerpos = {x: 0, y: 0};
}

const sky = document.getElementById('skyzinha');
let lock = false;

function move(direction) {
  let { x, y } = playerpos;
  switch(direction){
    case 't': if(y>0 && disp[y][x][0]) y--; break;
    case 'r': if(x<mazeSize-1 && disp[y][x][1]) x++; break;
    case 'b': if(y<mazeSize-1 && disp[y][x][2]) y++; break;
    case 'l': if(x>0 && disp[y][x][3]) x--; break;
  }
  playerpos = {x, y};
  sky.style.left = step.x * x + 'px';
  sky.style.top = step.y * y + 'px';

  if (x === mazeSize-1 && y === mazeSize-1) win();
  lock = false;
}

function rotateSky(direction) {
  const rotations = { t: '-90deg', r: '0deg', b: '90deg', l: '-180deg' };
  sky.style.transform = `rotate(${rotations[direction]})`;
}

function win() {
  document.querySelector('.end').style.visibility = 'visible';
}

// Mobile control
['up', 'down', 'left', 'right'].forEach(dir => {
  document.getElementById(dir).addEventListener('click', e => {
    e.preventDefault();
    if (lock) return;
    lock = true;
    const dirMap = { up: 't', down: 'b', left: 'l', right: 'r' };
    rotateSky(dirMap[dir]);
    move(dirMap[dir]);
  });
});

// Keyboard control
document.addEventListener('keydown', e => {
  if (lock) return;
  lock = true;
  const keys = { 38: 't', 39: 'r', 40: 'b', 37: 'l' };
  if (keys[e.keyCode]) {
    rotateSky(keys[e.keyCode]);
    move(keys[e.keyCode]);
  }
});

renderMaze();
