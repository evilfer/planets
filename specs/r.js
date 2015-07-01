module.exports = function () {
    'use strict';

    var chai = require('chai'),
        r = function (mod) {
            return require('../src/js/' + mod);
        };

    return {
        expect: chai.expect,
        req: r
    };

}();
