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
        Paper = mui.Paper,
        IconButton = mui.IconButton,

        pages = {
            '/about': require('./about.jsx'),
            '/help': require('./help.jsx')
        };

    return React.createClass({

        render: function () {

            var style = {
                    position: 'absolute',
                    top: 50,
                    left: 400,
                    width: 500,
                    height: 'auto'
                },
                page = pages[this.props.path];

            return (

                <Paper style={style}>
                    <div style={{float: 'right', paddingRight: 15}}>
                        <IconButton mini={true} onClick={this.props.handleClose}
                                    iconClassName='material-icons'>
                            close
                        </IconButton>
                    </div>
                    <Paper style={{padding: 15, color: '#eee'}}>
                        {page.title}
                    </Paper>
                </Paper>
            );
        }
    });

}();
