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

    var atob = require('atob'),

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

        /**
         * from https://gist.github.com/TooTallNate/4750953
         * @returns boolean
         */
        littleEndianness = function () {
            var b = new ArrayBuffer(4),
                a = new Uint32Array(b),
                c = new Uint8Array(b);
            a[0] = 0xdeadbeef;
            return c[0] === 0xef;
        }(),

        expandEncoded = function (txt) {
            var bufferString = atob(txt),
                buffer = new ArrayBuffer(bufferString.length),
                bufferView = new Uint8Array(buffer),
                floatArray;
            
            for (var i = 0; i < bufferString.length; i += 8) {
                for (var j = 0; j < 8; j++) {
                    var ccp = i + j,
                        bvp = littleEndianness ? ccp : i + 7 - j;

                    bufferView[bvp] = bufferString.charCodeAt(ccp);
                }
            }

            floatArray = new Float64Array(bufferView.buffer);

            return expand(floatArray);
        };

    return {
        expand: expand,
        expandEncoded: expandEncoded
    };

}
();
