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
    var p = [0, 0],
        down = false,
        moved = false;

    return {
        handleMouseDown: function (e) {
            p[0] = e.clientX;
            p[1] = e.clientY;
            down = true;
            moved = false;
        },
        handleMouseUp: function (e) {
            down = false;
            if (!moved) {
                this.handleClick(e.clientX, e.clientY);
            }
        },
        handleMouseMove: function (e) {
            if (down) {
                this.handleDrag(e.clientX - p[0], e.clientY - p[1]);
                p[0] = e.clientX;
                p[1] = e.clientY;
                moved = true;
            }
        },
        handleMouseLeave: function (e) {
            down = false;
        }
    }

}();
