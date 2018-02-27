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

        dates = require('../../../../maths/dates'),
        mui = require('material-ui'),
        IconButton = mui.IconButton,
        SvgIcon = require('../../icons/CustomSvgIcon.jsx');

    return React.createClass({

        mjd: function () {
            var today = new Date();

            return function () {
                var todayMjd;

                today.setTime(Date.now());
                today.setFullYear(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
                today.setHours(12, 0, 0, 0);
                todayMjd = dates.date2mjd(today);

                return todayMjd;
            };
        }(),

        valid: function (todayMjd) {
            var data = this.props.data,
                t = this.props.t;

            return Math.abs(t - todayMjd) > .5 && todayMjd <= data.t1 && todayMjd >= data.t0;

        },

        buttonEnabled: function () {
            return this.valid(this.mjd());
        },

        handleClick: function () {
            var mjd = this.mjd();
            if (this.valid(mjd)) {
                console.log('set');
                this.props.setValues({t: mjd});
            } else {
                console.log('no');
            }
        },

        render: function () {
            var disabled = !this.buttonEnabled(),
                iconStyle = {
                    width: 'auto',
                    height: 'auto',
                    padding: 0,
                    margin: 0,
                    verticalAlign: 'middle'
                };

            return (
                <IconButton mini={true} disabled={disabled} onClick={this.handleClick} style={iconStyle}>
                    <SvgIcon icon="today" size={20}/>
                </IconButton>
            );
        }

    });

}();
