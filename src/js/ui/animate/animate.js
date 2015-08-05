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
            lineal: require('./types/lineal'),
            follow: require('./types/follow'),
            poly3: require('./types/poly3'),
            poly5: require('./types/poly5')
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
                    var anim = data.animations[id],
                        handler = types[anim.type],
                        stop = handler.update(anim, t);

                    values[id] = anim.v;

                    if (stop) {
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

        setAnim = function (id, type, params, v0) {
            var t0 = data.timer.t(),
                handler = types[type],
                exists = data.animations.hasOwnProperty(id);

            if (exists && type === data.animations[id].type) {
                handler.reset(data.animations[id], t0, params);
            } else {
                var anim = {
                    type: type
                };
                handler.init(anim, t0, params, v0);
                data.animations[id] = anim;
            }

            if (!exists) {
                data.n++;
                if (data.n === 1) {
                    data.timer.enable(update);
                }
            }
        },

        isAnimated = function (id) {
            return data.animations.hasOwnProperty(id);
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
        cancel: cancel,
        isAnimated: isAnimated
    };

}();
