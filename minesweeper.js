
var grid = [],
    gridSize,
    minesCount,
    markedCount,
    el, gridEl;

/******************************
 * Cell
 *****************************/
function Cell(hasMine, shown, marked) {
    this.hasMine = hasMine ? true : false;
    this.shown = shown ? true : false;
    this.marked = marked ? true : false;

    this.open = function() {
        // If has a mine, return false. If no mine, return true.
        if (this.hasMine === false) {
            this.shown = true;
            return true;
        }
        return false;
    }

    this.mark = function() {
        // If already marked, take away the mark.
        this.marked = this.marked ? false : true;
        return this.marked;
    }
}


/******************************
 * Player actions
 *****************************/

var openCell = function(x, y) {
    var cell = grid[getPos(x, y)];
    if (cell.open() === true) {

        return getCellAdjacentMinesCount(x, y);
    } else {
        // TODO: has mine
        return false;
    }
}

var markCell = function(x, y) {
    var cell = grid[getPos(x, y)];
    return cell.mark(); // returns current marked status
}

/*****************************
 * Things happening after player actions
 ****************************/

var getAdjacentCells = function(x, y) {
    var adjacent = [];
    // Returns adjacent cells, checks if they are not out of bounds.
    if (y > 0) {
        adjacent.push(grid[getPos(x, y - 1)]);
        if (x > 0) adjacent.push(grid[getPos(x - 1, y - 1)]);
        if (x < gridSize - 1) adjacent.push(grid[getPos(x - 1, y - 1)]);
    }
    if (x > 0) adjacent.push(grid[getPos(x - 1, y)]);
    if (x < gridSize - 1) adjacent.push(grid[getPos(x, y + 1)]);
    if (y < gridSize - 1) {
        adjacent.push(grid[getPos(x, y + 1)]);
        if (x > 0) adjacent.push(grid[getPos(x - 1, y + 1)]);
        if (x < gridSize - 1) adjacent.push(grid[getPos(x - 1, y + 1)]);
    }

    return adjacent;
}

var getAdjacentEmptyCells = function(x, y) {
    return M.filter(getAdjacentCells(x, y), function(cell) {
        return cell.hasMine = false;
    });
}

var openAdjacentEmptyCells = function(x, y) {
    // TODO: open adjacent cells that are empty
    renderGrid();
}

var getCellAdjacentMinesCount = function(x, y) {
    var mines = M.filter(getAdjacentCells(x, y), function(cell) {
        return cell.hasMine = true;
    });
    return mines.length;
}

/******************************
 * Setup
 *****************************/

var initGrid = function(size, minesCount) {
    var i, minePos,
        minesPos = [];

    gridSize = size;

    // Set up empty array of cells
    for (i = 0; i < size*size; i++) {
        grid[i] = new Cell(false, false, false);
    }

    // put mines in place
    i = 0;
    while (i < minesCount) {
        minePos = Math.floor(Math.random()*size * size);
        if (!M.contains(minesPos, minePos)) {
            grid[minePos].hasMine = true;
            i++;
        }
    }
}

var initGame = function(size, minesCount, el) {
    gridEl = document.createElement('div');
    gridEl.setAttribute('id', 'msGrid');
    el.appendChild(gridEl);

    initGrid(size, minesCount);
}

initGame(10, 10, document.getElementById('mineSweeper'));

/*****************************
 * Utils
 *****************************/

var getPos = function(x, y) {
    return y * gridSize + x;
}


/*****************************
 * Rendering
 *****************************/

var renderCell = function(cell) {
    // TODO: return rendered cell
    if (cell.shown) {
        return '-';
    } else {
        return 'X';
    }
    return false;
}

var renderGrid = function() {
    var i, j, s;

    for (j = 0; j < gridSize; j++) {
        s = '';
        for (i = 0; i < gridSize; i++) {
            s += renderCell(grid[getPos(i, j)]);
        }
        console.log(s);
    }
    // TODO: render to container inside el
}

var attachEvents = function() {
    // TODO: attach events to el
}