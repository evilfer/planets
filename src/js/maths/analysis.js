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

    var data = require('../data/data'),
        vector = require('./vector'),
        interpolator = require('./interpolator'),

        distance = function (a, b, eph) {
            return vector.distance(eph[a].vectors.p, eph[b].vectors.p);
        },

        angularDiameter = function (a, b, eph) {
            return data.objects[b].radius * 2 / distance(a, b, eph);
        },

        angle = function () {
            var r = [0, 0, 0];

            return function (id, t) {
                interpolator.pos(t, data.t0, data.objects[id], r);
                return Math.atan2(r[0], r[1]);
            };
        }(),

        angleDiff = function (a, b, t) {
            return angle(b, t) - angle(a, t);
        },

        opposition = function (a, b, fromT) {
            var step = Math.min(data.objects[a].step, data.objects[b].step),
                da0 = angleDiff(a, b, fromT);

            for (var t = fromT + step; t <= data.t1; t += step) {
                var da1 = angleDiff(a, b, t);
                if (da1 === 0) {
                    return da1;
                } else if (da0 * da1 < 0) {
                    var t0 = t - step,
                        t1 = t;

                    for (var i = 0; i < 5; i++) {
                        var tm = .5 * (t0 + t1),
                            dam = angleDiff(a, b, tm);

                        if (dam === 0) {
                            return tm;
                        } else if (da0 * dam < 0) {
                            t1 = tm;
                        } else {
                            t0 = tm;
                        }
                    }

                    return .5 * (t0 + t1);
                } else {
                    da0 = da1;
                }
            }

            return false;
        };

    return {
        distance: distance,
        opposition: opposition,
        angularDiameter: angularDiameter
    };

}();
