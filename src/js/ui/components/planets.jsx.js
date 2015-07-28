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
        extend = require('extend'),

        Wrapper3d = require('./renderer/wrapper-3d.jsx'),
        Input = require('./input/input.jsx'),

        eph = require('../../data/ephemerides'),
        dates = require('../../maths/dates'),

        WindowTimer = require('../animate/window-timer'),
        animate = require('../animate/animate');

    animate.useTimer(new WindowTimer());

    return React.createClass({
        ephs: eph.init(),

        getInitialState: function () {
            return {
                t: Math.min(this.props.data.t1, Math.max(this.props.data.t0, dates.date2mjd(new Date()))),
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
        },

        setValue: function (key, value) {
            switch (key) {
                case 't':
                    animate.setAnim('t', 'poly3', {duration: 1000}, value, this.state.t);
                    break;
                case 'scl':
                    animate.setAnim('scl', 'poly5', {duration: 800}, value, this.state.view.scl);
                    break;
            }
        },

        render: function () {
            eph.state(this.state.t, this.ephs);
            return (
                <div className='planets'>
                    <Wrapper3d ephemerides={this.ephs} data={this.props.data} view={this.state.view}/>
                    <Input data={this.props.data} setValue={this.setValue}
                           view={this.state.view} t={this.state.t}/>
                </div>
            );
        }
    });


}();