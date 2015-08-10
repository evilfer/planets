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
            '/contact': require('./contact.jsx'),
            '/help': require('./help.jsx'),
            '/data': require('./data.jsx'),
            '/privacy': require('./privacy.jsx')
        };

    return React.createClass({

        render: function () {
            var navWidth = 256,
                headerHeight = 50,
                availableWidth = this.props.window.width - navWidth,
                pageWidth = Math.min(availableWidth * .8, 800),
                availableHeight = this.props.window.height - headerHeight,
                pageHeight = availableHeight * .9,

                style = {
                    top: headerHeight + .5 * (availableHeight - pageHeight),
                    height: pageHeight,
                    left: navWidth + .5 * (availableWidth - pageWidth),
                    width: availableWidth * 8 / 10
                },
                contentStyle = {
                    maxHeight: pageHeight - 49 - 30
                },

                page = pages[this.props.path];

            return (
                <Paper style={style} className="page">
                    <div className="page-header">
                        <div className="page-header-icon">
                            <IconButton mini={true} onClick={this.props.handleClose}
                                        iconClassName='material-icons'>
                                close
                            </IconButton>
                        </div>
                        <Paper className="page-header-title">
                            {page.title}
                        </Paper>
                    </div>
                    <div className="page-content" style={contentStyle}>
                        {page.content}
                    </div>
                </Paper>

            );
        }
    });

}();
