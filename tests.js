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
        if (malabi.isEqual(a, b)) {
            outputOk(desc, a, b);
        } else {
            outputFail(desc, a, b);
        }
    };

    context.T = T;
})(window);
