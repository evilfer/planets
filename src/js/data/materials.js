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
        data = require('./data'),

        objectColor = function (color, l) {
            return new THREE.Color().setHSL(color.h / 255, color.s / 255, l);
        },

        materials = {};

    for (var id in data.objects) {
        if (data.objects.hasOwnProperty(id)) {
            var obj = data.objects[id],
                color = objectColor(obj.ui.color, .5),
                lineColor = objectColor(obj.ui.color, .3);

            materials[id] = {
                color: '#' + color.getHexString(),
                body: obj.ui.color.noLight ? new THREE.MeshBasicMaterial({color: color}) :
                    new THREE.MeshLambertMaterial({color: color, ambient: color}),
                orbit: new THREE.LineBasicMaterial({color: lineColor})
            };

            if (obj.ui.rings) {
                materials[id].rings = new THREE.MeshBasicMaterial({
                    color: objectColor(obj.ui.rings, 1),
                    side: THREE.DoubleSide,
                    opacity: .3,
                    transparent: true
                });
            }
        }
    }

    return materials;
}();
