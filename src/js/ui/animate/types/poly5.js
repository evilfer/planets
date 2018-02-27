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

    var prepare = function (anim, t0, p0, vel0, params) {
            var p1 = params.target,
                p1_p0 = p1 - p0,
                dT = params.duration || (params.dpd * Math.abs(p1_p0)),
                dT_3 = dT * dT * dT,
                dT_4 = dT_3 * dT,
                dT_5 = dT_4 * dT,
                vel0_dT = vel0 * dT;

            anim.a = p0;
            anim.b = vel0;
            anim.d = (10 * p1_p0 - 6 * vel0_dT) / dT_3;
            anim.e = (8 * vel0_dT - 15 * p1_p0) / dT_4;
            anim.f = (6 * p1_p0 - 3 * vel0_dT) / dT_5;

            anim.t0 = t0;
            anim.t1 = t0 + dT;
            anim.v1 = p1;
            anim.vel = vel0;
        },

        init = function (anim, t0, params, v0) {
            prepare(anim, t0, v0, 0, params);
        },

        reset = function (anim, t0, params) {
            prepare(anim, t0, anim.v, anim.vel || 0, params);
        },

        update = function (anim, gt) {

            if (gt >= anim.t1) {
                anim.vel = 0;
                anim.v = anim.v1;
                return true;
            } else {
                var t = gt - anim.t0,
                    t2 = t * t,
                    t3 = t2 * t,
                    t4 = t3 * t,
                    t5 = t4 * t;

                anim.vel = anim.b + 3 * anim.d * t2 + 4 * anim.e * t3 + 5 * anim.f * t4;
                anim.v = anim.a + anim.b * t + anim.d * t3 + anim.e * t4 + anim.f * t5;
                return false;
            }
        };

    return {
        init: init,
        reset: reset,
        update: update
    };
}();
