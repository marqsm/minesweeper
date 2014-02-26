(function(context) {
    var T = context.T,
        grid = ms.getGrid();

    // getAdjacentCells
    var adjCells = ms.getAdjacentCells(grid[10]);

    adjCells.forEach(function(cell) {
        T.assertEquals('Each adjacent cell from getAdjacentCells is defined', typeof cell === 'undefined', false );
    });
    T.assertEquals('from (0, 1) get 5 adjacent cells', adjCells.length, 5);

    var adjCells = ms.getAdjacentCells(grid[ms.getPos(1, 2)]);
    T.assertEquals('from (1, 1) get 8 adjacent cells', adjCells.length, 8);

    var adjCells = ms.getAdjacentCells(grid[ms.getPos(4, 9)]);
    T.assertEquals('from (4, 9) get 5 adjacent cells', adjCells.length, 5);
})(window);