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
        OnResize = require("react-window-mixins").OnResize,

        PlanetsCamera = require('./planets-camera.jsx'),
        ObjectList = require('./solar-system-object.jsx').ObjectList;

    return React.createClass({
        mixins: [OnResize],

        getInitialState: function () {
            return {
                view: {
                    alt: 1,
                    az: 0,
                    scl: 0
                }
            };
        },


        componentDidMount: function () {
            var t0 = false,
                more = true,
                duration = 2000,
                me = this,

                step = function (t) {
                    console.log(t0, t, more);

                    if (!t0) {
                        t0 = t;
                    } else {
                        var dt = t - t0,
                            s = dt / duration;

                        more = t0 + duration > t;
                        console.log(s);

                        me.setState({view: {alt: 1, az: 0, scl: s}});
                    }


                    if (more) {
                        window.requestAnimationFrame(step);
                    }
                };

            console.log('!');
            window.requestAnimationFrame(step);
        },

        render: function () {
            var name = 'scene',
                window = this.state.window,
                view = this.state.view,

                data = this.props.data,
                ephemerides = this.props.ephemerides;

            return (
                <Scene camera={name} width={window.width} height={window.height}>
                    <PlanetsCamera view={view} name={name} window={window}/>
                    <ObjectList list={data.tree} ephemerides={ephemerides} view={view}/>
                </Scene>
            );


        }
    });
}();

