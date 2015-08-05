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
        FloatingActionButton = mui.FloatingActionButton,
        FontAwesomeIcon = require('../common/font-awesome-icon.jsx');

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
            var icon = this.props.icon,
                disabled = !this.buttonEnabled();

            return (
                <FloatingActionButton mini={true} secondary={true} disabled={disabled} onClick={this.handleClick}
                                      style={{marginLeft: 2, marginRight: 2}}>
                    <FontAwesomeIcon icon={icon}/>
                </FloatingActionButton>
            );
        }

    });

}();
