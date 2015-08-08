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

        Router = require('react-router'),
        RouteHandler = Router.RouteHandler,

        mui = require('material-ui'),
        LeftNav = mui.LeftNav,
        IconButton = mui.IconButton,

        headerStyle = {
            backgroundColor: "#00bcd4",
            color: "rgba(255, 255, 255, 1)",
            cursor: "pointer",
            fontSize: 24,
            fontWeight: 300,
            lineHeight: '64px',
            marginBottom: 8,
            paddingLeft: 24,
            paddingTop: 0
        },
        headerButtonStyle = {
            lineHeight: 0,
            float: 'right',
            marginTop: 8
        },
        menuItems = [
            {route: 'help', text: 'Help'},
            {route: 'about', text: 'About'}
        ];


    return React.createClass({
        contextTypes: {
            router: React.PropTypes.func
        },

        getInitialState: function () {
            return {
                isDocked: false,
                selected: -1
            };
        },

        toggle: function () {
            if (!this.state.isDocked) {
                this.setState({isDocked: true});
            }
            this.refs.nav.toggle();
        },

        handleChange: function (e, selectedIndex, menuItem) {
            console.log(menuItem.route, selectedIndex);
            this.context.router.transitionTo(menuItem.route);
            this.setState({selected: selectedIndex});
            return false;
        },

        render: function () {
            var header = (
                <div style={headerStyle}>
                    Planets
                    <IconButton mini={true} onClick={this.handleClose}
                                iconClassName='material-icons' style={headerButtonStyle}
                                onClick={this.toggle}>
                        close
                    </IconButton>
                </div>
            );

            return (
                <div>
                    <LeftNav ref="nav"
                             docked={this.state.isDocked}
                             menuItems={menuItems}
                             header={header}
                             onChange={this.handleChange}
                             selectedIndex={this.state.selected}/>

                    <RouteHandler/>
                </div>
            );
        }
    });

}();
