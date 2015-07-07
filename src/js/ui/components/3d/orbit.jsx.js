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
        Object3D = ReactTHREE.Object3D,
        Line = ReactTHREE.Line,

        orbitCalc = require('../../../maths/orbit');

    return React.createClass({

        render: function () {
            var ephemeris = this.props.ephemeris,
                orbit = ephemeris.orbit,
                focus = ephemeris.focus ? new THREE.Vector3(ephemeris.focus[0], ephemeris.focus[1], ephemeris.focus[2]) : new THREE.Vector3(0, 0, 0),

                material = new THREE.LineBasicMaterial({color: 'blue'}),
                material2 = new THREE.LineBasicMaterial({color: 'gray'}),
                material3 = new THREE.LineBasicMaterial({color: 'green'}),
                ellipse = new THREE.EllipseCurve(orbit.p - orbit.semiMajor, 0, orbit.semiMajor, orbit.semiMinor, 0, 2.0 * Math.PI, false),
                ellipsePath = new THREE.CurvePath(),
                quaternion = new THREE.Quaternion(),
                ellipseGeometry,

                rGeometry = new THREE.Geometry(),
                rPos = orbitCalc.pos(orbit, orbit.ta, false),

                nGeometry = new THREE.Geometry(),
                nPos = orbitCalc.pos(orbit, -orbit.arpe, true),

                apGeometry = new THREE.Geometry(),
                apPos = orbitCalc.pos(orbit, 0, true),

                ca = Math.cos(orbit.arpe / 2), sa = Math.sin(orbit.arpe / 2),
                ci = Math.cos(orbit.i / 2), si = Math.sin(orbit.i / 2),
                cn = Math.cos(orbit.lan / 2), sn = Math.sin(orbit.lan / 2);

            ellipsePath.add(ellipse);
            ellipseGeometry = ellipsePath.createPointsGeometry(100);
            ellipseGeometry.computeTangents();

            rGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
            rGeometry.vertices.push(new THREE.Vector3(rPos.x, rPos.y, 0));

            apGeometry.vertices.push(new THREE.Vector3(apPos.x, apPos.y, 0));
            apGeometry.vertices.push(new THREE.Vector3(apPos.x2, apPos.y2, 0));

            nGeometry.vertices.push(new THREE.Vector3(nPos.x, nPos.y, 0));
            nGeometry.vertices.push(new THREE.Vector3(nPos.x2, nPos.y2, 0));


            /*
             * Equivalent to ZXZ [lan, inc, arpe]
             * or ZXY(inc, 0, lan) x ZXY(0, 0, arpe)
             */
            quaternion.set(
                sa * si * sn + ca * si * cn,
                ca * si * sn - sa * si * cn,
                ca * ci * sn + sa * ci * cn,
                ca * ci * cn - sa * ci * sn
            );

            console.log(orbit.a, orbit.p, orbit.semiMajor, orbit.semiMinor, orbit.e);

            return (
                <Object3D position={focus} quaternion={quaternion}>
                    <Line geometry={ellipseGeometry} material={material}/>
                    <Line geometry={rGeometry} material={material}/>
                    <Line geometry={apGeometry} material={material2}/>
                    <Line geometry={nGeometry} material={material3}/>
                </Object3D>
            );

        }
    });
}();