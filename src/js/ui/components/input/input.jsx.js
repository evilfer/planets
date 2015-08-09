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
        IconButton = mui.IconButton,

        PlanetsNav = require('./../pages/pages-nav.jsx.js'),
        DatePickerButton = require('./date-picker-button.jsx'),
        SvgIcon = require('../icons/CustomSvgIcon.jsx'),

        dates = require('../../../maths/dates');

    return React.createClass({
        handleDateChange: function (e, date) {
            this.props.setValues({t: dates.date2mjd(date)});
        },

        handleScaleChange: function (event, toggled) {
            this.props.setValues({scl: toggled ? 0 : 1});
        },

        dateFormat: function (date) {
            return date.toDateString();
        },

        handleMenu: function () {
            this.refs.leftNav.toggle();
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
                    <PlanetsNav ref="leftNav" window={this.props.window}/>
                    <IconButton iconClassName="material-icons"
                                style={{verticalAlign: 'middle', marginRight: 20}}
                                iconStyle={{color: '#00bcd4'}}
                                onClick={this.handleMenu}>menu</IconButton>

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

                        <DatePickerButton t={mjd} delta={1} setValues={setValues}
                                          data={data}>play_arrow</DatePickerButton>
                        <DatePickerButton t={mjd} delta={30} setValues={setValues}
                                          data={data}>fast_forward</DatePickerButton>
                    </div>

                    <div className="scale-toggle">
                        <Toggle label="Actual scale" defaultToggled={this.props.view.scl === 0}
                                onToggle={this.handleScaleChange}/>

                    </div>
                </div>
            );
        }
    });

}();
