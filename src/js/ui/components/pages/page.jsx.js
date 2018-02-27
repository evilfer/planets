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
        Paper = mui.Paper,
        IconButton = mui.IconButton,

        Breadcrumbs = require('./breadcrumbs.jsx'),

        pages = {
            '/about': require('./content/about.jsx'),
            '/contact': require('./content/contact.jsx'),
            '/help': require('./content/help.jsx'),
            '/help/info': require('./content/help-info.jsx'),
            '/help/info/visibility': require('./content/help-info-visibility.jsx'),
            '/help/latitude': require('./content/help-latitude.jsx'),
            '/help/time': require('./content/help-time.jsx'),
            '/help/view': require('./content/help-view.jsx'),
            '/data': require('./content/data.jsx'),
            '/privacy': require('./content/privacy.jsx')
        };

    return React.createClass({

        render: function () {
            console.log(this.props);

            var navWidth = this.props.navOpen ? 256 : 0,
                headerHeight = 40,
                availableWidth = this.props.window.width - navWidth,
                pageWidth = Math.min(availableWidth * .8, 800),
                availableHeight = this.props.window.height - headerHeight,
                pageHeight = availableHeight * .9,

                style = {
                    top: headerHeight + .5 * (availableHeight - pageHeight),
                    height: pageHeight,
                    left: navWidth + .5 * (availableWidth - pageWidth),
                    width: pageWidth
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
                        <Breadcrumbs path={this.props.path} pages={pages}/>
                        {page.content}
                    </div>
                </Paper>
            );
        }
    });

}();
