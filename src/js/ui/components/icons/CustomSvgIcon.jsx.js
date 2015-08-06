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
        SvgIcon = mui.SvgIcon,

        icons = {
            'rewind': <path d="M19 5v14l-11-7z"/>,
            'opposition': (
                <g>
                    <line y1="12" x1="4" y2="12" x2="21" strokeWidth="2" stroke="#757575"/>
                    <circle fill="#757575" cx="4" cy="12" r="3"/>
                    <circle fill="#757575" cx="13" cy="12" r="2"/>
                    <circle fill="#757575" cx="21" cy="12" r="2"/>
                </g>
            ),
            'max-elongation': (
                <g>
                    <path id="svg_2" d="m4,9l0,8l17,0l-17,-8z" stroke="#757575" strokeWidth="2" fill="none"/>
                    <circle fill="#757575" cx="4" cy="9" r="3" id="svg_3"/>
                    <circle fill="#757575" cx="4" cy="17" r="2" id="svg_4"/>
                    <circle fill="#757575" cx="21" cy="17" r="2" id="svg_5"/>
                </g>
            ),
            'diameter': <path fill="#757575"
                              d="M0 11v2h24v-2H0zm12-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>,
            'moon': <path fill="#757575" fill-opacity="1" stroke-opacity="1" stroke="null"
                          d="M19.5,17.6 Q18.7,17.8 17.9,17.8 Q15.4,17.8 13.2,16.5 T9.8,13.1 T8.6,8.4 Q8.6,5.7 10,3.4 Q7.2,4.2 5.4,6.6 T3.6,12 Q3.7,13.8 4.4,15.4 T6.3,18.3 T9.1,20.2 T12.6,20.9 Q14.6,20.9 16.4,20 T19.5,17.6 L19.5,17.6 zM22.3,16.5 Q21,19.3 18.3,21 T12.6,22.7 Q10.4,22.7 8.4,21.8 T5,19.5 T2.7,16.1 T1.8,12 Q1.9,9.8 2.7,7.9 T4.8,4.5 T8.1,2.2 T12.2,1.3 Q12.8,1.2 13,1.8 Q13.3,2.4 12.8,2.8 Q11.6,3.9 11,5.3 T10.3,8.4 Q10.3,10.5 11.4,12.2 T14.1,15 T17.9,16 Q19.6,16 21.1,15.2 Q21.7,15 22.1,15.5 Q22.3,15.6 22.4,15.9 T22.3,16.5 L22.3,16.5 z"></path>
        };


    return React.createClass({
        render: function () {
            return (
                <SvgIcon {...this.props}>
                    {icons[this.props.icon]}
                </SvgIcon>
            );
        }
    });

}();
