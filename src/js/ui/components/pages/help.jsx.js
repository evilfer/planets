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
        SvgIcon = require('../icons/HtmlSvgIcon.jsx');


    return {
        title: 'Help',
        content: (
            <div>
                <p>Hopefully most of the user interaction in this page is straightforward. If not, I'd be grateful if
                    you could <a href="/contact">let me know</a>!</p>

                <p>Drag the mouse on the screen to change the view; the mouse wheel will zoom in and out. Clicking
                    on a planet or Moon opens a small info window.</p>

                <p>If you change the date, you can go back to today by clicking
                    on <SvgIcon icon="today" size={20} style={{fill: '#ddd'}}/>. Please note that currently oppositions
                    and maximum elongations are calculated always forward in time from the selected date.</p>

                <p>In the default scale settings, the size of the bodies and orbits is exaggerated, so that all can be
                    seen clearly at the same time. Switch on 'Actual scale' to see a more accurate version of the Solar
                    System. The scale setting does not affect the orbit shape (e.g., periapsis and apoapsis will not
                    change). It does not affect either the calculation of oppositions and maximum elongations.</p>

                <p>The planet info window displays the following data:</p>

                <ul className="help-info-window">
                    <li>
                        <p><SvgIcon icon="diameter" size={16}/> Apparent angular diameter: as seen from Earth in the
                            current selected day.</p>
                    </li>
                    <li>
                        <p><SvgIcon icon="moon" size={16}/> This indicates the apparent size of the selected object with
                            respect to the Moon.</p>
                    </li>
                    <li>
                        <p><SvgIcon icon="opposition" size={16}/> The date of the next opposition between Earth and the
                            selected planet. It is calculated for Mars, the outer planets, and the Moon.</p>
                    </li>
                    <li>
                        <p><SvgIcon icon="max-elongation" size={16}/> The date of the next maximum elongation between
                            Earth and the selected planet. It is calculated only for Mercury and Venus.</p>
                    </li>
                </ul>

                <p>Please note that the algorithm to compute the date of oppositions and maximum elongations is rather
                    unsophisticated. This, along with the accuracy issues (see the <a href="/data">data</a> section)
                    limits the
                    precision of the calculated dates (so far I've only found errors of a few hours). </p>

            </div>
        )
    };
}();
