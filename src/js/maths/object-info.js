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

    var data = require('../data/data'),
        analysis = require('./analysis'),

        ObjectInfo = function (observer, reference) {
            this.observer = observer;
            this.reference = reference;

            this.data = {};

            for (var id in data.objects) {
                if (id !== this.observer && data.objects.hasOwnProperty(id)) {
                    this.data[id] = {};
                }
            }
        };

    ObjectInfo.prototype.update = function (t, ephs, updatePredictions) {
        for (var id in this.data) {
            if (this.data.hasOwnProperty(id)) {
                this.data[id].angularDiameter = analysis.angularDiameter(this.observer, id, ephs);
                if (updatePredictions) {
                    this.data[id].opposition = analysis.opposition(this.observer, id, t);
                }
            }
        }
    };

    ObjectInfo.prototype.relMagnification = function (id) {
        return this.data[this.reference].angularDiameter / this.data[id].angularDiameter;
    };


    return ObjectInfo;

}();
