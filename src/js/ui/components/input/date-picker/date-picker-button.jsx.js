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
        IconButton = mui.IconButton;

    return React.createClass({

        buttonEnabled: function () {
            var data = this.props.data,
                t = this.props.t + this.props.delta;

            return t <= data.t1 && t >= data.t0;
        },

        handleClick: function () {
            if (this.buttonEnabled()) {
                this.props.setValues({t: this.props.t + this.props.delta});
            }
        },

        render: function () {
            var disabled = !this.buttonEnabled(),
                className = typeof this.props.children === 'string' ? 'material-icons' : '',
                iconStyle = {
                    width: 'auto',
                    height: 'auto',
                    padding: 0,
                    margin: 0,
                    verticalAlign: 'middle'
                };

            return (
                <IconButton mini={true} disabled={disabled} onClick={this.handleClick}
                            iconClassName={className} style={iconStyle}>
                    {this.props.children}
                </IconButton>
            );
        }

    });

}();
