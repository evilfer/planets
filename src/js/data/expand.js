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

    var b64Decoder = require('./b64Decoder'),

        expand = function (data) {
            var expanded = [];
            for (var i = 0; i < data.length; i += 6) {
                expanded.push({
                    r: [data[i], data[i + 1], data[i + 2]],
                    v: [data[i + 3], data[i + 4], data[i + 5]]
                });
            }

            return expanded;
        },

        expandEncoded = function (txt) {
            return expand(b64Decoder.f64(txt));
        };

    return {
        expand: expand,
        expandEncoded: expandEncoded
    };

}
();
