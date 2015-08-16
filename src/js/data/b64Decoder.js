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

        gen = function (size, Type) {
            return function (encoded) {
                var bufferString = atob(encoded),
                    buffer = new ArrayBuffer(bufferString.length),
                    bufferView = new Uint8Array(buffer);

                for (var i = 0; i < bufferString.length; i += size) {
                    for (var j = 0; j < size; j++) {
                        var ccp = i + j,
                            bvp = littleEndianness ? ccp : i + size - 1 - j;

                        bufferView[bvp] = bufferString.charCodeAt(ccp);
                    }
                }
                return new Type(bufferView.buffer);
            }
        };

    return {
        f64: gen(8, Float64Array),
        f32: gen(4, Float32Array)
    };

}();