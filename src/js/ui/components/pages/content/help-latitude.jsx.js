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
        SvgIcon = require('../../icons/HtmlSvgIcon.jsx');


    return {
        title: 'Latitude setting',
        content: (
            <div>
                <p>Setting up your latitude is needed to calculate the duration of night and day, and relative rise and
                    set times for planets and the Moon; this information is displayed in the <a
                        href="/help/info/visibility">info window</a>.</p>

                <p>To change your latitude, click on the <i className="material-icons">language</i> icon at the top of
                    the main window. </p>

                <p>The latitude value must be between -90 and 90. For example, a value of 51.5 means 51&deg;30'N,
                    approximately the latitude of London. A value of -34.6 means latitude 34&deg;36'S, close to Buenos
                    Aires.</p>

                <p>The selected latitude setting is stored using local storage, so that the browser will remember
                    it.</p>
            </div>
        )
    };
}();
