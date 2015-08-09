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

    var React = require('react');

    return {
        title: 'Privacy and cookies',
        content: (
            <div>
                <p>'Planets' uses Google Analytics to keep track of page views. Google Analytics uses its own cookies to
                    do this; you can read about
                    it <a target="_blank"
                          href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=en">
                        here</a>.</p>

                <p>'Planets' does not use any other cookies. No information about user actions is stored either locally
                    or on the server.
                </p>
            </div>
        )
    };
}();
