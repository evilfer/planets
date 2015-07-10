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
        objectColor = require('../../utils/object-color'),

        Orbit = require('./orbit.jsx'),

        SolarSystemObject = React.createClass({

            render: function () {
                var ephemerides = this.props.ephemerides,
                    obj = this.props.obj,
                    view = this.props.view,

                    ephemeris = ephemerides[obj.id],
                    position = ephemeris.vectors ? new THREE.Vector3(ephemeris.vectors.r[0], ephemeris.vectors.r[1], ephemeris.vectors.r[2]) : new THREE.Vector3(0, 0, 0),

                    material = new THREE.MeshBasicMaterial({color: objectColor(obj, .5)}),
                    sphereGeometry = new THREE.SphereGeometry(1e7, 32, 32),
                    orbit = ephemeris.orbit ? <Orbit obj={obj} ephemeris={ephemeris}/> : false,

                    globalScale = obj.ui.scale.hasOwnProperty('global') ? (view.scl * obj.ui.scale.global + 1 - view.scl) : 1,
                    bodyScale = (view.scl * obj.ui.scale.body + 1 - view.scl) / globalScale;

                return (
                    <Object3D scale={globalScale}>
                        {orbit}
                        <Object3D position={position}>
                            <Mesh geometry={sphereGeometry} material={material}
                                  scale={bodyScale}/>
                            <ObjectList t={this.props.t} list={obj.children} ephemerides={ephemerides} view={view}/>
                        </Object3D>
                    </Object3D>
                );
            }
        }),

        ObjectList = React.createClass({
            render: function () {
                var view = this.props.view,
                    list = this.props.list,
                    ephemerides = this.props.ephemerides,

                    planets = list.map(function (obj) {
                        return <SolarSystemObject key={obj.id} obj={obj} ephemerides={ephemerides} view={view}/>
                    });

                return <Object3D>{planets}</Object3D>;
            }
        });

    return {
        SolarSystemObject: SolarSystemObject,
        ObjectList: ObjectList
    };
}();
