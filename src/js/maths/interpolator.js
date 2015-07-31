/**
 * Copyright 2015 Eloy Villasclaras-Fernandez <eloy.villasclaras@gmail.com>
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

        interpolate = function (t, t0, data) {
            var state = {r: [0, 0, 0], v: [0, 0, 0]};
            return update(t, t0, data, state) ? state : false;
        },


        pos = function (t, t0, data, r) {
            var dt = t - t0,
                fn = dt / data.step,
                n = Math.floor(fn);

            if (n >= 0 && n < data.points.length - 1) {
                var p0 = data.points[n],
                    p1 = data.points[n + 1],
                    k1 = fn - n,
                    k0 = 1 - k1;

                vector.sclSum(r, p0.r, k0, p1.r, k1);
                return true;
            } else {
                return false;
            }
        },

        update = function (t, t0, data, state) {
            var dt = t - t0,
                fn = dt / data.step,
                n = Math.floor(fn);

            if (n >= 0 && n < data.points.length - 1) {
                var p0 = data.points[n],
                    p1 = data.points[n + 1],
                    k1 = fn - n,
                    k0 = 1 - k1;

                vector.sclSum(state.r, p0.r, k0, p1.r, k1);
                vector.sclSum(state.v, p0.v, k0, p1.v, k1);
                return true;
            } else {
                return false;
            }
        };

    return {
        at: interpolate,
        update: update,
        pos: pos
    };

}();
