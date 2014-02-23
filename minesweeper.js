// TODO: when functionality OK, refactor to more intelligent structure
// TODO: Rendering HTML grid
// TODO: attach events, make interface functional


var grid = [],
    gridSize,
    minesCount,
    markedCount,
    el, gridEl;

/******************************
 * Cell
 *****************************/
function Cell(hasMine, shown, marked, position) {
    this.hasMine = hasMine ? true : false;
    this.shown = shown ? true : false;
    this.marked = marked ? true : false;
    this.displayContent = '?';
    this.position = position ? position : null;

    this.open = function() {
        // If has a mine, return false. If no mine, return true.
        this.shown = true;
        return this.hasMine;
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
var openCellXY = function(x, y) {
    openCell(grid[getPos(x, y)]);
}

var openCell = function(cell) {
    var hitMine;

    if (cell.shown === true) return true;

    hitMine = cell.open();

    if (hitMine == false) {
        cell.displayContent = getAdjacentMinesCount(cell);

        if (cell.displayContent === 0) {
            openAdjacentNonMineCells(cell);
        }

        // renderGrid here at least for now, move to clickHandler or somewhere more later.
        renderGrid();
      return cell.displayContent;
    } else {
        // TODO: has mine
        return false;
    }
}

var openAdjacentNonMineCells = function(cell) {
    // open adjacent cells that don't have a mine
    var adjacentNonMineCells,
        adjMineCount;

    // get adjacent cells that aren't yet shown and don't have a mine
    adjacentNonMineCells = M.filter(getAdjacentCells(cell), function(cell) {
        return (!cell.hasMine && !cell.shown);
    });

    if (adjacentNonMineCells.length > 0) {
        M.foreach(adjacentNonMineCells, function(adjacentCell) {
            openCell(adjacentCell);
        });
    }
}

var markCell = function(x, y) {
    var cell = grid[getPos(x, y)];
    return cell.mark(); // returns current marked status
}

/*****************************
 * Things happening after player actions
 ****************************/

var getAdjacentCells = function(cell) {
    var adjacent = [],
        x = cell.position % gridSize,
        y = Math.floor(cell.position / gridSize),
        isTopRow = y === 0 ? true : false,
        isBottomRow = y === (gridSize - 1) ? true : false,
        isLeftEdge = x === 0 ? true : false,
        isRightEdge = x === (gridSize - 1) ? true : false;

    console.log('getAdjacentCells for x:' + x + ' y:' + y );
    // Returns adjacent cells, checks if they are not out of bounds.
    if (!isTopRow)    adjacent.push(grid[getPos(x, y - 1)]);
    if (!isLeftEdge)  adjacent.push(grid[getPos(x - 1, y)]);
    if (!isRightEdge) adjacent.push(grid[getPos(x + 1, y)]);
    if (!isBottomRow) adjacent.push(grid[getPos(x, y + 1)]);

    return adjacent;
}


var getAdjacentMinesCount = function(cell) {
    var mines = M.filter(getAdjacentCells(cell), function(cell) {
        return cell.hasMine === true;
    });
    return mines.length;
}

/******************************
 * Setup
 *****************************/

var initGrid = function(size, minesCount) {
    var i, minePos,
        minesPositions = [];

    gridSize = size;

    // Set up empty array of cells
    for (i = 0; i < size*size; i++) {
        grid[i] = new Cell(false, false, false, i);
    }

    // put minesCount mines to random locations
    i = 0;
    while (i < minesCount) {
        minePos = Math.floor(Math.random()*size * size);
        if (!M.contains(minesPositions, minePos)) {
            console.log('Set mine number ' + i + ' to ' + minePos);
            grid[minePos].hasMine = true;
            i++;
        }
    }
}

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
        if (cell.hasMine) return 'O';
        return cell.displayContent;
    } else {
        return 'X';
    }
    return false;
}

var renderGrid = function() {
    var i, j, s;

    gridEl.innerHTML = '';

    for (j = 0; j < gridSize; j++) {
        s = '';
        for (i = 0; i < gridSize; i++) {
            s += renderCell(grid[getPos(i, j)]);
        }
        gridEl.innerHTML += s + '<br />';
    }
    // TODO: render to container inside el
}

var attachEvents = function() {
    // TODO: attach events to el
}

var initGame = function(size, minesCount, el) {
    gridEl = document.createElement('div');
    gridEl.setAttribute('id', 'msGrid');
    el.appendChild(gridEl);

    initGrid(size, minesCount);
    renderGrid();
}

initGame(10, 10, document.getElementById('mineSweeper'));
