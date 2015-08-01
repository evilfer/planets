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

    var React = require('react'),
        THREE = require('three'),
        OnResize = require("react-window-mixins").OnResize,

        ephTransforms = require('../../../data/eph-transforms'),

        SceneManager = require('./scene/scene-manager.jsx.js'),
        Overlay3d = require('./overlay/overlay.jsx'),
        MouseInputMixin = require('./mouse-input');

    return React.createClass({
        mixins: [OnResize, MouseInputMixin],

        componentWillMount: function () {
            this.txEphs = ephTransforms.init();
        },

        handleDrag: function (dx, dy) {
            var values = {};
            if (dx !== 0) {
                values.az = -dx / 80;
            }
            if (dy !== 0) {
                values.alt = dy / 50;
            }
            this.props.setValues(values);
        },

        handleClick: function (x, y) {
        },

        handleWheel: function (e) {
            e.preventDefault();

            if (e.deltaY) {
                this.props.setValues({
                    zoom: e.deltaY < 0 ? 1.2 : 1 / 1.2
                });
            }
        },


        render: function () {
            var window = this.state.window,
                view = this.props.view,
                ephemerides = this.props.ephemerides,

                d = 1e10 / view.zoom,

                perspective = {
                    lookAt: new THREE.Vector3(0, 0, 0),
                    pos: new THREE.Vector3(d * Math.sin(view.az) * Math.cos(view.alt), -d * Math.cos(view.az) * Math.cos(view.alt), d * Math.sin(view.alt)),
                    up: new THREE.Vector3(-Math.sin(view.alt) * Math.sin(view.az), Math.sin(view.alt) * Math.cos(view.az), Math.cos(view.alt)),
                    far: 10 * d,
                    near: .1 * d,
                    aspect: window.width / window.height,
                    fov: 50
                };

            ephTransforms.update(this.txEphs, ephemerides, view.scl, perspective);

            return (
                <div className="wrapper-3d"
                     onMouseDown={this.handleMouseDown}
                     onMouseUp={this.handleMouseUp}
                     onMouseMove={this.handleMouseMove}
                     onMouseLeave={this.handleMouseLeave}
                     onWheel={this.handleWheel}>

                    <SceneManager ephemerides={ephemerides} data={this.props.data}
                                  perspective={perspective} window={window}
                                  txEphemerides={this.txEphs}/>

                    <Overlay3d ephemerides={ephemerides} data={this.props.data}
                               perspective={perspective} window={window}
                               txEphemerides={this.txEphs}/>
                </div>
            );
        }
    });
}();
