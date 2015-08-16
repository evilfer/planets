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

    var pi_2 = 2 * Math.PI,
        rad2rev = 1 / pi_2,

        moveAfter = function (a, a0) {
            while (a < a0) {
                a += pi_2;
            }
            while (a > a0 + pi_2) {
                a -= pi_2;
            }
            return a;
        },

        revFrom = function (a, a0) {
            a = rad2rev * (a - a0);

            while (a < 0) {
                a += 1;
            }
            while (a > 1) {
                a -= 1;
            }
            return a;
        };

    return {
        moveAfter: moveAfter,
        revFrom:revFrom
    };

}();
