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

    var compressed = require('../../../data/data.json'),
        uiData = require('../../../data/ui.json'),

        expand = require('./expand').expandEncoded,
        cp = ['label', 'parent', 'step', 'mu', 'radius', 'rings'],
        data = {t0: compressed.t0, t1: compressed.t1, objects: {}, tree: []},


        ids = Object.keys(compressed.objects),
        parents = {};

    ids.map(function (id) {
        parents[id] = compressed.objects[id].parent === false ? -1 : parseInt(compressed.objects[id].parent);
    });

    ids.sort(function (a, b) {
        return parents[a] - parents[b];
    });


    for (var i = 0; i < ids.length; i += 1) {
        var id = ids[i],
            orig = compressed.objects[id],
            obj = {id: id, children: []};

        for (var j = 0; j < cp.length; j += 1) {
            if (orig.hasOwnProperty(cp[j])) {
                obj[cp[j]] = orig[cp[j]];
            }
        }
        if (orig.hasOwnProperty('points')) {
            obj.points = expand(orig.points);
        }

        obj.ui = uiData.objects[id];

        if (obj.parent) {
            data.objects[obj.parent].children.push(obj);
        } else {
            data.tree.push(obj);
        }

        data.objects[id] = obj;
    }

    return data;
}();
