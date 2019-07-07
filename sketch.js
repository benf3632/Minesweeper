function make2Darray(rows, cols) {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

let flag_img;

function preload() {
    flag_img = loadImage('Minesweeper_flag.png');
}

let grid;
let rows;
let cols;
let w = 20;

function setup() {
    createCanvas(200,200);
    rows = floor(height / w);
    cols = floor(width / w);
    grid = make2Darray(rows, cols);
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = new Cell(j * w, i * w, w);
        }
    }
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].countMines(grid);
        }
    }
}

function draw() {
    background(255);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].show();
        }
    }

}

function mousePressed() {
    let cell;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            cell = grid[i][j];
            if (cell.contains(mouseX, mouseY)) {
                if (mouseButton === LEFT && !cell.reavaled && !cell.flag) {
                    cell.reveal();
                } else if (mouseButton === RIGHT && !cell.reaveled) {
                    cell.setFlag();
                }
            }
        }
    }
}