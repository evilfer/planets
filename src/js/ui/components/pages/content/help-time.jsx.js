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
        title: 'Time settings',
        content: (
            <div>
                <p>By default, when the page load the date will be set to today's date. You can go to any date in the
                    included time span by clicking on the date field on the top of the main view. Click on the date to
                    open a calendar. After you change the date, you can go back to today by clicking on
                    <SvgIcon icon="today" size={20} style={{fill: '#ddd'}}/>.</p>

                <p>Because the planets/Moon positions are precomputed, the available time span is limited to three
                    years, 2015-2017.</p>

                <p>Please note that, in the <a href="/help/info">info window</a>, maximum elongation and opposition
                    dates
                    are always calculated forward in time from the selected date. </p>
            </div>
        )
    };
}();
