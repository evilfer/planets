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

        diff = function (a, b) {
            var c = a.slice();
            sub(c, b);
            return c;
        },

        sum = function (r, a, b) {
            for (var i = 0; i < r.length; i++) {
                r[i] = a[i] + b[i];
            }
            return r;
        },

        sclSum = function (r, a, ka, b, kb) {
            for (var i = 0; i < r.length; i++) {
                r[i] = a[i] * ka + b[i] * kb;
            }
            return r;
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
        diff: diff,
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