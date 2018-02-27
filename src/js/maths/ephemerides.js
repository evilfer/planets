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

    var data = require('./../data/data.js'),
        interpolator = require('./interpolator'),
        orbit = require('./orbit'),
        orbitThree = require('./orbit-three'),
        bodyThree = require('./body-three'),
        vector = require('./vector'),

        init = function () {
            var stt = {};

            for (var id in data.objects) {
                if (data.objects.hasOwnProperty(id)) {
                    var obj = data.objects[id],
                        eph = {};

                    eph.vectors = {r: [0, 0, 0], v: [0, 0, 0], p: [0, 0, 0]};

                    if (obj.parent) {
                        eph.orbit = {};
                        orbitThree.init(eph.orbit);
                    }

                    if (obj.rings) {
                        eph.rings = {};
                        bodyThree.init(obj, eph.rings);
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
                        vector.sum(eph.vectors.p, eph.vectors.r, stt[obj.parent].vectors.p);
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
