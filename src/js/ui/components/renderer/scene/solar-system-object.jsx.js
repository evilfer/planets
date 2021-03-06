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

    var React = require('react'),
        ReactTHREE = require('react-three'),
        THREE = require('three'),
        Object3D = ReactTHREE.Object3D,
        Mesh = ReactTHREE.Mesh,


        materials = require('../../../../data/materials'),

        Orbit = require('./orbit.jsx.js'),

        sphereGeometry = new THREE.SphereGeometry(1, 32, 32),

        SolarSystemObject = React.createClass({

            render: function () {
                var obj = this.props.obj,

                    ephemerides = this.props.ephemerides,
                    txEphemerides = this.props.txEphemerides,

                    ephemeris = ephemerides[obj.id],
                    txEphemeris = txEphemerides[obj.id],

                    material = materials[obj.id],
                    orbit = ephemeris.orbit ? <Orbit obj={obj} ephemeris={ephemeris}/> : false,
                    rings = ephemeris.rings ? <Mesh geometry={ephemeris.rings.ringGeometry}
                                                    material={material.rings}
                                                    scale={txEphemeris.bodyScl}
                                                    quaternion={ephemeris.rings.quaternion}/> : false;

                return (
                    <Object3D scale={txEphemeris.orbitScl}>
                        <Object3D position={txEphemeris.localPos}>
                            <Mesh geometry={sphereGeometry} material={material.body}
                                  scale={txEphemeris.sphereScl}/>
                            {rings}
                            <ObjectList list={obj.children} ephemerides={ephemerides} txEphemerides={txEphemerides}/>
                        </Object3D>
                        {orbit}
                    </Object3D>
                );
            }
        }),

        ObjectList = React.createClass({
            render: function () {
                var list = this.props.list,
                    ephemerides = this.props.ephemerides,
                    txEphemerides = this.props.txEphemerides,

                    planets = list.map(function (obj) {
                        return <SolarSystemObject key={obj.id} obj={obj}
                                                  ephemerides={ephemerides} txEphemerides={txEphemerides}/>;
                    });

                return <Object3D>{planets}</Object3D>;
            }
        });

    return {
        SolarSystemObject: SolarSystemObject,
        ObjectList: ObjectList
    };
}();
