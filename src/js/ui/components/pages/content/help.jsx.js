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

    var React = require('react');

    return {
        title: 'Help',
        content: (
            <div>
                <p>Hopefully most of the user interaction in this page is straightforward. If not, I'd be grateful if
                    you could <a href="/contact">let me know</a>! The links below show hints about specific aspects of
                    this page:</p>
                <ul>
                    <li><p><a href="/help/time">Selecting the date</a></p></li>
                    <li><p><a href="/help/view">Controlling the 3D view</a></p></li>
                    <li><p><a href="/help/info">Planet/Moon info window</a></p></li>
                    <li><p><a href="/help/latitude">Latitude setting</a></p></li>
                </ul>
            </div>
        )
    };
}();
