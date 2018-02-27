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

    var init = function (anim, t0, params, v1, v0) {
            anim.t0 = t0;
            anim.t1 = t0 + params.duration;
            anim.v0 = v0;
            anim.vel = (v1 - v0) / params.duration;
        },

        reset = function (anim, t0, params, v1) {
            init(anim, t0, params, v1, anim.v);
        },

        update = function (anim, t) {
            anim.v = anim.v0 + anim.vel * (Math.min(t, anim.t1) - anim.t0);
            return t >= anim.t1;
        };

    return {
        init: init,
        reset: reset,
        update: update
    };

}();
