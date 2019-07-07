class Cell {
    constructor(x, y, w) {
        if (random(1) < 0.2) {
            this.mine = true;
        } else {
            this.mine = false;
        }
        this.reaveled = false;
        this.x = x;
        this.y = y;
        this.w = w;
        this.num = 0;
        this.flag = false;
        this.end = false;
    }

    show() {
        stroke(0);
        noFill();
        rect(this.x, this.y, this.w, this.w);
        if (this.flag) {
            image(flag_img, this.x, this.y);
            if (this.end) {
                if (this.mine) {
                    fill(220);
                    ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            } else {
                fill(220);
                rect(this.x, this.y, this.w, this.w);
                if (this.num != 0) {
                    fill(0);
                    text(this.num, this.x + this.w * 0.34, this.y + this.w * 0.7);
                }
            }
            }
        }
        else if (this.reaveled) {
            if (this.mine) {
                    fill(220);
                    ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
            } else {
                fill(220);
                rect(this.x, this.y, this.w, this.w);
                if (this.num != 0) {
                    fill(0);
                    text(this.num, this.x + this.w * 0.34, this.y + this.w * 0.7);
                }
            }
        }     
    }

    contains(x, y) {
        return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
    }

    reveal() {
        this.reaveled = true;
        if (this.mine) {
            this.revealAll();
        } else if (this.num == 0) {
            this.revealNeighbors();
        }
    }

    revealNeighbors() {
        let neighbors = this.getNeighbors();
        for (let i = 0; i < neighbors.length; i++) {
            if (!neighbors[i].reaveled) {
                neighbors[i].reveal();
            }
        }
    }

    getNeighbors() {
        let neighbors = [];
        let i = this.y / this.w;
        let j = this.x / this.w;
        let x;
        let y;
        for (let yoff = -1; yoff <= 1; yoff++) {
            for (let xoff = -1; xoff <=1; xoff++) {
                y = i + yoff;
                x = j + xoff;
                if (y > -1 && y < rows && x > -1 && x < cols) {
                    neighbors.push(grid[y][x]);
                }
            }
        }
        return neighbors;
    }

    countMines() {
        let neighbors = this.getNeighbors();
        let mineCount = 0;
        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i].mine) {
                mineCount++;
            }
        }
        this.num = mineCount;
    }

    revealAll() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j].reaveled = true;
                grid[i][j].end = true;
            }
        }
    }

    setFlag() {
        this.flag = !this.flag;
    }
}