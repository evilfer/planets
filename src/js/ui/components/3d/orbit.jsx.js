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


        objectColor = require('../../utils/object-color'),
        orbitCalc = require('../../../maths/orbit'),
        vector = require('../../../maths/vector');

    return React.createClass({

        render: function () {
            var obj = this.props.obj,
                ephemeris = this.props.ephemeris,
                orbit = ephemeris.orbit,

                rPos = orbitCalc.pos(orbit, orbit.ta, false),
                nPos = orbitCalc.pos(orbit, -orbit.arpe, true),
                apPos = orbitCalc.pos(orbit, 0, true),

                ellipse = new THREE.EllipseCurve(orbit.per - orbit.semiMajor, 0, orbit.semiMajor, orbit.semiMinor, 0, 2.0 * Math.PI, false),
                material = new THREE.LineBasicMaterial({color: objectColor(obj, .5)}),

                material2 = new THREE.LineBasicMaterial({color: objectColor(obj, .2)}),
                material3 = new THREE.LineBasicMaterial({color: objectColor(obj, .1)}),
                ellipse = new THREE.EllipseCurve(orbit.per - orbit.semiMajor, 0, orbit.semiMajor, orbit.semiMinor, 0, 2.0 * Math.PI, false),
                ellipsePath = new THREE.CurvePath(),

                quaternion = new THREE.Quaternion(),
                ellipseGeometry,

                rGeometry = new THREE.Geometry(),


                nGeometry = new THREE.Geometry(),


                apGeometry = new THREE.Geometry(),


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
             * or ZXY(inc, 0, lan) * ZXY(0, 0, arpe)
             */
            quaternion.set(
                sa * si * sn + ca * si * cn,
                ca * si * sn - sa * si * cn,
                ca * ci * sn + sa * ci * cn,
                ca * ci * cn - sa * ci * sn
            );

            /*<Line geometry={apGeometry} material={material2}/>
             <Line geometry={nGeometry} material={material3}/>*/

            return (
                <Object3D quaternion={quaternion}>
                    <Line geometry={ellipseGeometry} material={material}/>
                    <Line geometry={rGeometry} material={material}/>

                </Object3D>
            );


        }
    });
}();