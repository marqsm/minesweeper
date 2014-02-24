// TODO: when functionality OK, refactor to more intelligent structure
// TODO: Add failed-situation, show mines
// TODO: Add counter, show how many mines left

// IMPROVEMENT: Add way to change number of mines
// IMPROVEMENT: Add way to restart
// IMPROVEMENT: Add way flag mines

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
    this.position = !M.isUndefined(position) ? position : null;

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
        if (isGameSolved()) {
            alert('Congratulations! Game solved!');
        }
        return cell.displayContent;
    } else {
        gameFailed();
        return false;
    }
}

var markCell = function(x, y) {
    var cell = grid[getPos(x, y)];
    return cell.mark(); // returns current marked status
}

/*****************************
 * Get adjacent squares, to open empty
 ****************************/
var getAdjacentCells = function(cell) {
    var adjacent = [],
        x = cell.position % gridSize,
        y = Math.floor(cell.position / gridSize),
        isTopRow    = y === 0 ? true : false,
        isBottomRow = y === (gridSize - 1) ? true : false,
        isLeftEdge  = x === 0 ? true : false,
        isRightEdge = x === (gridSize - 1) ? true : false;

    console.log('getAdjacentCells for x:' + x + ' y:' + y );
    // Returns adjacent cells, checks if they are not out of bounds.
    if (!isTopRow)    adjacent.push(grid[getPos(x, y - 1)]);
    if (!isLeftEdge)  adjacent.push(grid[getPos(x - 1, y)]);
    if (!isRightEdge) adjacent.push(grid[getPos(x + 1, y)]);
    if (!isBottomRow) adjacent.push(grid[getPos(x, y + 1)]);

    if (!isTopRow && !isLeftEdge)     adjacent.push(grid[getPos(x - 1, y - 1)])
    if (!isTopRow && !isRightEdge)    adjacent.push(grid[getPos(x + 1, y - 1)])
    if (!isBottomRow && !isLeftEdge)  adjacent.push(grid[getPos(x - 1, y + 1)])
    if (!isBottomRow && !isRightEdge) adjacent.push(grid[getPos(x + 1, y + 1)])

    return adjacent;
}

var getAdjacentMinesCount = function(cell) {
    var mines = M.filter(getAdjacentCells(cell), function(cell) {
        return cell.hasMine === true;
    });
    return mines.length;
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

/*****************************
 * Things happening after player actions
 ****************************/
var showAllCells = function() {
    var mineCounts, notShownCells;

    notShownCells = M.filter(grid, function(cell) {
        return !cell.isShown;
    });
    mineCounts = M.map(notShownCells, getAdjacentMinesCount)

    M.foreach(notShownCells, function(cell, index) {
        cell.displayContent = mineCounts[index];
        cell.shown = true;
    })
    renderGrid();
}

var gameFailed = function() {
    showAllCells();
    alert('Too bad! Refresh to replay!');
}

var isGameSolved = function() {
    var unknownCells = M.filter(grid, function(cell) { return !cell.shown; })

    if (unknownCells.length === minesCount) {
        return true
    }
    return false;
}


/******************************
 * Setup
 *****************************/

var initGrid = function(size, minesCount) {
    var i, minePos;

    gridSize = size;

    // Set up empty array of cells
    for (i = 0; i < size*size; i++) {
        grid[i] = new Cell(false, false, false, i);
    }

    // put minesCount mines to random locations
    i = 0;
    while (i < minesCount) {
        minePos = Math.floor(Math.random()*size * size);
        if (!grid[minePos].hasMine) {
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
    // TODO: cleaner html build
    var cellHtml;

    if (cell.shown) {
        if (cell.hasMine) {
            cellHtml = '<span data-id="' + cell.position + '" class="mine">O</span>';
        } else {
            cellHtml = '<span data-id="' + cell.position + '" class="number">';
            cellHtml += cell.displayContent == 0 ? '&nbsp;' : cell.displayContent;
            cellHtml += '</span>';
        }
        return cellHtml;
    } else {
        cellHtml = '<span data-id="' + cell.position + '" class="unknown">X</span>';
        return cellHtml;
    }
}

var renderGrid = function() {
    var i, j, s;

    gridEl.innerHTML = '';

    for (j = 0; j < gridSize; j++) {
        s = '<div class="row">';
        for (i = 0; i < gridSize; i++) {
            s += renderCell(grid[getPos(i, j)]);
        }
        gridEl.innerHTML += s + '</div>';
    }
}

var openCellHandler = function(event) {
    var cellPos = event.srcElement.getAttribute('data-id');
    openCell(grid[cellPos]);
    console.log(event);
}

var attachEvents = function() {
    var el = document.getElementById('msGrid');
    el.addEventListener('click', openCellHandler, true);
    // TODO: attach events to el
}

var initGame = function(size, mines, el) {
    gridEl = document.createElement('div');
    gridEl.setAttribute('id', 'msGrid');
    el.appendChild(gridEl);
    minesCount = mines;

    initGrid(size, minesCount);
    renderGrid();
    attachEvents();
}

initGame(10, 10, document.getElementById('mineSweeper'));
