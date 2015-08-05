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
        DatePicker = mui.DatePicker,
        Toggle = mui.Toggle,

        DatePickerButton = require('./date-picker-button.jsx'),

        dates = require('../../../maths/dates');

    return React.createClass({
        handleDateChange: function (a, b, c) {
            this.props.setValues({t: dates.date2mjd(b)});
        },

        handleScaleChange: function (event, toggled) {
            this.props.setValues({scl: toggled ? 0 : 1});
        },

        dateFormat: function (date) {
            return date.toDateString();
        },

        render: function () {
            var data = this.props.data,
                setValues = this.props.setValues,
                mjd = this.props.t,
                t = dates.mjd2date(mjd),
                t0 = dates.mjd2date(this.props.data.t0),
                t1 = dates.mjd2date(this.props.data.t1);

            return (
                <div className="planets-input">
                    <div className="date-picker">
                        <DatePickerButton icon="angle-double-left" t={mjd} delta={-30} setValues={setValues} data={data}/>
                        <DatePickerButton icon="angle-left" t={mjd} delta={-1} setValues={setValues} data={data}/>

                        <DatePicker mode="landscape" showYearSelector={true} onChange={this.handleDateChange}
                                    value={t} minDate={t0} maxDate={t1}
                                    formatDate={this.dateFormat}
                                    style={{display: 'inline-block', marginLeft: 5, marginRight: 5}}/>

                        <DatePickerButton icon="angle-right" t={mjd} delta={1} setValues={setValues} data={data}/>
                        <DatePickerButton icon="angle-double-right" t={mjd} delta={30} setValues={setValues} data={data}/>
                    </div>

                    <div style={{width: 300}}>
                        <Toggle label="Real scale" defaultToggled={this.props.view.scl === 0}
                                onToggle={this.handleScaleChange}/>

                    </div>
                </div>
            );
        }
    });

}();
