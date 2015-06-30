module.exports = function () {
    'use strict';

    return function (mod) {
        return require('../src/js/' + mod);
    };

}();
