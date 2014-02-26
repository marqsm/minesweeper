(function(context) {
    "use strict";

    var T = {},
        $test;

    /*****************************************************************************
     * Setup
     *****************************************************************************/

    // Add tests container to DOM
    $test = document.createElement('ol');
    $test.setAttribute('id', 'tests')
    document.getElementsByTagName('body')[0].appendChild($test);

    var isEqual = function(a, b) {
        var len, i, same = true;

        if (a === b) {
            return true;
        } else if (isArray(a) && isArray(b)) {
            // check array items equality
            // TODO: refactor array items equality check to own function, add recursion for nested arrays check.
            if (a.length == b.length) {
                len = a.length;
                for (i = 0; i < len; i++) {
                    same = (a[i] == b[i]);
                    if (!same) return false;
                }
                return same;
            }
        }
        // TODO: compare objects

        return false;
    };
    /*****************************************************************************
     * Test functionality
     *****************************************************************************/
    var outputOk = function(desc, a, b) {
        $test.innerHTML += '<li class="ok">ok: ' + desc + '</li>';
    }

    var outputFail = function(desc, a, b) {
        $test.innerHTML += '<li class="fail">failed: ' + desc + ' --- ' + a + ' !== ' + b + '</li>';
    }

    var assertEquals = T.assertEquals = function(desc, a, b) {
        if (isEqual(a, b)) {
            outputOk(desc, a, b);
        } else {
            outputFail(desc, a, b);
        }
    };

    context.T = T;
})(window);
