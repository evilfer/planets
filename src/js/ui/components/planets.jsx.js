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
        clone = require('clone'),

        Wrapper3d = require('./3d/wrapper-3d.jsx'),
        eph = require('../../data/ephemerides'),

        WindowTimer = require('../animate/window-timer'),
        animate = require('../animate/animate');

    animate.useTimer(new WindowTimer());

    return React.createClass({
        ephs: eph.init(),

        getInitialState: function () {
            return {
                t: this.props.data.t0,
                view: {
                    alt: Math.PI / 2,
                    az: 0,
                    scl: 1
                }
            };
        },

        componentDidMount: function () {
            var me = this;
            animate.setUpdateCallback(function (anims) {
                var state = clone(me.state);

                if ('scl' in anims) {
                    state.view.scl = anims.scl;
                }

                if ('alt' in anims) {
                    state.view.alt = anims.alt;
                }

                if ('t' in anims) {
                    state.t = anims.t;
                }

                me.setState(state);
            });

            //animate.setAnim('scl', 1, 2000, 'lineal', this.state.view.scl);
            //animate.setAnim('alt', 1, 1000, 'lineal', this.state.view.alt);
            animate.setAnim('t', this.props.data.t0 + 100, 10000, 'lineal', this.state.t);
        },

        render: function () {
            eph.state(this.state.t, this.ephs);
            return <Wrapper3d ephemerides={this.ephs} data={this.props.data} view={this.state.view}/>;
        }
    });


}();