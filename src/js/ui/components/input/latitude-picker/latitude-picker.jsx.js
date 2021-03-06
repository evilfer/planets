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

        mui = require('material-ui'),
        IconButton = mui.IconButton,
        Dialog = mui.Dialog,

        LatitudePickerDlg = require('./latitude-picker-dlg.jsx');


    return React.createClass({
        handleOpen: function () {
            this.refs.dlg.show();
        },

        handleOk: function () {

        },

        render: function () {

            var iconStyle = {
                    width: 'auto',
                    height: 'auto',
                    padding: 0,
                    margin: '-3px 0 0 0',
                    verticalAlign: 'middle'
                },
                latStr = this.props.lat.toFixed(1).replace(/\.?0+$/, '');

            if (this.props.lat > 0) {
                latStr += ' N';
            } else if (this.props.lat < 0) {
                latStr += ' S';
            }

            return (
                <div className="latitude-picker">
                    <label style={{color: '#ddd'}}>Latitude: </label><span className="latitude-picker-value">{latStr}</span>
                    <IconButton mini={true} onClick={this.handleOpen}
                                iconClassName='material-icons' style={iconStyle}>language</IconButton>
                    <LatitudePickerDlg ref="dlg" value={this.props.lat} setValues={this.props.setValues}/>
                </div>
            );
        }
    });

}();
