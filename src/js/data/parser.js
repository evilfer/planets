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

    var btoa = require('btoa'),

        parse = function (txt) {
            var lines = txt.split('\r\n'),
                data = [],
                soe = false;

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];

                if (line === '$$SOE') {
                    soe = true;
                } else if (line === '$$EOE') {
                    break;
                } else if (soe && line.indexOf(' ') === 0) {
                    data.push(parseFloat(line.substring(2, 25)));
                    data.push(parseFloat(line.substring(25, 48)));
                    data.push(parseFloat(line.substring(48, 71)));
                }
            }

            return data;
        },

        /**
         * Creates a base64 representation of the state vectors. Each value is a float64.
         * Please note that 'decoder' assumes the data is little endian.
         * This function does not check for the machine endianness. A big-endian machine will
         * produce invalid outputs.
         *
         * @param txt Horizons String data
         * @returns {string}
         */
        encoded = function (txt) {
            return btoa(String.fromCharCode.apply(null, new Uint8Array(new Float64Array(parse(txt)).buffer)));
        };

    return {
        parse: parse,
        encoded: encoded
    };

}();
