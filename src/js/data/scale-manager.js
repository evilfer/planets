module.exports = function () {
    'use strict';

    var THREE = require('three'),
        data = require('./data.js'),

        init = function (ephs) {
            for (var id in ephs) {
                if (ephs.hasOwnProperty(id)) {
                    ephs[id].scaled = {
                        globalPos: new THREE.Vector3(),
                        localPos: new THREE.Vector3(),
                        bodyScl: 1,
                        orbitScl: 1,
                        globalScl: 1
                    };
                }
            }
        },

        update = function (ephs, scl) {
            for (var id in ephs) {
                if (ephs.hasOwnProperty(id)) {
                    var eph = ephs[id],
                        obj = data.objects[id];

                    if (obj.parent) {
                        eph.scaled.orbitScl = scl * obj.ui.scale.global + 1 - scl;

                        eph.scaled.globalScl = eph.scaled.orbitScl * ephs[obj.parent].scaled.globalScl;

                        eph.scaled.localPos.set(eph.vectors.r[0], eph.vectors.r[1], eph.vectors.r[2]);
                        eph.scaled.globalPos.set(eph.scaled.localPos);
                        eph.scaled.globalPos.multiplyScalar(eph.scaled.globalScl);
                        eph.scaled.globalPos.add(ephs[obj.parent].scaled.globalPos);
                    }

                    eph.scaled.bodyScl = obj.radius * (scl * obj.ui.scale.body + 1 - scl) / eph.scaled.globalScl;
                }
            }
        };

    return {
        init: init,
        update: update
    };

}();
