module.exports = function () {
    'use strict';

    var vector = require('./vector'),

        interpolate = function (t, data) {
            var dt = t - data.t0,
                fn = dt / data.gap,
                n = Math.floor(fn);

            if (n >= 0 && n < data.points.length - 1) {
                var p0 = data.points[n],
                    p1 = data.points[n + 1],
                    k1 = fn - n,
                    k0 = 1 - k1;

                return {
                    r: vector.sclSum(p0.r, k0, p1.r, k1),
                    v: vector.sclSum(p0.v, k0, p1.v, k1)
                };
            } else {
                return false;
            }

        };

    return {
        at: interpolate
    };

}();
