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
        title: 'Contact',
        content: (
            <div>
                <p>If you spot any problems with this page, or have any suggestion to improve it, you can post your
                    questions <a target="_blank" href="https://github.com/evilfer/planets/issues">here <i
                        className="material-icons open-in-new">open_in_new</i></a>.</p>

                <p>Alternatively, feel free to email me about it at
                    <a href="mailto:eloy.villasclaras@gmail.com">eloy.villasclaras@gmail.com</a>.
                </p>
            </div>
        )
    };
}();
