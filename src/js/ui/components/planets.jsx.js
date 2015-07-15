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
        SceneManager = require('./3d/scene-manager.jsx'),
        eph = require('../../data/ephemerides');

    return React.createClass({
        getInitialState: function () {
            return {
                t: this.props.data.t0,
                view: {
                    alt: 1,
                    az: 0,
                    scl: 1
                }
            };
        },

        componentDidMount: function () {
            var t0 = false,
                me = this,
                n = 0,

                step = function (t) {
                    if (!t0) {
                        t0 = t;
                    } else {
                        var dt = t - t0,
                            alt = .5 * (1 + Math.cos(.001 * dt));
                        n++;
                        me.setState({
                            t: me.props.data.t0 + dt / 100,
                            view: {alt: alt, az: 0, scl: 1}
                        });

                        if (n % 10 === 0) {
                            console.log(dt / n);
                        }
                    }

                    window.requestAnimationFrame(step);
                };

            window.requestAnimationFrame(step);
        },


        render: function () {
            var ephemerides = eph.state(this.state.t);

            return (
                <SceneManager ephemerides={ephemerides} data={this.props.data}
                              t={this.state.t} view={this.state.view}/>
            );
        }
    });


}();