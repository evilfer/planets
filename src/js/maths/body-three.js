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

    var THREE = require('three'),


        init = function (data, body) {
            var z = .5 * Math.PI - data.rings.ra,
                x = .5 * Math.PI - data.rings.dec,
                c1 = Math.cos(x / 2),
                s1 = Math.sin(x / 2),
                c3 = Math.cos(z / 2),
                s3 = Math.sin(z / 2);

            body.quaternion = new THREE.Quaternion(
                s1 * c3,
                s1 * s3,
                c1 * s3,
                c1 * c3
            );

            body.ringGeometry = new THREE.RingGeometry(data.rings.inner, data.rings.outer, 32);
        };

    return {
        init: init
    };
}();
