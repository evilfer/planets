module.exports = function () {
    'use strict';

    var vector = require('./vector'),

        z = [0, 0, 1],

        calculateParams = function (mu, state) {

            var v2 = vector.mod2(state.v),
                r = vector.mod(state.r),
                rv = vector.dot(state.r, state.v),

                hv = vector.cross(state.r, state.v),
                h = vector.mod(hv),
                nv = vector.cross(z, hv),
                n = vector.mod(nv),

                ev = vector.scld(state.r, v2 - mu / r),
                e, a, p, i, lan, ne, er, arpe, ta;

            vector.sub(ev, vector.scld(state.v, rv));
            vector.scl(ev, 1 / mu);

            e = vector.mod(ev);
            ne = e * n;
            er = e * r;

            if (e < 1) {
                a = -mu / (v2 - 2 * mu / r);
                p = a * (1 - e * e);
            } else {
                p = vector.mod2(hv);
                a = 0;
            }

            i = h > 0 ? Math.acos(hv[2] / h) : 0;
            lan = n > 0 ? Math.acos(nv[0] / n) : 0;
            arpe = ne > 0 ? Math.acos(vector.dot(nv, ev) / ne) : 0;
            ta = er > 0 ? Math.acos(vector.dot(ev, state.r) / er) : 0;

            if (nv[1] < 0) {
                lan = 2 * Math.PI - lan;
            }

            if (ev[2] < 0) {
                arpe = 2 * Math.PI - arpe;
            }

            if (rv < 0) {
                ta = 2 * Math.PI - ta;
            }

            return {
                h: h,
                e: e,
                arpe: arpe,
                i: i,
                lan: lan,
                ta: ta,
                p: p,
                a: a
            };
        },

        around = function (center, absState) {
            var state = {
                    r: vector.diff(absState.r, center.r),
                    v: vector.diff(absState.v, center.v)
                },
                params = calculateParams(center.mu, state);

            params.semiMajor = .5 * (params.a + params.p);
            params.semiMinor = Math.sqrt(params.a * params.p);

            return params;
        };

    return {
        params: calculateParams
    };

}();
