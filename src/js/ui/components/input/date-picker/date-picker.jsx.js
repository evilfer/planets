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

        DatePickerButton = require('./date-picker-button.jsx'),
        TodayButton = require('./today-button.jsx'),
        SvgIcon = require('../../icons/CustomSvgIcon.jsx'),

        dates = require('../../../../maths/dates');


    return React.createClass({
        handleDateChange: function (e, date) {
            this.props.setValues({t: dates.date2mjd(date)});
        },

        dateFormat: function (date) {
            return date.toDateString();
        },

        render: function () {

            var data = this.props.data,
                setValues = this.props.setValues,
                mjd = this.props.t,
                t = dates.mjd2date(mjd),
                t0 = dates.mjd2date(data.t0),
                t1 = dates.mjd2date(data.t1);

            return (
                <div className="date-picker">
                    <DatePickerButton t={mjd} delta={-30} setValues={setValues}
                                      data={data}>fast_rewind</DatePickerButton>
                    <DatePickerButton t={mjd} delta={-1} setValues={setValues}
                                      data={data}>
                        <SvgIcon icon="rewind"/>
                    </DatePickerButton>

                    <DatePicker mode="landscape" showYearSelector={true} onChange={this.handleDateChange}
                                value={t} minDate={t0} maxDate={t1}
                                formatDate={this.dateFormat}
                                style={{display: 'inline-block'}}
                                textFieldStyle={{width: 150}}/>

                    <TodayButton t={mjd} setValues={setValues} data={data}/>

                    <DatePickerButton t={mjd} delta={1} setValues={setValues}
                                      data={data}>play_arrow</DatePickerButton>
                    <DatePickerButton t={mjd} delta={30} setValues={setValues}
                                      data={data}>fast_forward</DatePickerButton>
                </div>
            );
        }
    });

}();
