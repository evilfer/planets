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

    var init = function (anim, t0, params, v0) {
            anim.v = v0;
            anim.target = v0;
            anim.t0 = t0;
            reset(anim, t0, params);
        },

        reset = function (anim, t0, params) {
            if (typeof params.delta !== 'undefined') {
                anim.target += params.delta;
            } else if (typeof params.deltaP !== 'undefined') {
                anim.target *= params.deltaP;
            }

            if (typeof params.min !== 'undefined' && anim.target < params.min) {
                anim.target = params.min;
            } else if (typeof params.max !== 'undefined' && anim.target > params.max) {
                anim.target = params.max;
            }

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
                return false;
            }
        };


    return {
        init: init,
        reset: reset,
        update: update
    };
}();
