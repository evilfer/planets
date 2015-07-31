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

        mui = require('material-ui'),
        ThemeManager = new mui.Styles.ThemeManager(),
        DatePicker = mui.DatePicker,
        Toggle = mui.Toggle,
        Paper = mui.Paper,

        dates = require('../../../maths/dates');


    ThemeManager.setTheme(ThemeManager.types.DARK);

    return React.createClass({
        childContextTypes: {
            muiTheme: React.PropTypes.object
        },

        getChildContext: function () {
            return {
                muiTheme: ThemeManager.getCurrentTheme()
            };
        },

        handleDateChange: function (a, b, c) {
            this.props.setValues({t: dates.date2mjd(b)});
        },

        handleScaleChange: function (event, toggled) {
            this.props.setValues({scl: toggled ? 0 : 1});
        },

        render: function () {
            var t = dates.mjd2date(this.props.t),
                t0 = dates.mjd2date(this.props.data.t0),
                t1 = dates.mjd2date(this.props.data.t1);

            return (
                <div className="planets-input">
                    <div className="date-picker">
                        <Paper>
                            <DatePicker mode="landscape" showYearSelector={true} onChange={this.handleDateChange}
                                        defaultDate={t} minDate={t0} maxDate={t1}/>

                            <div style={{width: 300}}>
                                <Toggle label="Real scale" defaultToggled={this.props.view.scl === 0}
                                        onToggle={this.handleScaleChange}/>
                            </div>
                        </Paper>
                    </div>
                </div>
            );
        }
    });

}();
