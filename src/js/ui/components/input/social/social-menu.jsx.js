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
        Dialog = mui.Dialog,
        FontIcon = mui.FontIcon,
        IconButton = mui.IconButton,

        SvgIcon = require('../../icons/CustomSvgIcon.jsx'),

        icons = {
            'google': 'https://plus.google.com/share?url=http://evilfer.github.io/planets/',
            'facebook': 'https://www.facebook.com/sharer/sharer.php?u=http://evilfer.github.io/planets/',
            'twitter': 'https://twitter.com/home?status=Find%20out%20when%20to%20view%20Solar%20System%20planets:%20http://evilfer.github.io.planets/%0A%0A',
            'pininterest': 'https://pinterest.com/pin/create/button/?url=&media=http://evilfer.github.io/planets/planets.png&description=Find%20out%20when%20to%20view%20Solar%20System%20planets:%20http://evilfer.github.io.planets/%0A'
        };

    return React.createClass({
            render: function () {
                var me = this,

                    iconStyle = {
                        padding: 6,
                        width: 24,
                        height: 24
                    },
                    items = Object.keys(icons).map(function (icon) {
                        return (
                            <a target="_blank" href={icons[icon]}>
                                <SvgIcon icon={icon} style={iconStyle}/>
                            </a>
                        );
                    });

                return (
                    <div className="social-menu">
                        <div className="social-links">
                            <FontIcon className="material-icons" style={iconStyle}>share</FontIcon>

                            <div className="social-dropdown-wrapper">
                                <div className="social-dropdown">
                                    {items}
                                </div>
                            </div>
                        </div>
                        <Dialog title="Share"
                                ref="shareDlg"
                                actions={[{text: 'Cancel'}]}
                                modal={true}>
                        </Dialog>
                    </div>
                );
            }
        }
    )
        ;
}
();