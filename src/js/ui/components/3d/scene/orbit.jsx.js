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

        ellipseGeometry = function () {
            var ellipse = new THREE.EllipseCurve(0, 0, 1, 1, 0, 2.0 * Math.PI, false),
                ellipsePath = new THREE.CurvePath(),
                geometry;

            ellipsePath.add(ellipse);
            geometry = ellipsePath.createPointsGeometry(100);
            geometry.computeTangents();


            return geometry;
        }(),

        rGeometry2 = function () {
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, 0, 0));
            geometry.vertices.push(new THREE.Vector3(1, 0, 0));
            return geometry;
        }(),

        objectColor = require('../../../utils/object-color'),
        vector = require('../../../../maths/vector');

    return React.createClass({

        render: function () {
            var obj = this.props.obj,
                ephemeris = this.props.ephemeris,
                orbit = ephemeris.orbit,

                material = new THREE.LineBasicMaterial({color: objectColor(obj, .5)});

            return (
                <Object3D quaternion={orbit.quaternion}>
                    <Line geometry={ellipseGeometry} material={material}
                          position={orbit.cPos}
                          scale={orbit.scale}/>
                    <Line geometry={rGeometry2} material={material}
                          scale={orbit.r}
                          quaternion={orbit.rQuaternion}/>
                </Object3D>
            );

        }
    });
}();
