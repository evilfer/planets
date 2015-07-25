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

    var date2mjd = function (date) {
            var a = date.getUTCMonth() < 2 ? 1 : 0,
                y = date.getUTCFullYear() + 4800 - a,
                m = date.getUTCMonth() + 12 * a - 2,
                jdn = date.getUTCDate() + Math.floor((153 * m + 2) / 5)
                    + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400)
                    - 32045,
                jd = jdn + (date.getUTCHours() - 12) / 24 + date.getUTCMinutes() / 1440 + date.getUTCSeconds() / 86400;

            return jd - 2400000.5;
        },

        mjd2date = function (mjd) {
            var jd = mjd + 2400000.5,
                j = Math.round(jd),
                hms = (jd - j) * 86400,
                ms = 43200 + hms,

                f = j + 1401 + Math.floor(3 * Math.floor((4 * j + 274277) / 146097) / 4) - 38,
                e = 4 * f + 3,
                g = Math.floor((e % 1461) / 4),
                h = 5 * g + 2,

                month = (Math.floor(h / 153) + 2) % 12;

            return new Date(Math.floor(e / 1461) - 4716 + Math.floor((13 - month) / 12),
                month,
                Math.floor((h % 153) / 5) + 1,
                12 + Math.floor(hms / 3600),
                Math.floor(ms / 60) % 60,
                ms % 60
            );
        };

    return {
        date2mjd: date2mjd,
        mjd2date: mjd2date
    };

}();
