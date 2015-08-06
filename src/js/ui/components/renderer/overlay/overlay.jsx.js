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
        Paper = mui.Paper,
        List = mui.List,


        ListItem = mui.ListItem,
        IconButton = mui.IconButton,

        SvgIcon = require('../../icons/CustomSvgIcon.jsx'),
        dates = require('../../../../maths/dates');

    return React.createClass({
        goToInfoTime: function (key) {
            if (this.props.selected && this.props.info.data[this.props.selected] && this.props.info.data[this.props.selected][key]) {
                this.props.setValues({t: this.props.info.data[this.props.selected][key]});
            }
        },

        handleGoToOpposition: function () {
            this.goToInfoTime('opposition');
        },

        handleGoToMaxElongation: function () {
            this.goToInfoTime('maxElongation');
        },

        moveSelected: function (delta) {
            var ids = Object.keys(this.props.data.objects).sort(function (a, b) {
                    return a.localeCompare(b);
                }),
                index = ids.indexOf(this.props.selected);

            console.log(ids);

            if (index >= 0) {
                this.props.setSelected(ids[(index + delta + ids.length) % ids.length]);
            }
        },
        handlePrevious: function () {
            this.moveSelected(-1);
        },
        handleNext: function () {
            this.moveSelected(1);
        },
        handleClose: function () {
            this.props.setSelected(false);
        },


        render: function () {
            var txEphemerides = this.props.txEphemerides,
                window = this.props.window,
                element = false,
                id = this.props.selected;

            if (id !== false) {
                var obj = this.props.data.objects[id],
                    projected = txEphemerides[id].projected,
                    info = this.props.info,
                    objectInfo = info.data[id],
                    style = {
                        top: .5 * window.height * (1 - projected.y),
                        left: .5 * window.width * (1 + projected.x)
                    },
                    items = [];

                if (info.isObserver(id)) {
                    items.push(<ListItem primaryText="You live here"/>);
                } else if (objectInfo) {
                    if (objectInfo.opposition) {
                        var icon = <SvgIcon icon="opposition"/>,
                            button = <IconButton mini={true} onClick={this.handleGoToOpposition}
                                                 iconClassName='material-icons'>play_arrow</IconButton>;

                        items.push(
                            <ListItem key="opposition" leftIcon={icon} rightIconButton={button}
                                      primaryText={dates.mjd2date(objectInfo.opposition).toDateString()}/>
                        );
                    }

                    if (objectInfo.maxElongation) {
                        icon = <SvgIcon icon="max-elongation"/>;
                        button = <IconButton mini={true} onClick={this.handleGoToMaxElongation}
                                             iconClassName='material-icons'>play_arrow</IconButton>;

                        items.push(
                            <ListItem key="max-elongation" leftIcon={icon} rightIconButton={button}
                                      primaryText={dates.mjd2date(objectInfo.maxElongation).toDateString()}/>
                        );
                    }

                    if (objectInfo.angularDiameter) {
                        var angDim = objectInfo.angularDiameter * 180 / Math.PI,
                            v1, v2, u1, u2,
                            angDimStr;

                        if (angDim >= 1) {
                            u1 = "°";
                            u2 = "'";
                        } else if (angDim >= 1 / 60) {
                            u1 = "'";
                            u2 = "''";
                            angDim *= 60;
                        } else {
                            u1 = "''";
                            u2 = false;
                            angDim *= 3600;
                        }

                        v1 = Math.floor(angDim);
                        angDimStr = v1 + u1;

                        if (u2) {
                            v2 = Math.round(60 * (angDim - v1));
                            angDimStr += ' ' + v2 + u2;
                        }

                        items.push(
                            <ListItem key="diameter"
                                      primaryText={angDimStr}
                                      leftIcon={<SvgIcon icon="diameter"/>}/>
                        );

                        if (!info.isReference(id)) {
                            var rel = info.relDiameter(id),
                                relStr = rel >= .5 ? Math.round(100 + rel) + '%' :
                                '1/' + Math.round(1 / rel);


                            items.push(
                                <ListItem key="rel-diameter"
                                          primaryText={relStr}
                                          leftIcon={<SvgIcon icon="moon"/>}/>
                            );
                        }

                    }
                }

                var headerButtonStyle = {
                    paddingLeft: 0,
                    paddingRight: 0,
                    width: 'auto'
                };

                element = (
                    <div className="body-info-anchor" style={style}>
                        <div className="body-info">
                            <Paper>
                                <div style={{float: 'right', paddingRight: 15}}>
                                    <IconButton mini={true} onClick={this.handlePrevious}
                                                iconClassName='material-icons' style={headerButtonStyle}>
                                        chevron_left
                                    </IconButton>
                                    <IconButton mini={true} onClick={this.handleNext}
                                                iconClassName='material-icons' style={headerButtonStyle}>
                                        chevron_right
                                    </IconButton>
                                    <IconButton mini={true} onClick={this.handleClose}
                                                iconClassName='material-icons' style={headerButtonStyle}>
                                        close
                                    </IconButton>
                                </div>
                                <Paper style={{padding: 15, color: '#eee'}}>
                                    {obj.ui.label}
                                </Paper>
                                <List>
                                    {items}
                                </List>
                            </Paper>
                        </div>
                    </div>
                );
            }

            return <div className="overlay-3d">{element}</div>;
        }
    });
}();
