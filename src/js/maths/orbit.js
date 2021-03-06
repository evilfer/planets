/**
 * Copyright 2015-2018 Eloy Villasclaras-Fernandez <eloy.villasclaras@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

module.exports = function () {
    'use strict';

    var vector = require('./vector'),

        z = [0, 0, 1],


        calculateParams = function (mu, state) {
            var orbit = {};
            update(mu, state, orbit);
            return orbit;
        },

        update = function () {

            var hv = [0, 0, 0],
                nv = [0, 0, 0],
                ev = [0, 0, 0];

            return function (mu, state, orbit) {

                var v2 = vector.mod2(state.v),
                    r = vector.mod(state.r),
                    rv = vector.dot(state.r, state.v),
                    h, n,
                    e, apo, per, semiMajor, semiMinor, i, lan, ne, er, arpe, ta,

                    pa, p_a, cosTa, sinTa;

                vector.cross(hv, state.r, state.v);
                h = vector.mod(hv);
                vector.cross(nv, z, hv);
                n = vector.mod(nv);

                //vector.scld(ev, state.r, v2 - mu / r),
                //vector.scld(vrv, state.v, rv);
                //vector.sub(ev, vector.scld(state.v, rv));
                vector.sclSum(ev, state.r, v2 - mu / r, state.v, -rv);
                vector.scl(ev, 1 / mu);

                e = vector.mod(ev);
                ne = e * n;
                er = e * r;

                if (e < 1) {
                    semiMajor = -mu / (v2 - 2 * mu / r);
                    apo = semiMajor * (1 + e);
                    per = semiMajor * (1 - e);
                    semiMinor = Math.sqrt(apo * per);
                } else {
                    semiMinor = vector.mod2(hv);
                    semiMajor = 0;
                    apo = 0;
                    per = 0;
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

                p_a = per - apo;
                pa = apo * per;
                cosTa = Math.cos(ta);
                sinTa = Math.sin(ta);

                orbit.h = h;
                orbit.e = e;
                orbit.arpe = arpe;
                orbit.i = i;
                orbit.lan = lan;
                orbit.ta = ta;
                orbit.per = per;
                orbit.apo = apo;
                orbit.semiMajor = semiMajor;
                orbit.semiMinor = semiMinor;
                orbit.r = 2 * pa * (per + apo + p_a * cosTa) / (p_a * p_a * sinTa * sinTa + 4 * pa);
            };
        }();


    return {
        params: calculateParams,
        update: update
    };

}();
