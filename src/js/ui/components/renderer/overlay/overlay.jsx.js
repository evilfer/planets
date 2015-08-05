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
        mui = require('material-ui'),
        Paper = mui.Paper;

    return React.createClass({
        render: function () {
            var txEphemerides = this.props.txEphemerides,
                window = this.props.window,
                element = false,
                id = this.props.selected;

            if (id !== false) {
                var obj = this.props.data.objects[id],
                    projected = txEphemerides[id].projected,
                    info = this.props.info.data[id],
                    style = {
                        top: .5 * window.height * (1 - projected.y),
                        left: .5 * window.width * (1 + projected.x)
                    },
                    content = [<div key="title">{obj.ui.label}</div>];

                if (info) {
                    if (info.opposition) {
                        content.push(<div key="opposition">Opposition: {info.opposition}</div>);
                    }

                    if (info.angularDiameter) {
                        content.push(<div key="diameter">Angular diameter: {info.angularDiameter}</div>);

                        if (id !== this.props.info.reference) {
                            content.push(<div key="rel-diameter">Magnification to same diameter as
                                Moon: {this.props.info.relMagnification(id)}</div>);
                        }
                    }

                    if (id !== info.reference) {
                    }
                }


                element = (
                    <div className="body-info-anchor" style={style}>
                        <div className="body-info">
                            <Paper>
                                {content}
                            </Paper>
                        </div>
                    </div>
                );
            }

            return <div className="overlay-3d">{element}</div>;
        }
    });
}();
