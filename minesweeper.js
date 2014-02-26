
// IMPROVEMENT: Add way to change number of mines
// IMPROVEMENT: Add way to restart
// IMPROVEMENT: Add way flag mines
// IMPROVEMENT: Separate presentation layer from game logic?

function mineSweeper(size, mines, el) {
    "use strict"

    var grid = [],
        gridSize = null,
        minesCount = null,
        gridEl = null;
        parentEl = null;

    /******************************
     * Cell
     *****************************/
    function Cell(hasMine, shown, marked, position) {
        this.hasMine = hasMine ? true : false;
        this.shown = shown ? true : false;
        this.marked = marked ? true : false;
        this.displayContent = '?';
        this.position = typeof position !== 'undefined' ? position : null;

        this.open = function() {
            // If has a mine, return false. If no mine, return true.
            this.shown = true;
            return this.hasMine;
        }
    }

    /******************************
     * Player actions
     *****************************/
    var openCell = this.openCell = function(cell) {
        var hitMine;

        if (cell.shown === true) {
            return true;
        }

        hitMine = cell.open();

        // Check if player hit mine
        if (hitMine === true) {
            gameFailed();
            return false;
        }

        // Check if all non-mine squares are open (-> game solved)
        if (isGameSolved()) {
            alert('Congratulations! Game solved!');
        }

        cell.displayContent = getAdjacentMinesCount(cell);
        if (cell.displayContent === 0) {
            openAdjacentNonMineCells(cell);
        }

        return cell.displayContent;
    }

    /*****************************
     * Get adjacent squares, to open empty
     ****************************/
    var getAdjacentCells = this.getAdjacentCells = function(cell) {
        var adjacent = [],
            x = cell.position % gridSize,
            y = Math.floor(cell.position / gridSize),
            isTopRow    = y === 0 ? true : false,
            isBottomRow = y === (gridSize - 1) ? true : false,
            isLeftEdge  = x === 0 ? true : false,
            isRightEdge = x === (gridSize - 1) ? true : false;

        //console.log('getAdjacentCells for x:' + x + ' y:' + y );
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
        var mines = getAdjacentCells(cell).filter(function(cell) {
            return cell.hasMine === true;
        });
        return mines.length;
    }

    // open adjacent cells that aren't yet shown and don't have a mine
    var openAdjacentNonMineCells = function(cell) {
        var adjacentNonMineCells,
            adjMineCount;

        adjacentNonMineCells = getAdjacentCells(cell).filter(function(cell) {
            return (!cell.hasMine && !cell.shown);
        });

        if (adjacentNonMineCells.length > 0) {
            adjacentNonMineCells.forEach(function(adjacentCell) {
                openCell(adjacentCell);
            });
        }
    }

    /*****************************
     * Things happening after player actions
     ****************************/
    var showAllCells = function() {
        var mineCounts, notShownCells;

        notShownCells = grid.filter(function(cell) {
            return !cell.isShown;
        });
        mineCounts = notShownCells.map(getAdjacentMinesCount)

        notShownCells.forEach(function(cell, index) {
            cell.displayContent = mineCounts[index];
            cell.shown = true;
        })
        renderGrid();
    }

    // Called when player hits a mine.
    var gameFailed = function() {
        showAllCells();
        alert('Too bad! Refresh to replay!');
    }

    // Checks if amount of un-opened cells matches mines count (eg. all non-mine cells have been opened)
    var isGameSolved = function() {
        var unknownCells = grid.filter(function(cell) { return !cell.shown; })

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
     * Helpers
     *****************************/

     // (x, y) to position index
    var getPos = this.getPos = function(x, y) {
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
                // show mine
                cellHtml = '<span data-id="' + cell.position + '" class="mine">O</span>';
            } else {
                // show number of adjacent mines
                cellHtml = '<span data-id="' + cell.position + '" class="number">';
                cellHtml += cell.displayContent == 0 ? '&nbsp;' : cell.displayContent;
                cellHtml += '</span>';
            }
        } else {
            // show an unknown cell
            cellHtml = '<span data-id="' + cell.position + '" class="unknown">X</span>';
        }
        return cellHtml;
    }

    // Render the whole grid on screen
    var renderGrid = function() {
        var i, j, s;

        gridEl.innerHTML = '';

        s = '';
        for (j = 0; j < gridSize; j++) {
            s += '<div class="row">';
            for (i = 0; i < gridSize; i++) {
                s += renderCell(grid[getPos(i, j)]);
            }
            s += '</div>';
        }
        gridEl.innerHTML += s;
    }

    // Click handler for a cell
    var openCellHandler = function(event) {
        var cellPos = event.srcElement.getAttribute('data-id');
        openCell(grid[cellPos]);
        // TODO: find a better place for renderGrid
        renderGrid();
    }

    // Attach click handler to msGrid, check which cell from srcElement. This way no need to re-bind on DOM changes.
    var attachEvents = function() {
        var el = document.getElementById('msGrid');
        el.addEventListener('click', openCellHandler, true);
    }

    // Init game data
    var constructor = function(size, mines, el) {
        var mineCountEl = document.createElement('div');

        // TODO: move this html rendering stuff to startGame
        mineCountEl.setAttribute('id', 'msMineCount');
        mineCountEl.innerHTML = 'Number of mines: ' + mines;
        el.appendChild(mineCountEl);
        gridEl = document.createElement('div');
        gridEl.setAttribute('id', 'msGrid');
        el.appendChild(gridEl);

        // Define game variables.
        parentEl = el;
        minesCount = mines;
        gridSize = size;
    }

    // Start the game, render to screen, attach events, init grid.
    this.startGame = function() {
        initGrid(gridSize, minesCount);
        renderGrid();
        attachEvents();
    }

    constructor(size, mines, el);

    return this;
}

var ms = new mineSweeper(10, 10, document.getElementById('mineSweeper'));
ms.startGame();