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

    var React = require('react'),
        ReactTHREE = require('react-three'),
        THREE = require('three'),
        Line = ReactTHREE.Line;

    return React.createClass({

        render: function () {
            var ephemeris = this.props.ephemeris,
                orbit = ephemeris.orbit,
                focus = ephemeris.focus ? THREE.Vector3(ephemeris.focus[0], ephemeris.focus[1], ephemeris.focus[2]) : THREE.Vector3(0, 0, 0),

                material = new THREE.LineBasicMaterial({color: 'blue'}),
                ellipse = new THREE.EllipseCurve(orbit.p - orbit.semiMajor, 0, orbit.semiMajor, orbit.semiMinor, 0, 2.0 * Math.PI, false),
                ellipsePath = new THREE.CurvePath(),
                quaternion = new THREE.Quaternion(),
                quaternion2 = new THREE.Quaternion(),
                quaternion3 = new THREE.Quaternion(),
                ellipseGeometry;

            quaternion.setFromEuler(new THREE.Euler(orbit.i, 0, orbit.lan, 'ZXY'));
            quaternion2.setFromEuler(new THREE.Euler(0, 0, orbit.arpe, 'ZXY'));

            quaternion.multiply(quaternion2);

            ellipsePath.add(ellipse);
            ellipseGeometry = ellipsePath.createPointsGeometry(100);
            ellipseGeometry.computeTangents();

            var ca = Math.cos(orbit.arpe / 2), sa = Math.sin(orbit.arpe / 2),
                ci = Math.cos(orbit.i / 2), si = Math.sin(orbit.i / 2),
                cn = Math.cos(orbit.lan / 2), sn = Math.sin(orbit.lan / 2);

            quaternion3.set(
                ca * si * cn - sa * si * sn,
                -ca * si * sn - sa * si * cn,
                ca * ci * sn + sa * ci * cn,
                ca * ci * cn - sa * ci * sn
            );

            return (
                <Line geometry={ellipseGeometry}
                      material={material}
                      position={focus}
                      quaternion={quaternion}/>
            );
        }
    });
}();