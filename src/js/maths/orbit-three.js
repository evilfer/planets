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

    var THREE = require('three'),


        init = function (orbit) {
            orbit.quaternion = new THREE.Quaternion();
            orbit.rQuaternion = new THREE.Quaternion();
            orbit.cPos = new THREE.Vector3();
            orbit.scale = new THREE.Vector3();
        },

        /**
         *
         * quaternion equivalent to ZXZ [lan, inc, arpe]
         * or ZXY(inc, 0, lan) * ZXY(0, 0, arpe)
         *
         * @param orbit
         */

        setData = function (orbit) {
            var ca = Math.cos(orbit.arpe / 2), sa = Math.sin(orbit.arpe / 2),
                ci = Math.cos(orbit.i / 2), si = Math.sin(orbit.i / 2),
                cn = Math.cos(orbit.lan / 2), sn = Math.sin(orbit.lan / 2);

            orbit.quaternion = new THREE.Quaternion(
                sa * si * sn + ca * si * cn,
                ca * si * sn - sa * si * cn,
                ca * ci * sn + sa * ci * cn,
                ca * ci * cn - sa * ci * sn
            );

            orbit.rQuaternion = new THREE.Quaternion(
                0,
                0,
                Math.sin(orbit.ta / 2),
                Math.cos(orbit.ta / 2)
            );

            orbit.cPos = new THREE.Vector3(orbit.per - orbit.semiMajor, 0, 0);
            orbit.scale = new THREE.Vector3(orbit.semiMajor, orbit.semiMinor, 1);
        },

        update = function (orbit) {
            var ca = Math.cos(orbit.arpe / 2), sa = Math.sin(orbit.arpe / 2),
                ci = Math.cos(orbit.i / 2), si = Math.sin(orbit.i / 2),
                cn = Math.cos(orbit.lan / 2), sn = Math.sin(orbit.lan / 2);

            orbit.quaternion.set(
                sa * si * sn + ca * si * cn,
                ca * si * sn - sa * si * cn,
                ca * ci * sn + sa * ci * cn,
                ca * ci * cn - sa * ci * sn
            );

            orbit.rQuaternion.set(
                0,
                0,
                Math.sin(orbit.ta / 2),
                Math.cos(orbit.ta / 2)
            );

            orbit.cPos.set(orbit.per - orbit.semiMajor, 0, 0);
            orbit.scale.set(orbit.semiMajor, orbit.semiMinor, 1);
        };

    return {
        init: init,
        setData: setData,
        update: update
    };
}();
