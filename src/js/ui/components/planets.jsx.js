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

        eph = require('../../maths/ephemerides'),
        dates = require('../../maths/dates'),

        WindowTimer = require('../animate/window-timer'),
        animate = require('../animate/animate');

    animate.useTimer(new WindowTimer());

    return React.createClass({

        componentWillMount: function () {
            this.ephs = eph.init();
        },

        getInitialState: function () {
            return {
                t: Math.min(this.props.data.t1, Math.max(this.props.data.t0, dates.date2mjd(new Date()))),
                view: {
                    alt: Math.PI / 4,
                    targetAlt: Math.PI / 4,
                    az: 0,
                    targetAz: 0,
                    scl: 1
                }
            };
        },

        updateState: function (values) {
            var state = clone(this.state);

            if ('scl' in values) {
                state.view.scl = values.scl;
            }

            if ('alt' in values) {
                state.view.alt = values.alt;
            }
            if ('targetAlt' in values) {
                state.view.targetAlt = values.targetAlt;
            }

            if ('az' in values) {
                state.view.az = values.az;
            }
            if ('targetAz' in values) {
                state.view.targetAz = values.targetAz;
            }

            if ('t' in values) {
                state.t = values.t;
            }

            this.setState(state);
        },

        componentDidMount: function () {
            var me = this;
            animate.setUpdateCallback(function (anims) {
                me.updateState(anims);
            });
        },

        setValues: function (values) {
            var newState = {},
                stateChange = false;

            if (values.hasOwnProperty('t')) {
                animate.setAnim('t', 'poly3', {duration: 1000}, values.t, this.state.t);
            }

            if (values.hasOwnProperty('scl')) {
                animate.setAnim('scl', 'poly5', {duration: 800}, values.scl, this.state.view.scl);
            }

            if (values.hasOwnProperty('az')) {
                animate.setAnim('az', 'follow', {halfT: 50, threshold: .01}, values.az, this.state.view.az);
                newState.targetAz = values.az;
                stateChange = true;
            }

            if (values.hasOwnProperty('alt')) {
                animate.setAnim('alt', 'follow', {halfT: 50, threshold: .01}, values.alt, this.state.view.alt);
                newState.targetAlt = values.alt;
                stateChange = true;
            }

            if (stateChange) {
                this.updateState(newState);
            }
        },

        render: function () {
            eph.state(this.state.t, this.ephs);

            return (
                <div className='planets'>
                    <Wrapper3d ephemerides={this.ephs} data={this.props.data} view={this.state.view}
                               setValues={this.setValues}/>
                    <Input data={this.props.data} setValues={this.setValues}
                           view={this.state.view} t={this.state.t}/>
                </div>
            );
        }
    });


}();