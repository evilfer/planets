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
                <p>The position of Solar System bodies has been computed using
                    the <a target="_blank" href="http://ssd.jpl.nasa.gov/?horizons">JPL
                        Horizons system</a>.
                </p>

                <p>The star field is created using data from
                    the <a target="_blank" href="http://tdc-www.harvard.edu/catalogs/bsc5.html">Yale
                        Bright Star Catalog</a>.
                    'Planets' includes the stars with magnitude up to 6: 5.080 stars.
                </p>

                <p>Planet orbits are calculated from their state vectors (position and velocity).
                    Please note that the precision of the planets and Moon in this page limited, even though the
                    Horizons system produces very accurate data. This is due the fact that 'Planets' does not compute
                    ephemerides on the fly. Rather, it uses precomputed data: state vectors have been calculated only
                    for a number of dates within a three year time span (Jan 2015 - Dec 2017).</p>

                <p>To keep the size of the download reasonable, the separation between computed points is limited
                    (around 100 points per orbital period). For dates that fall between points, the velocity and
                    position are interpolated. This will affect the calculated orbits.</p>

                <p>In addition, planets with satellites wobble in their orbit around the Sun. To prevent this from
                    affecting the displayed orbits, these are calculated using the state vectors of the barycenter of
                    their planetary system, rather than the planet itself. For example, the orbit of the Earth
                    is calculated in this page using the Earth-Moon system barycenter state vectors. Again to keep the
                    download size as small as possible, the barycenter position is 'reused' here as a substitute to the
                    planet position. This introduces an additional error in the position of the planets. </p>

            </div>
        )
    };
}();
