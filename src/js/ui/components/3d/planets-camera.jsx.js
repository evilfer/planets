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
        THREE = require('three'),
        PerspectiveCamera = require('react-three').PerspectiveCamera;

    return React.createClass({

        render: function () {

            var a = Math.PI / 4 * (1 + Math.cos(this.props.a)),
                d = 1e9,
                lookAt = new THREE.Vector3(0, 0, 0),
                pos = new THREE.Vector3(0, -d * Math.cos(a), d * Math.sin(a)),
                up = new THREE.Vector3(0, 1, 0);

            return (
                <PerspectiveCamera name={this.props.name}
                                   aspect={this.props.window.width/this.props.window.height}
                                   near={5e7} far={1e11}
                                   position={pos} lookat={lookAt} up={up}/>
            );
        }
    });
}();
