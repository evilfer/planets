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
    var data = require('./data.js'),
        interpolator = require('../maths/interpolator'),
        orbit = require('../maths/orbit'),
        orbitThree = require('../maths/orbit-three'),
        vector = require('../maths/vector'),

        init = function () {
            var stt = {};

            for (var id in data.objects) {
                if (data.objects.hasOwnProperty(id)) {
                    var eph = {};

                    if (data.objects[id].parent) {
                        eph.vectors = {r: [0, 0, 0], v: [0, 0, 0]};
                        eph.orbit = {};
                        orbitThree.init(eph.orbit);
                    }

                    stt[id] = eph;
                }
            }

            return stt;
        },

        state = function (t, stt) {
            for (var id in data.objects) {
                if (data.objects.hasOwnProperty(id)) {
                    var obj = data.objects[id],
                        eph = stt[id];

                    if (obj.parent) {
                        interpolator.update(t, data.t0, obj, eph.vectors);
                        orbit.update(data.objects[obj.parent].mu, eph.vectors, eph.orbit);
                        orbitThree.update(eph.orbit);
                    }
                }
            }
        };

    return {
        state: state,
        init: init
    };

}();
