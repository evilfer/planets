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

    var types = {
            lineal: require('./types/lineal')
        },

        data = {
            timer: null,
            animations: {},
            n: 0,
            cb: null
        },


        setUpdateCallback = function (cb) {
            data.cb = cb;
        },

        update = function (t) {
            var values = {};

            for (var id in data.animations) {
                if (data.animations.hasOwnProperty(id)) {
                    var anim = data.animations[id];
                    types[anim.type].update(anim, Math.min(t, anim.t1));
                    values[id] = anim.v;

                    if (t >= anim.t1) {
                        delete data.animations[id];
                        data.n--;
                    }
                }
            }

            if (data.n === 0) {
                data.timer.disable();
            }

            data.cb(values);
        },

        useTimer = function (timer) {
            data.timer = timer;
            timer.setFrameCallback(update);
        },

        setAnim = function (id, value, duration, type, currentValue) {
            var t0 = data.timer.t(),
                anim = {
                    type: type,
                    t0: t0,
                    duration: duration,
                    t1: t0 + duration,
                    vel: data.animations[id] ? data.animations[id].vel : 0,
                    v0: currentValue,
                    v: currentValue,
                    v1: value
                };

            if (!data.animations.hasOwnProperty(id)) {
                data.n++;
                if (data.n === 1) {
                    data.timer.enable(update);
                }
            }

            data.animations[id] = anim;
            types[type].init(anim);
        },

        cancel = function (id) {
            if (data.animations.hasOwnProperty(id)) {
                delete data.animations[id];
                data.n--;
                if (data.n === 0) {
                    data.timer.disable();
                }
            }
        };

    return {
        useTimer: useTimer,
        setUpdateCallback: setUpdateCallback,
        setAnim: setAnim,
        cancel: cancel
    };

}();
