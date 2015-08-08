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

/* globals window */
module.exports = function () {
    'use strict';

    var React = require('react'),
        ReactTHREE = require('react-three'),
        Scene = ReactTHREE.Scene,
        PointLight = ReactTHREE.PointLight,
        AmbientLight = ReactTHREE.AmbientLight,
        OnResize = require("react-window-mixins").OnResize,

        PlanetsCamera = require('./planets-camera.jsx.js'),
        ObjectList = require('./solar-system-object.jsx.js').ObjectList,
        StartField = require('./star-field.jsx');

    return React.createClass({
        mixins: [OnResize],

        render: function () {
            var name = 'main-camera',
                window = this.props.window,
                perspective = this.props.perspective,
                data = this.props.data,
                ephemerides = this.props.ephemerides,
                txEphemerides = this.props.txEphemerides;

            return (
                <Scene camera={name} width={window.width} height={window.height} background={0x080808}>
                    <PlanetsCamera name={name} perspective={perspective}/>
                    <StartField perspective={perspective}/>
                    <ObjectList list={data.tree} ephemerides={ephemerides} txEphemerides={txEphemerides}/>
                    <PointLight distance={1e11} intensity={1}/>
                    <AmbientLight color={0x666666}/>
                </Scene>
            );

        }

    });
}();

