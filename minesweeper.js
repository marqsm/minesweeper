
var grid = [],
    gridSize,
    minesCount,
    markedCount;

/******************************
 * Cell
 *****************************/
function Cell(content, shown, marked) {
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
    return cell.open(); // if had mine, returns false
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

    if (y > 0) {
        adjacent.push(grid[getPos(x, y - 1)]);
        if (x > 0) adjacent.push(grid[getPos(x - 1, y - 1)]);
        if (x < gridSize) adjacent.push(grid[getPos(x - 1, y - 1)]);
    }
    // TODO: get adjacent cells, return array of Cells
}

var getAdjacentEmptyCells = function(x, y) {
    // TODO: get adjacent cells that are empty
}

var openAdjacentEmptyCells = function(x, y) {
    // TODO: open adjacent cells that are empty
}

var cellAdjacentMines = function(x, y) {
    // TODO: return amount of mines in adjacent cells
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
        minePos = random(size * size);
        if (!M.contains(minesPos, minePos)) {
            grid[minePos].hasMine = true;
            i++;
        }
    }
}

var initGame = function() {
    initGrid(10, 10);
}

/*****************************
 * Utils
 *****************************/

var getPos = function(x, y) {
    return y * size + x;
}


/*****************************
 * Rendering
 *****************************/

var renderCell = function(cell) {
    // TODO: return rendered cell
    if (cell.shown) {
        return
    } else {
        return '?'
    }
    return false;
}

var renderGrid = function(el) {
    // TODO: render to el
}



initGame();