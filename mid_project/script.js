const canvas = document.getElementById('Tetris');
const context = canvas.getContext('2d');
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const leftButton = document.getElementById("moveLeft");
const rightButton = document.getElementById("moveRight");
const rotateButton = document.getElementById("matrixRotate");
var begin = 0;
var total_score = 0;
var tttTime = -1;
context.scale(20, 20);

class Block {
  constructor(x = 0, y = 0, matrix = []) {
    this._x = x;
    this._y = y;
    this._matrix = matrix;
  }
  //  getter method
  get x() {
      return this._x;
  }
  get y() {
      return this._y;
  }
  get matrix() {
      return this._matrix;
  }
  //  setter method
  set x(input) {
    this._x = input;
  }
  set y(input) {
    this._y = input;
  }
  set matrix(input) {
    this._matrix = input;
  }
}

const player = [];

for (let i = 0; i < 11; i++){
    player.push(new Block());
    player[i].matrix = createMatrix(3,3);
}
let whatPlayer = player[10];
player[10].x = -10;
player[10].y = -10;

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}
const arena = createMatrix(13, 25);
// console.log(arena); console.table(arena);

function showCoords(evt){
  var rect = canvas.getBoundingClientRect();
  console.log(
    "clientX value: " + evt.clientX + "\n" +
    "clientY value: " + evt.clientY + "\n"
  );
  console.log(
    "pageX value: " + evt.pageX + "\n" +
    "pageY value: " + evt.pageY + "\n"
  );
  mouseX = evt.clientX - rect.left;
  mouseY = evt.clientY - rect.top;
  console.log(
    mouseX + "\n" + mouseY + "\n"
  );
  mouseX_c = mouseX / 20;
  mouseY_c = mouseY / 20;
  console.log(
    mouseX_c + "\n" + mouseY_c + "\n"
  );
  for (let k = 0; k < 10; k++){
      if (mouseY_c >= player[k].y && mouseY_c < player[k].y + player[k].matrix[0].length){
          if (mouseX_c >= player[k].x && mouseX_c < player[k].x + player[k].matrix.length){
              whatPlayer = player[k];
              drawLine(whatPlayer);
              break;
          }
      }
  }
}
startButton.addEventListener("click", () => {
    if (total_score == 0){
        total_score = 1;
    }
    updateScore();
    update();
});
resetButton.addEventListener("click", () => {
    location.reload();
});
leftButton.addEventListener("click", () => {
    playerMove(-1, whatPlayer);
});
rightButton.addEventListener("click", () => {
    playerMove(1, whatPlayer);
});
rotateButton.addEventListener("click", () => {
    let ok = 1;
    for (let i = 0; i < arena[24].length; ++i){
        if (arena[24][i] !== 0){
            ok = 0;
            break;
        }
    }
    if ((whatPlayer.matrix.length + whatPlayer.y) <= arena.length && ok == 1) //  && ok === 1
        playerRotate(1, whatPlayer);
});

function arenaSweep() {
    let rowCount = 1;
    let refresh = 0;
    for (let x = 0; x < arena[24].length; ++x) {
        if (arena[24][x] != 0) {
            refresh = 1;
            break;
        }
    }
    if (refresh === 1){
        const row1 = arena.splice(24, 1)[0].fill(0);
        const row2 = arena.splice(23, 1)[0].fill(0);
        const row3 = arena.splice(22, 1)[0].fill(0);
        const row4 = arena.splice(21, 1)[0].fill(0);
        const row5 = arena.splice(20, 1)[0].fill(0);
        arena.push(row5);
        arena.push(row4);
        arena.push(row3);
        arena.push(row2);
        arena.push(row1);
    }
}

