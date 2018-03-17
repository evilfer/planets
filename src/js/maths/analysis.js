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
        vector = require('./vector'),
        interpolator = require('./interpolator'),

        distance = function (a, b, eph) {
            return vector.distance(eph[a].vectors.p, eph[b].vectors.p);
        },

        angularDiameter = function (a, b, eph) {
            return data.objects[b].radius * 2 / distance(a, b, eph);
        },

        angle = function () {
            var r = [0, 0, 0];

            return function (id, t) {
                interpolator.pos(t, data.t0, data.objects[id], r);
                return Math.atan2(r[1], r[0]);
            };
        }(),

        angleDiff = function (a, b, t) {
            var d = angle(b, t) - angle(a, t);
            if (d > Math.PI) {
                d -= 2 * Math.PI;
            } else if (d < -Math.PI) {
                d += 2 * Math.PI;
            }

            return d;
        },

        elongationK = function () {
            var or = [0, 0, 0],
                tr = [0, 0, 0];

            return function (a, b, t) {
                interpolator.pos(t, data.t0, data.objects[a], or);
                interpolator.pos(t, data.t0, data.objects[b], tr);
                vector.sub(tr, or);

                var mc = vector.dot(or, tr);
                return mc * mc / (vector.mod2(or) * vector.mod2(tr));
            }
        }(),

        elongation = function () {
            var ot = [0, 0, 0];

            return function (a, b, eph) {
                vector.diff(ot, eph[a].vectors.p, eph[b].vectors.p);
                var mc = vector.dot(ot, eph[a].vectors.p);
                return Math.acos(Math.sqrt(mc * mc / (vector.mod2(ot) * vector.mod2(eph[a].vectors.p))));
            }
        }(),

        maxElongation = function (a, b, fromT, result) {
            var step = .5 * Math.min(data.objects[a].step, data.objects[b].step),
                e0, e1, e2;

            if (fromT + 2 * step <= data.t1) {
                e0 = elongationK(a, b, fromT);
                e1 = elongationK(a, b, fromT + step);

                for (var t = fromT + 2 * step; t <= data.t1; t += step) {
                    e2 = elongationK(a, b, t);
                    if (e1 < e0 && e1 < e2) {
                        var t2 = t,
                            t1 = t - step,
                            t0 = t1 - step;

                        for (var i = 0; i < 5; i++) {
                            var tp = .5 * (t0 + t1),
                                ep = elongationK(a, b, tp);

                            if (ep < e1) {
                                t2 = t1;
                                e2 = e1;
                                t1 = tp;
                                e1 = ep;
                            } else {
                                e0 = e1;
                                t0 = t1;
                                t1 = .5 * (t0 + t2);
                                e1 = elongationK(a, b, t1);
                            }
                        }

                        result.t = t1;
                        result.e = Math.acos(Math.sqrt(e1));
                        return;
                    } else {
                        e0 = e1;
                        e1 = e2;
                    }
                }
            }

            result.t = false;
        },

        opposition = function (a, b, fromT) {
            var step = Math.min(data.objects[a].step, data.objects[b].step),
                da0 = angleDiff(a, b, fromT);

            for (var t = fromT + step; t <= data.t1; t += step) {
                var da1 = angleDiff(a, b, t);
                if (da1 === 0) {
                    return da1;
                } else if (da0 * da1 < 0 && Math.abs(da0) < Math.PI / 2 && Math.abs(da1) < Math.PI / 2) {
                    var t0 = t - step,
                        t1 = t;

                    for (var i = 0; i < 5; i++) {
                        var tm = .5 * (t0 + t1),
                            dam = angleDiff(a, b, tm);

                        if (dam === 0) {
                            return tm;
                        } else if (da0 * dam < 0) {
                            t1 = tm;
                        } else {
                            t0 = tm;
                        }
                    }

                    return .5 * (t0 + t1);
                } else {
                    da0 = da1;
                }
            }

            return false;
        },

        visible = function () {
            var ot = [0, 0, 0];

            return function (observer, lat, tilt, target, eph, result) {
                vector.diff(ot, eph[target].vectors.p, eph[observer].vectors.p);
                vector.scl(ot, 1. / vector.mod(ot));

                var cosLat = Math.cos(lat),
                    sinLat = Math.sin(lat),

                    a = ot[0] * cosLat,
                    b = (tilt.c * ot[1] - tilt.s * ot[2]) * cosLat,
                    c = (tilt.c * ot[2] + tilt.s * ot[1]) * sinLat;

                result.c = c;

                /*  solve: a * cos(ra) + b * sin(ra) + c = 0 */

                if (a === 0 && b === 0) {
                    result.mode = c > 0 ? 'visible' : 'hidden';
                    result.d = 0;
                    result.p = 0;
                } else {
                    /*  transform to d * sin(ra + p) + c = 0  */

                    var p = Math.atan2(a, b),
                        cosP = Math.cos(p),
                        sinP = Math.sin(p),
                        d = Math.abs(cosP) > Math.abs(sinP) ? b / cosP : a / sinP;

                    result.p = p;
                    result.d = d;

                    if (Math.abs(c) >= Math.abs(d)) {
                        result.mode = c > 0 ? 'visible' : 'hidden';
                    } else {
                        result.mode = 'rise_set';
                        var pi2 = Math.PI * 2,
                            angle1 = Math.asin(-c / d),
                            angle2 = Math.PI - angle1,
                            ra1 = angle1 - p,
                            ra2 = angle2 - p;

                        if (ra1 < 0) {
                            ra1 += pi2;
                        } else if (ra1 > pi2) {
                            ra1 -= pi2;
                        }

                        if (ra2 < 0) {
                            ra2 += pi2;
                        } else if (ra2 > pi2) {
                            ra2 -= pi2;
                        }

                        if (d * Math.sin(ra1 + p + .1) + c > 0) {
                            result.rises = ra1;
                            result.sets = ra2;
                        } else {
                            result.rises = ra2;
                            result.sets = ra1;
                        }

                        if (result.sets < result.rises) {
                            result.sets += pi2;
                        }
                    }
                }
            };
        }();

    return {
        distance: distance,
        angularDiameter: angularDiameter,
        opposition: opposition,
        maxElongation: maxElongation,
        elongation: elongation,
        visible: visible
    };

}();
