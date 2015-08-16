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

    var React = require('react');

    return React.createClass({
        render: function () {
            var path = this.props.path,
                parts = path.split('/');

            if (parts.length > 2) {
                var pages = this.props.pages,
                    elements = [];

                for (var i = 1, p = ''; i < parts.length; i++) {
                    if (i > 1) {
                        elements.push(<span key={'s' + i} className="sep">&gt;</span>);
                    }
                    p += '/' + parts[i];

                    if (i < parts.length - 1) {
                        elements.push(<a key={'l'+i} href={p}>{pages[p].title}</a>);
                    } else {
                        elements.push(<span className="current-page" key={'p'+i}>{pages[p].title}</span>);
                    }
                }

                return <p className="breadcrumbs">{elements}</p>;
            } else {
                return false;
            }
        }
    });

}();
