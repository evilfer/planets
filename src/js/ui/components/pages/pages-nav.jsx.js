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
        reactMiniRouter = require('react-mini-router'),
        RouterMixin = reactMiniRouter.RouterMixin,
        navigate = reactMiniRouter.navigate,

        mui = require('material-ui'),
        LeftNav = mui.LeftNav,
        IconButton = mui.IconButton,

        Page = require('./page.jsx'),

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
            {path: '/about', text: 'About'},
            {path: '/help', text: 'Help'},
            {path: '/data', text: 'Data'},
            {path: '/privacy', text: 'Privacy'},
            {path: '/contact', text: 'Contact'}
        ];

    return React.createClass({
        mixins: [RouterMixin],

        getSelectedRoute: function () {
            var path = this.state.path;
            for (var i = 0; i < menuItems.length; i++) {
                if (menuItems[i].path === path) {
                    return i;
                }
            }

            return -1;
        },

        getInitialState: function () {
            return {
                isDocked: false
            };
        },

        componentDidMount: function () {
            if (this.state.path !== '/') {
                this.toggle();
            }
        },

        toggle: function () {
            if (!this.state.isDocked) {
                this.setState({isDocked: true});
            }
            this.refs.nav.toggle();
        },

        handleChange: function (e, selectedIndex, menuItem) {
            navigate(menuItem.path);
        },

        handleClose: function () {
            navigate('/');
            this.refs.nav.close();
        },

        routes: menuItems.reduce(function (r, item) {
            r[item.path] = 'page';
            return r;
        }, {'/': 'home'}),

        render: function () {
            var header = (
                <div style={headerStyle}>
                    Planets
                    <IconButton mini={true} onClick={this.handleClose}
                                iconClassName='material-icons' style={headerButtonStyle}>
                        close
                    </IconButton>
                </div>
            );

            return (
                <div className="pages-nav">
                    <LeftNav ref="nav"
                             docked={this.state.isDocked}
                             menuItems={menuItems}
                             header={header}
                             onChange={this.handleChange}
                             selectedIndex={this.getSelectedRoute()}/>
                    {this.renderCurrentRoute()}
                </div>
            );
        },

        home: function () {
            return false;
        },

        page: function () {
            return <Page path={this.state.path} handleClose={this.handleClose}
                         window={this.props.window}/>;
        }


    });

}();
