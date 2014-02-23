(function(context) {
    var T = context.T;

    //T.assertEquals('test', 1, 2);
    //T.assertEquals('test', 1, 1);

    // getAdjacentCells
    var adjCells = getAdjacentCells(grid[10]);

    M.foreach(adjCells, function(cell) {
        console.log(cell);
        T.assertEquals('Each adjacent cell from getAdjacentCells is defined', M.isUndefined(cell), false );
    });
    T.assertEquals('from (0, 1) get 3 adjacent cells', adjCells.length, 3);

    var adjCells = getAdjacentCells(grid[getPos(1, 2)]);
    T.assertEquals('from (1, 1) get 4 adjacent cells', adjCells.length, 4);
    var adjCells = getAdjacentCells(grid[getPos(4, 9)]);
    T.assertEquals('from (4, 9) get 3 adjacent cells', adjCells.length, 3);




})(window);