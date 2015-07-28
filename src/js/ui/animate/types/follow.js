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

    var init = function (anim, t0, params, v1, v0) {
            anim.v = v0;
            reset(anim, t0, params, v1);
        },

        reset = function (anim, t0, params, v1) {
            anim.target = v1;
            anim.t0 = t0;
            anim.halfT = params.halfT;
            anim.threshold = params.threshold;
        },

        update = function (anim, t) {
            var k = Math.pow(2, (anim.t0 - t) / anim.halfT);

            anim.v = (1 - k) * anim.target + k * anim.v;
            anim.t0 = t;

            if (Math.abs(anim.v - anim.target) < anim.threshold) {
                anim.v = anim.target;
                return true;
            } else {
                return true;
            }
        };

    return {
        init: init,
        reset: reset,
        update: update
    };
}();
