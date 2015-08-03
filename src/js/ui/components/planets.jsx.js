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

        mui = require('material-ui'),
        ThemeManager = new mui.Styles.ThemeManager(),

        Wrapper3d = require('./renderer/wrapper-3d.jsx'),
        Input = require('./input/input.jsx'),

        eph = require('../../maths/ephemerides'),
        dates = require('../../maths/dates'),

        WindowTimer = require('../animate/window-timer'),
        animate = require('../animate/animate');

    ThemeManager.setTheme(ThemeManager.types.DARK);
    animate.useTimer(new WindowTimer());


    return React.createClass({
        childContextTypes: {
            muiTheme: React.PropTypes.object
        },

        getChildContext: function () {
            return {
                muiTheme: ThemeManager.getCurrentTheme()
            };
        },

        componentWillMount: function () {
            this.ephs = eph.init();
        },

        getInitialState: function () {
            return {
                t: Math.min(this.props.data.t1, Math.max(this.props.data.t0, dates.date2mjd(new Date()))),
                view: {
                    zoom: 1,
                    alt: Math.PI / 4,
                    az: 0,
                    targetAlt: Math.PI / 4,
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

            if ('zoom' in values) {
                state.view.zoom = values.zoom;
            }

            if ('alt' in values) {
                state.view.alt = values.alt;
            }

            if ('az' in values) {
                state.view.az = values.az;
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
            if (values.hasOwnProperty('t')) {
                animate.setAnim('t', 'poly3', {duration: 1000, target: values.t}, this.state.t);
            }

            if (values.hasOwnProperty('scl')) {
                animate.setAnim('scl', 'poly5', {duration: 800, target: values.scl}, this.state.view.scl);
            }

            if (values.hasOwnProperty('az')) {
                animate.setAnim('az', 'follow', {
                    halfT: 50,
                    threshold: .01,
                    delta: values.az
                }, this.state.view.az);
            }

            if (values.hasOwnProperty('alt')) {
                animate.setAnim('alt', 'follow', {
                    halfT: 50,
                    threshold: .01,
                    delta: values.alt,
                    max: Math.PI / 2,
                    min: 0
                }, this.state.view.alt);
            }

            if (values.hasOwnProperty('zoom')) {
                animate.setAnim('zoom', 'follow', {
                    halfT: 100,
                    threshold: .01,
                    deltaP: values.zoom,
                    min: 1,
                    max: 100
                }, this.state.view.zoom);
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