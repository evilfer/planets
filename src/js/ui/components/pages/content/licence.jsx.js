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
        title: 'Data sources',
        content: (
            <div>
                <p>This software is released under a
                    <a target="_blank" href="https://gnu.org/licenses/gpl.html">GPL licence <i
                        className="material-icons open-in-new">open_in_new</i></a>. The
                    code can be found in the <a target="_blank" href="https://github.com/evilfer/planets">Planets
                        GitHub repository <i className="material-icons open-in-new">open_in_new</i></a>.
                </p>

                <p>Besides third party data sources (see <a href="/data">here</a>), 'Planets' uses a number of great
                    libraries made available under open source licences by other developers. The complete list can be
                    see <a target="_blank" href="https://github.com/evilfer/planets/blob/master/package.json">here <i
                        className="material-icons open-in-new">open_in_new</i></a>.
                </p>
            </div>
        )
    };
}();
