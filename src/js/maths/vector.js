module.exports = function () {
    'use strict';

    var eq = function (a, b) {
            if (a.length !== b.length) {
                return false;
            }

            for (var i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }

            return true;
        },

        add = function (a, b) {
            for (var i = 0; i < a.length; i++) {
                a[i] += b[i];
            }
        },

        sub = function (a, b) {
            for (var i = 0; i < a.length; i++) {
                a[i] -= b[i];
            }
        },

        sum = function (a, b) {
            var c = a.slice();
            add(c, b);
            return c;
        },

        sclSum = function (a, ka, b, kb) {
            var c = a.slice();
            for (var i = 0; i < c.length; i++) {
                c[i] = c[i] * ka + b[i] * kb;
            }
            return c;
        },

        cross = function (a, b) {
            return [
                a[1] * b[2] - a[2] * b[1],
                a[2] * b[0] - a[0] * b[2],
                a[0] * b[1] - a[1] * b[0]
            ];
        },

        mod2 = function (a) {
            return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
        },

        mod = function (a) {
            return Math.sqrt(mod2(a));
        },

        dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        },

        scl = function (a, k) {
            for (var i = 0; i < a.length; i++) {
                a[i] *= k;
            }
        },

        scld = function (a, k) {
            return [a[0] * k, a[1] * k, a[2] * k];
        };


    return {
        eq: eq,
        add: add,
        sub: sub,
        sum: sum,
        sclSum: sclSum,
        cross: cross,
        mod2: mod2,
        mod: mod,
        dot: dot,
        scl: scl,
        scld: scld
    };
}();