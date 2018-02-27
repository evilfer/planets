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
        title: 'About',
        content: (
            <div>
                <p>'Planets' is a toy web app created to help understanding the night sky. Unsurprisingly t's focused
                    only on Solar System planets and our Moon.</p>

                <p>Currently it does not have a huge set of functions, but I hope it's useful anyway!</p>

                <p>Check the <a href="/help">help</a> section for a quick introduction to the implemented
                    functionality, or <a href="/contact">contact us</a> if you have any question or suggestion.</p>
            </div>
        )
    };
}();
