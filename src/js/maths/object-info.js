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

    var data = require('../data/data'),
        analysis = require('./analysis'),
        angles = require('./angles'),

        ObjectInfo = function (sun, observer, axialTilt, reference) {
            this.sun = sun;
            this.observer = observer;
            this.axialTilt = {a: axialTilt, c: Math.cos(axialTilt), s: Math.sin(axialTilt)};
            this.reference = reference;

            this.data = {};

            for (var id in data.objects) {
                if (id !== this.observer && data.objects.hasOwnProperty(id)) {
                    this.data[id] = {
                        visible: {}
                    };

                    if (id.charAt(0) >= this.observer.charAt(0)) {
                        this.data[id].opposition = false;
                    } else {
                        this.data[id].elongation = 0;
                        this.data[id].maxElongation = {t: false, e: 0};
                    }
                }
            }
        };


    ObjectInfo.prototype.update = function (t, lat, ephs, updatePredictions) {
        for (var id in this.data) {
            if (this.data.hasOwnProperty(id)) {
                var isInner = id.charAt(0) < this.observer.charAt(0),
                    info = this.data[id];

                info.angularDiameter = analysis.angularDiameter(this.observer, id, ephs);
                analysis.visible(this.observer, lat * Math.PI / 180, this.axialTilt, id, ephs, info.visible);

                if (isInner) {
                    info.elongation = analysis.elongation(this.observer, id, ephs);
                }

                if (updatePredictions) {
                    if (isInner) {
                        analysis.maxElongation(this.observer, id, t, info.maxElongation);
                    } else {
                        info.opposition = analysis.opposition(this.observer, id, t);
                    }
                }
            }
        }
    };

    ObjectInfo.prototype.visible = function (id) {
        if (id === this.observer) {
            return false;
        } else {
            var sunVisible = this.data[this.sun].visible,
                targetVisible = id !== this.sun ? this.data[id].visible : false,
                useSunTimes = sunVisible.mode === 'rise_set',
                targetHasTimes = targetVisible && targetVisible.mode === 'rise_set',
                a0,
                result = {
                    sun: useSunTimes,
                    hasTarget: !!targetVisible,
                    target: targetHasTimes
                };

            if (useSunTimes) {
                a0 = .5 * (sunVisible.sets + sunVisible.rises);
                result.sr = angles.revFrom(sunVisible.rises, a0);
                result.ss = angles.revFrom(sunVisible.sets, a0);
            } else {
                result.sv = sunVisible.mode === 'visible';
            }

            if (targetVisible) {
                if (targetHasTimes) {
                    if (!useSunTimes) {
                        a0 = .5 * (targetVisible.sets + targetVisible.rises) - Math.PI;
                    }

                    result.tr = angles.revFrom(targetVisible.rises, a0);
                    result.ts = angles.revFrom(targetVisible.sets, a0);
                } else {
                    result.tv = targetVisible.mode === 'visible';
                }

                if (sunVisible.mode !== 'visible' && targetVisible.mode !== 'hidden') {
                    /*   ra + p = pi/2   */
                    var maxHeightAngle = .5 * Math.PI - targetVisible.p,
                        maxHeightTime = angles.revFrom(maxHeightAngle, a0);

                    if (sunVisible.mode === 'hidden' || (maxHeightTime >= result.ss && maxHeightTime <= result.sr)) {
                        result.tmh = Math.acos(targetVisible.c + Math.abs(targetVisible.d));
                        result.tmt = targetVisible.mode === 'visible' ? .5 : maxHeightTime;
                    } else {
                        var sunriseCosHeight = targetVisible.c + targetVisible.d * Math.sin(sunVisible.rises + targetVisible.p),
                            sunsetCosHeight = targetVisible.c + targetVisible.d * Math.sin(sunVisible.sets + targetVisible.p);

                        if (sunriseCosHeight > 0 || sunsetCosHeight > 0) {
                            if (sunsetCosHeight > sunriseCosHeight) {
                                result.tmt = result.ss;
                                result.tmh = Math.acos(sunsetCosHeight);
                            } else {
                                result.tmt = result.sr;
                                result.tmh = Math.acos(sunriseCosHeight);
                            }
                        }
                    }
                }
            }

            return result;
        }
    };

    ObjectInfo.prototype.isObserver = function (id) {
        return id === this.observer;
    };

    ObjectInfo.prototype.isReference = function (id) {
        return id === this.reference;
    };

    ObjectInfo.prototype.relDiameter = function (id) {
        return this.data[id].angularDiameter / this.data[this.reference].angularDiameter;
    };

    return ObjectInfo;

}
();
