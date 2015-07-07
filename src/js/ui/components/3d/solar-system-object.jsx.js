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
        Mesh = ReactTHREE.Mesh,

        Orbit = require('./orbit.jsx');


    return React.createClass({

        render: function () {
            var ephemeris = this.props.ephemeris,
                data = this.props.data,
                position = ephemeris.vectors ? new THREE.Vector3(ephemeris.vectors.r[0], ephemeris.vectors.r[1], ephemeris.vectors.r[2]) : new THREE.Vector3(0, 0, 0),

                material = new THREE.MeshBasicMaterial({color: 'red'}),
                sphereGeometry = new THREE.SphereGeometry(1000 * data.radius, 32, 32);

            console.log(data);
            console.log(ephemeris.vectors.r);

            return (
                <Object3D>
                    <Orbit ephemeris={ephemeris}/>
                    <Mesh geometry={sphereGeometry}
                          material={material}
                          position={position}/>
                </Object3D>
            );

        }
    });
}();