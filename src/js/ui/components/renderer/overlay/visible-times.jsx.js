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
        extend = require('extend'),
        materials = require('../../../../data/materials'),

        VisibleLine = React.createClass({
            render: function () {
                var hasTimes = this.props.hasTimes,
                    visibleRound = this.props.visibleRound,
                    endsRound = this.props.endsRound,
                    colors = this.props.colors,
                    style = extend({left: 0, width: '100%', height: 5, position: 'absolute'}, this.props.style),
                    segments,
                    elements;

                if (hasTimes) {
                    var firstVisible = this.props.s < this.props.r,
                        p1 = Math.min(this.props.s, this.props.r),
                        p2 = Math.max(this.props.s, this.props.r);

                    segments = [
                        {v: firstVisible, x0: 0, w: p1},
                        {v: !firstVisible, x0: p1, w: p2 - p1},
                        {v: firstVisible, x0: p2, w: 1 - p2}
                    ];
                } else {
                    segments = [
                        {v: this.props.visible, x0: 0, w: 1}
                    ];
                }

                elements = segments.map(function (segment, i) {
                    var segmentStyle = {
                        position: 'absolute',
                        left: (100 * segment.x0) + '%',
                        width: (100 * segment.w) + '%',
                        height: '100%',
                        top: 0,
                        background: colors[segment.v ? 0 : 1]
                    };

                    if (visibleRound && segment.v) {
                        if (i > 0) {
                            segmentStyle.borderTopLeftRadius = visibleRound;
                            segmentStyle.borderBottomLeftRadius = visibleRound;
                        }

                        if (i < segments.length - 1) {
                            segmentStyle.borderTopRightRadius = visibleRound;
                            segmentStyle.borderBottomRightRadius = visibleRound;
                        }
                    }

                    if (endsRound) {
                        if (i == 0) {
                            segmentStyle.borderTopLeftRadius = endsRound;
                            segmentStyle.borderBottomLeftRadius = endsRound;
                        }

                        if (i == segments.length - 1) {
                            segmentStyle.borderTopRightRadius = endsRound;
                            segmentStyle.borderBottomRightRadius = endsRound;
                        }
                    }

                    return <div key={i} style={segmentStyle}/>;
                });

                return <div style={style}>{elements}
                </div>;
            }
        }),

        MaxHeightIndicator = React.createClass({
            render: function () {
                var data = this.props.data;
                console.log(data);

                if (data.tmh) {
                    console.log('yes');
                    return (
                        <div style={{
                           position: 'absolute',
                           width: 0,
                           height: 0,
                           top: -1,
                           left: (100 * data.tmt) + '%'}}>
                            <div style={{
                                position:'absolute',
                                top: 0,
                                left: -1,
                                width: 2,
                                height: 4,
                                background: 'white'
                            }}/>
                            <div style={{
                                position:'absolute',
                                bottom: 0,
                                width: 40,
                                left: -20,
                                color: 'white',
                                textAlign: 'center',
                                fontSize: '.7em'
                            }}>{Math.round(180 * data.tmh / Math.PI) + '\u00B0'}</div>
                        </div>
                    );
                } else {
                    return false;
                }
            }
        });


    return React.createClass({


        render: function () {
            var data = this.props.data,

                height = 16,
                targetHeight = 6,
                sunHeight = data.hasTarget ? 12 : targetHeight,

                sun = <VisibleLine hasTimes={data.sun} r={data.sr} s={data.ss} visible={data.sv}
                                   colors={['#DBE9FF', '#1F252D']}
                                   style={{top: .5 * (height - sunHeight), height: sunHeight}}
                                   endsRound={3}/>,
                target = data.hasTarget ?
                    <VisibleLine hasTimes={data.target} r={data.tr} s={data.ts} visible={data.tv}
                                 colors={[materials[this.props.id].color, 'none']}
                                 style={{top: .5 * (height - targetHeight), height: targetHeight}}
                                 visibleRound={3}/> : false,
                heightIndicator = <MaxHeightIndicator data={data}/>;

            return (
                <div style={{height: 16, position: 'relative'}}>
                    {sun}
                    {target}
                    {heightIndicator}
                </div>
            );
        }

    });

}();





