(function(context) {
    var T = context.T;

    // getAdjacentCells
    var adjCells = ms.getAdjacentCells(grid[10]);

    M.foreach(adjCells, function(cell) {
        console.log(cell);
        T.assertEquals('Each adjacent cell from getAdjacentCells is defined', M.isUndefined(cell), false );
    });
    T.assertEquals('from (0, 1) get 5 adjacent cells', adjCells.length, 5);

    var adjCells = getAdjacentCells(grid[getPos(1, 2)]);
    T.assertEquals('from (1, 1) get 8 adjacent cells', adjCells.length, 8);

    var adjCells = getAdjacentCells(grid[getPos(4, 9)]);
    T.assertEquals('from (4, 9) get 5 adjacent cells', adjCells.length, 5);
})(window);