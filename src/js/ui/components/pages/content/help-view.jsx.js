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
        title: '3D view',
        content: (
            <div>
                <p>Drag the mouse on the screen to change the view; the mouse wheel will zoom in and out. Clicking
                    on a planet or Moon opens a small info window.</p>

                <p>In the default scale settings, the size of the bodies and orbits is exaggerated, so that all can be
                    seen clearly at the same time. Switch on 'Actual scale' to see a more accurate version of the Solar
                    System. The scale setting does not affect the orbit shape (e.g., periapsis, apoapsis and nodes will
                    not change). It does not affect either the calculation of oppositions and maximum elongations.</p>

                <p>However, please note that on the false scale the maximum elongations may look wrong; this is caused
                    by the orbit scales being different.</p>
            </div>
        )
    };
}();
