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
        ThemeManager = new mui.Styles.ThemeManager();

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

        render: function () {
            return (
                <div className="planets-input">

                </div>
            );
        }

    });

}();
