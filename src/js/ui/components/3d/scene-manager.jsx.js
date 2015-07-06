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
        Scene = ReactTHREE.Scene,
        OnResize = require("react-window-mixins").OnResize,

        PlanetsCamera = require('./planets-camera.jsx'),
        Orbit = require('./orbit.jsx');

    return React.createClass({
        mixins: [OnResize],

        getInitialState: function () {
            return {a: 0};
        },

        componentDidMount: function () {
            var me = this;
            setInterval(function () {
                me.setState({a: me.state.a + .1});
            }, 20);
        },

        render: function () {
            var name = 'scene',
                window = this.state.window,
                orbits = [];

            for (var id in this.props.ephemerides) {
                if (this.props.ephemerides.hasOwnProperty(id) && this.props.ephemerides[id].orbit) {
                    orbits.push(<Orbit key={id} ephemeris={this.props.ephemerides[id]}/>)
                }
            }

            return (
                <Scene camera={name} width={window.width} height={window.height}>
                    <PlanetsCamera a={this.state.a} name={name} window={window}/>
                    {orbits}
                </Scene>
            );
        }
    });
}();

