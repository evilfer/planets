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

    var THREE = require('three'),
        data = require('./data.js'),

        init = function () {
            var tx = {};
            for (var id in data.objects) {
                if (data.objects.hasOwnProperty(id)) {
                    tx[id] = {
                        globalPos: new THREE.Vector3(),
                        localPos: new THREE.Vector3(),
                        projected: new THREE.Vector3(),
                        screenPos: [0, 0],
                        bodyScl: 1,
                        sphereScl: 1,
                        orbitScl: 1,
                        accScl: 1
                    };
                }
            }

            return tx;
        },

        update = function (txEphs, ephs, scl, perspective, window) {
            var camera = new THREE.PerspectiveCamera(perspective.fov, perspective.aspect, perspective.near, perspective.far);

            camera.position.copy(perspective.pos);
            camera.up.copy(perspective.up);
            camera.lookAt(perspective.lookAt);
            camera.updateMatrixWorld(true);

            for (var id in ephs) {
                if (ephs.hasOwnProperty(id)) {
                    var eph = ephs[id],
                        obj = data.objects[id],
                        tx = txEphs[id];

                    if (obj.parent) {
                        var parentTx = txEphs[obj.parent];

                        tx.orbitScl = scl * obj.ui.scale.global + 1 - scl;

                        tx.accScl = tx.orbitScl * parentTx.accScl;

                        tx.localPos.set(eph.vectors.r[0], eph.vectors.r[1], eph.vectors.r[2]);
                        tx.globalPos.copy(tx.localPos);
                        tx.globalPos.multiplyScalar(tx.accScl);
                        tx.globalPos.add(parentTx.globalPos);
                    }

                    tx.bodyScl = (scl * obj.ui.scale.body + 1 - scl) / tx.accScl;
                    tx.sphereScl = obj.radius * tx.bodyScl;
                    tx.projected.copy(tx.globalPos);
                    tx.projected.project(camera);

                    tx.screenPos[0] = .5 * window.width * (1 + tx.projected.x);
                    tx.screenPos[1] = .5 * window.height * (1 - tx.projected.y);
                }
            }
        };

    return {
        init: init,
        update: update
    };

}();
