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

        SceneManager = require('./scene/scene-manager.jsx.js'),
        Overlay3d = require('./overlay/overlay.jsx');


    return React.createClass({
        mixins: [OnResize],

        render: function () {
            var window = this.state.window,
                view = this.props.view,

                d = 1e10,
                perspective = {
                    lookAt: new THREE.Vector3(0, 0, 0),
                    pos: new THREE.Vector3(0, -d * Math.cos(view.alt), d * Math.sin(view.alt)),
                    far: 10 * d,
                    near: .5 * d,
                    aspect: window.width / window.height,
                    fov: 50
                };

            return (
                <div className="wrapper-3d">
                    <SceneManager ephemerides={this.props.ephemerides} data={this.props.data}
                                  perspective={perspective} window={window}/>
                    <Overlay3d ephemerides={this.props.ephemerides} data={this.props.data}
                               perspective={perspective} window={window}/>
                </div>
            );
        }
    });
}();
