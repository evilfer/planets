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


    var React = require('react');

    return {
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
        'elongation': <path fill="#757575"
                            d="M13,4.2V3C13,2.4 12.6,2 12,2V4.2C9.8,4.6 9,5.7 9,7C9,7.8 9.3,8.5 9.8,9L4,19.9V22L6.2,20L11.6,10C11.7,10 11.9,10 12,10C13.7,10 15,8.7 15,7C15,5.7 14.2,4.6 13,4.2M12.9,7.5C12.7,7.8 12.4,8 12,8C11.4,8 11,7.6 11,7C11,6.8 11.1,6.7 11.1,6.5C11.3,6.2 11.6,6 12,6C12.6,6 13,6.4 13,7C13,7.2 12.9,7.3 12.9,7.5M20,19.9V22H20L17.8,20L13.4,11.8C14.1,11.6 14.7,11.3 15.2,10.9L20,19.9Z"/>,
        'height': <path fill="#757575" d="M8 7h3v10h2V7h3l-4-4-4 4zM4 19v2h16V19H4z"/>,
        'moon': <path fill="#757575" fillOpacity="1" strokeOpacity="1" stroke="null"
                      d="M19.5,17.6 Q18.7,17.8 17.9,17.8 Q15.4,17.8 13.2,16.5 T9.8,13.1 T8.6,8.4 Q8.6,5.7 10,3.4 Q7.2,4.2 5.4,6.6 T3.6,12 Q3.7,13.8 4.4,15.4 T6.3,18.3 T9.1,20.2 T12.6,20.9 Q14.6,20.9 16.4,20 T19.5,17.6 L19.5,17.6 zM22.3,16.5 Q21,19.3 18.3,21 T12.6,22.7 Q10.4,22.7 8.4,21.8 T5,19.5 T2.7,16.1 T1.8,12 Q1.9,9.8 2.7,7.9 T4.8,4.5 T8.1,2.2 T12.2,1.3 Q12.8,1.2 13,1.8 Q13.3,2.4 12.8,2.8 Q11.6,3.9 11,5.3 T10.3,8.4 Q10.3,10.5 11.4,12.2 T14.1,15 T17.9,16 Q19.6,16 21.1,15.2 Q21.7,15 22.1,15.5 Q22.3,15.6 22.4,15.9 T22.3,16.5 L22.3,16.5 z"></path>,
        'today': <path
            d="M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"/>,
        'facebook': <path
            d="M19,4V7H17A1,1 0 0,0 16,8V10H19V13H16V20H13V13H11V10H13V7.5C13,5.56 14.57,4 16.5,4M20,2H4A2,2 0 0,0 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z"/>,
        'google': <path
            d="M19,12H17V14H16V12H14V11H16V9H17V11H19M9.07,19.2C6.27,19.2 5,17.64 5,16.18C5,15.73 5.14,14.59 6.5,13.8C7.25,13.33 8.33,13 9.62,12.89C9.43,12.64 9.28,12.34 9.28,11.9C9.28,11.75 9.3,11.59 9.34,11.44H8.95C7,11.44 5.8,9.89 5.8,8.39C5.8,6.66 7.09,4.8 9.91,4.8H14.13L13.79,5.14L13.08,5.85L13,5.91H12.3C12.71,6.33 13.2,7 13.2,8.07C13.2,9.47 12.46,10.16 11.64,10.8C11.5,10.92 11.22,11.18 11.22,11.5C11.22,11.82 11.46,12 11.61,12.14C11.74,12.25 11.9,12.36 12.08,12.5C12.89,13.05 14,13.83 14,15.36C14,17.13 12.71,19.2 9.07,19.2M20,2H4A2,2 0 0,0 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2M10.57,13.81C10.46,13.8 10.38,13.8 10.25,13.8H10.23C9.97,13.8 9.08,13.85 8.41,14.07C7.77,14.31 7,14.79 7,15.77C7,16.85 8.04,18 9.96,18C11.5,18 12.4,17 12.4,16C12.4,15.25 11.94,14.79 10.57,13.81M11.2,8.87C11.2,7.85 10.57,5.85 9.12,5.85C8.5,5.85 7.8,6.29 7.8,7.5C7.8,8.7 8.42,10.45 9.77,10.45C9.83,10.45 11.2,10.44 11.2,8.87Z"/>,
        'twitter': <path
            d="M17.71,9.33C17.64,13.95 14.69,17.11 10.28,17.31C8.46,17.39 7.15,16.81 6,16.08C7.34,16.29 9,15.76 9.9,15C8.58,14.86 7.81,14.19 7.44,13.12C7.82,13.18 8.22,13.16 8.58,13.09C7.39,12.69 6.54,11.95 6.5,10.41C6.83,10.57 7.18,10.71 7.64,10.74C6.75,10.23 6.1,8.38 6.85,7.16C8.17,8.61 9.76,9.79 12.37,9.95C11.71,7.15 15.42,5.63 16.97,7.5C17.63,7.38 18.16,7.14 18.68,6.86C18.47,7.5 18.06,7.97 17.56,8.33C18.1,8.26 18.59,8.13 19,7.92C18.75,8.45 18.19,8.93 17.71,9.33M20,2H4A2,2 0 0,0 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z"/>,
        'pininterest': <path
            d="M13,16.2C12.2,16.2 11.43,15.86 10.88,15.28L9.93,18.5L9.86,18.69L9.83,18.67C9.64,19 9.29,19.2 8.9,19.2C8.29,19.2 7.8,18.71 7.8,18.1C7.8,18.05 7.81,18 7.81,17.95H7.8L7.85,17.77L9.7,12.21C9.7,12.21 9.5,11.59 9.5,10.73C9.5,9 10.42,8.5 11.16,8.5C11.91,8.5 12.58,8.76 12.58,9.81C12.58,11.15 11.69,11.84 11.69,12.81C11.69,13.55 12.29,14.16 13.03,14.16C15.37,14.16 16.2,12.4 16.2,10.75C16.2,8.57 14.32,6.8 12,6.8C9.68,6.8 7.8,8.57 7.8,10.75C7.8,11.42 8,12.09 8.34,12.68C8.43,12.84 8.5,13 8.5,13.2A1,1 0 0,1 7.5,14.2C7.13,14.2 6.79,14 6.62,13.7C6.08,12.81 5.8,11.79 5.8,10.75C5.8,7.47 8.58,4.8 12,4.8C15.42,4.8 18.2,7.47 18.2,10.75C18.2,13.37 16.57,16.2 13,16.2M20,2H4C2.89,2 2,2.89 2,4V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V4C22,2.89 21.1,2 20,2Z"/>
    };
}();