function collideAll(arena, player) {
    for (let k = 0; k < 10; k++){

        for (let row = 0; row < player[k].matrix.length; row++) {
            for (let col = 0; col < player[k].matrix[row].length; col++) {
                if (player[k].matrix[row][col] !== 0 &&
                    (arena[row+ player[k].y] &&
                    arena[row+ player[k].y][col + player[k].x]) !== 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

function collideSingle(arena, player) {
    for (let row = 0; row < player.matrix.length; row++) {
        for (let col = 0; col < player.matrix[row].length; col++) {
            if (player.matrix[row][col] !== 0 &&
                (arena[row + player.y] &&
                arena[row + player.y][col + player.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createPiece(type) {
    if (type === 'C') {
        return [
            [0,5,5,5,0],
            [0,5,0,0,0],
            [0,5,0,0,0],
            [0,5,0,0,0],
            [0,5,5,5,0],
        ];
    }else if (type === 'S') {
        return [
            [0,6,6,6,0],
            [0,6,0,0,0],
            [0,6,6,6,0],
            [0,0,0,6,0],
            [0,6,6,6,0],
        ];
    }else if (type === 'I') {
        return [
            [0,0,7,0,0],
            [0,0,7,0,0],
            [0,0,7,0,0],
            [0,0,7,0,0],
            [0,0,7,0,0],
        ];
    }else if (type === 'E') {
        return [
            [0,8,8,8,0],
            [0,8,0,0,0],
            [0,8,8,8,0],
            [0,8,0,0,0],
            [0,8,8,8,0],
        ];
    }else if (type === 'T') {
        return [
            [1,1,1],
            [0,1,0],
            [0,0,0],
        ];
    }else if (type === 'o') {
        return [
            [2,2],
            [2,2],
        ];
    }else if (type === 'J') {
        return [
            [0,3,0],
            [0,3,0],
            [3,3,0],
        ];
    }else if (type === 'z') {
        return [
            [0,0,4],
            [0,4,4],
            [0,4,0],
        ];
    }
}

function drawLine(wh) {
    let a = -1; //left
    let b = -1; //right
    let c = -1; //top
    let d = -1; //down
    for (let x = 0; x < wh.matrix[0].length; x++){
        for (let y = 0; y < wh.matrix.length; y++){
            if (wh.matrix[y][x] != 0){
                a = x;
                break;
            }
        }
        if (a != -1){
            break;
        }
    }
    for (let x = wh.matrix[0].length-1; x > -1; x--){
        for (let y = 0; y < wh.matrix.length; y++){
            if (wh.matrix[y][x] != 0){
                b = x;
                break;
            }
        }
        if (b != -1){
            break;
        }
    }
    for (let y = 0; y < wh.matrix.length; y++){
        for (let x = 0; x < wh.matrix[0].length; x++){
            if (wh.matrix[y][x] != 0){
                c = y;
                break;
            }
        }
        if (c != -1){
            break;
        }
    }
    for (let y = wh.matrix.length-1; y > -1; y--){
        for (let x = 0; x < wh.matrix[0].length; x++){
            if (wh.matrix[y][x] != 0){
                d = y;
                break;
            }
        }
        if (d != -1){
            break;
        }
    }
    // console.log(
    //     a+" "+b+" "+c+" "+d+" "
    // );
    let aa = a+wh.x;
    let cc = c+wh.y;
    let bb = b-a+1;
    let dd = d-c+1;
    // console.log(
    //     aa+" "+cc+" "+wid+" "+len+" "
    // );
    context.beginPath();
    context.lineWidth = 0.2;
    context.strokeStyle = "black";
    context.strokeRect(aa, cc, bb, dd);
}

function draw() {
    context.fillStyle = '#cccccc';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {x: 0, y: 0});
    for (let k = 0; k < 10; k++){
        drawMatrix(player[k].matrix, player[k].x, player[k].y);
    }
    // drawMatrix(player[2].matrix, player[2].x, player[2].y);
    // drawMatrix(player[3].matrix, player[3].x, player[3].y);
    // drawMatrix(player[4].matrix, player[4].x, player[4].y);
    // drawMatrix(player[5].matrix, player[5].x, player[5].y);
    // console.table(arena);
}

function drawMatrix(matrix, player_x, player_y) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0){
                context.fillStyle = colors[value];
                context.fillRect(x + player_x,
                                 y + player_y,
                                 1, 1);
            }
        });
    });
}

function merge(arena, player) {
    for (let y = 0; y < player.matrix.length; y++){
        for (let x = 0; x < player.matrix[y].length; x++){
            let col = player.x;
            let row = player.y;
            // console.log(y, x, player.matrix[y][x], arena[y + col][x + row]);
            if (player.matrix[y][x] !== 0){
                arena[y + row][x + col] = player.matrix[y][x];
            }
        }
    }
}

function playerDrop() {
    if (tttTime % 5 === 0 && tttTime != 0){
        total_score++;
        playerReset();
        updateScore();
    }
    for (let k = 0; k < 10; k++){
        let ok = 0;
        for (let y = 0; y < player[k].matrix.length; y++){
            for (let x = 0; x < player[k].matrix[y].length; x++){
                if (player[k].matrix[y][x] > 0){
                    ok = 1;
                    player[k].y += 1;
                    drawLine(whatPlayer);
                    if (player[k].y + player[k].matrix.length > 25 && collideSingle(arena, player[k])){

                        if (player[k] == whatPlayer){
                            whatPlayer = player[10];
                        }
                        // console.log(arena[19]);
                        // console.log(arena);

                        player[k].y -= 1;

                        merge(arena, player[k]);
                        updateScore();
                        player[k].matrix = createMatrix(3,3);
                        player[k].y = -1;
                        arenaSweep();
                    }
                    break;
                }
            }
            if (ok == 1)
                break;
        }
    }

    dropCounter = 0;
}

function playerMove(dir, player) {
    player.x += dir;
    if (collideSingle(arena, player)){
        player.x -= dir;
    }
    drawLine(whatPlayer);
}

function playerReset() {
    const pieces = 'CSIEToJz';
    console.log('begin');
    console.log(begin);
    if (begin === 0) {
        player[0].matrix = createPiece('C');
        console.table(player[0].matrix);
        player[0].y = -1;
        player[0].x = (arena[0].length / 2 | 0) -
                       (player[0].matrix[0].length / 2 | 0);
    }else if (begin === 1) {
        player[1].matrix = createPiece('S');
        player[1].y = -1;
        player[1].x = (arena[0].length / 2 | 0) -
                       (player[1].matrix[0].length / 2 | 0);
    }else if (begin === 2) {
        player[2].matrix = createPiece('I');
        player[2].y = -1;
        player[2].x = (arena[0].length / 2 | 0) -
                       (player[2].matrix[0].length / 2 | 0);
    }else if (begin === 3) {
        player[3].matrix = createPiece('E');
        player[3].y = -1;
        player[3].x = (arena[0].length / 2 | 0) -
                       (player[3].matrix[0].length / 2 | 0);
    }else {
        for (let k = 0; k < 10; k++){
            if (begin % 10 == k){
                player[k].matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
                player[k].y = -1;
                player[k].x = (arena[0].length / 2 | 0) -
                                (player[k].matrix[0].length / 2 | 0);
            }
        }
    }
    begin += 1;
    // 不會觸發
    for (let k = 0; k < 10; k++){
        if (player[k].y == -1){
            continue;
        }
        let ok = 0;
        for (let y = 0; y < player[k].matrix.length; y++){
            for (let x = 0; x < player[k].matrix[y].length; x++){
                if (player[k].matrix[y][x] != 0){
                    ok = 1;
                    break;
                }
            }
            if (ok == 1){
                break;
            }
        }
        if (collideSingle(arena, player[k]) && ok == 1){
            console.log('error');
            total_score = 0;
            updateScore();
        }
    }
}

function playerRotate(dir, player) {
    const pos = player.x;
    let offset = 1;
    rotate(player.matrix, dir);
    console.log('472');
    while (collideSingle(arena, player)) {
        player.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length){
            rotate(player.matrix, -dir);
            player.x = pos;
            break;
        }
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    if (dir > 0){
        matrix.forEach(row => row.reverse());
    }else{
        matrix.reverse();
    }
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval){
        tttTime += 1;
        // console.log(player[0].y);
        // console.log(player[0].x);
        updateScore();
        playerDrop();
    }
    // console.log(dropCounter);
    draw();
    drawLine(whatPlayer);
    requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById('score').innerText = total_score;
}

const colors = [
    '#cccccc',
    'red',
    'blue',
    'violet',
    'green',
    'purple',
    'orange',
    'coral',
    'aqua',
];

// document.addEventListener('keydown', event => {
//     if (event.keyCode === 37){
//         playerMove(-1);
//     } else if (event.keyCode === 39){
//         playerMove(1);
//     } else if (event.keyCode === 40){
//         playerDrop();
//     }else if (event.keyCode === 81){
//         playerRotate(-1);
//     }else if (event.keyCode === 87){
//         playerRotate(1);
//     }
// });
updateScore();
playerReset();
