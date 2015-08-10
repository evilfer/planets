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
        Toggle = mui.Toggle,
        IconButton = mui.IconButton,
        Dialog = mui.Dialog,

        PlanetsNav = require('./../pages/pages-nav.jsx.js'),
        DatePicker = require('./date-picker/date-picker.jsx'),
        SocialMenu = require('./social/social-menu.jsx');

    return React.createClass({
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
            return (
                <div className="planets-input">
                    <PlanetsNav ref="leftNav" window={this.props.window}/>
                    <IconButton iconClassName="material-icons"
                                style={{verticalAlign: 'middle', marginRight: 20}}
                                iconStyle={{color: '#00bcd4'}}
                                onClick={this.handleMenu}>menu</IconButton>

                    <DatePicker t={this.props.t} setValues={this.props.setValues} data={this.props.data}/>

                    <div className="scale-toggle">
                        <Toggle label="Actual scale" defaultToggled={this.props.view.scl === 0}
                                onToggle={this.handleScaleChange}/>

                    </div>
                    <SocialMenu/>

                </div>
            );
        }
    });

}();
