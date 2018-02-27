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

    var React = require('react'),
        VisibleTimes = require('../../renderer/overlay/visible-times.jsx');

    return {
        title: 'Visibility',
        content: (
            <div>
                <p>The <i className="material-icons">visibility</i> visibility information indicates the relative
                    duration of the night and day, and the times when a planet or Moon are visible. It also shows the
                    maximum elevation of the planet during night time.</p>

                <p>When the Sun, planets and the Moon are visible for an observer from Earth depends on their location
                    on the planet of course. You can read <a href="/help/latitude">here</a> about setting up your
                    latitude.</p>

                <p>In this page, only the latitude is used. The observer's latitude is enough to calculate the duration
                    of the night and day. To know also the exact times when the Sun, a planet or the Moon rises and
                    sets, the longitude is also needed. But this information is not available (yet) in this page.</p>

                <p>Below are some examples of visibility information with their meaning.</p>
                <ul>
                    <li>
                        <div>Sun:
                            <div className="help-info-visibility-bar">
                                <VisibleTimes data={{hasTarget: false, sr: 0.67, ss: 0.3, sun: true}}/>
                            </div>
                        </div>

                        <p>The dark band in the middle represents the duration of the night.
                            The bright bands on the left and right represent the evening and morning respectively. The
                            whole bar represents 24h.</p>
                    </li>

                    <li>
                        <div>Mercury:
                            <div className="help-info-visibility-bar">
                                <VisibleTimes data={{hasTarget: true, sr: 0.84, ss: 0.16, sun: true,
                            target: true, tr: 0.89, ts: 0.23}} id="199"/>
                            </div>
                        </div>
                        <p>Mercury sets in this example a bit after the Sun (left part of the bar), so that it may be
                            visible briefly after sunset. Mercury does not rise again until after the Sun, so it cannot
                            be seen in the morning.</p>
                    </li>
                    <li>
                        <div>Jupiter:
                            <div className="help-info-visibility-bar">
                                <VisibleTimes data={{hasTarget: true, sr: 0.82, ss: 0.18, sun: true,
                            target: true, tr: 0.36, ts: 0.89}} id="5"/>
                            </div>
                        </div>
                        <p>In this example, Jupiter is close to an opposition with respect to the Sun. It rises
                            during the night (see middle of the bar, and it's still in the visible portion of the
                            sky until after sunrise.</p>
                    </li>

                </ul>
            </div>
        )
    };
}();
