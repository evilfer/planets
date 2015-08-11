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

        reactMiniRouter = require('react-mini-router'),
        navigate = reactMiniRouter.navigate,

        mui = require('material-ui'),
        Paper = mui.Paper,
        List = mui.List,


        ListItem = mui.ListItem,
        IconButton = mui.IconButton,
        FontIcon = mui.FontIcon,

        SvgIcon = require('../../icons/CustomSvgIcon.jsx'),
        dates = require('../../../../maths/dates'),

        formatAngle = function (angle) {
            var angDeg = angle * 180 / Math.PI,
                v1, v2, u1, u2,
                angStr;

            if (angDeg >= 1) {
                u1 = "\u00B0";
                u2 = "'";
            } else if (angDeg >= 1 / 60) {
                u1 = "'";
                u2 = "''";
                angDeg *= 60;
            } else {
                u1 = "''";
                u2 = false;
                angDeg *= 3600;
            }

            v1 = Math.floor(angDeg);
            angStr = v1 + u1;

            if (u2) {
                v2 = Math.round(60 * (angDeg - v1));
                angStr += ' ' + v2 + u2;
            }

            return angStr;
        },

        headerButtonStyle = {
            paddingLeft: 3,
            paddingRight: 0,
            width: 24
        };

    return React.createClass({
        handleGoToOpposition: function () {
            this.props.setValues({t: this.props.info.data[this.props.selected].opposition});
        },

        handleGoToMaxElongation: function () {
            this.props.setValues({t: this.props.info.data[this.props.selected].maxElongation.t});
        },

        moveSelected: function (delta) {
            var ids = Object.keys(this.props.data.objects).sort(function (a, b) {
                    return a.localeCompare(b);
                }),
                index = ids.indexOf(this.props.selected);

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
        handleHelp: function () {
            navigate('/help');
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
                    items.push(
                        <ListItem key="home" primaryText="You live here"
                                  leftIcon={<FontIcon className="material-icons">home</FontIcon>}/>
                    );
                } else if (objectInfo) {
                    if (objectInfo.angularDiameter) {
                        items.push(
                            <ListItem key="diameter"
                                      primaryText={formatAngle(objectInfo.angularDiameter)}
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

                    if (objectInfo.elongation) {
                        items.push(
                            <ListItem key="elongation"
                                      primaryText={formatAngle(objectInfo.elongation)}
                                      leftIcon={<SvgIcon icon="elongation"/>}/>
                        );
                    }

                    if (objectInfo.opposition) {
                        var icon = <SvgIcon icon="opposition"/>,
                            button = <IconButton mini={true} onClick={this.handleGoToOpposition}
                                                 iconClassName='material-icons'>play_arrow</IconButton>;

                        items.push(
                            <ListItem key="opposition" leftIcon={icon} rightIconButton={button}
                                      primaryText={dates.mjd2date(objectInfo.opposition).toDateString()}/>
                        );
                    }

                    if (objectInfo.maxElongation && objectInfo.maxElongation.t) {
                        var secondary = <span style={{color: '#aaa'}}>
                                      {formatAngle(objectInfo.maxElongation.e)}</span>;

                        icon = <SvgIcon icon="max-elongation"/>;
                        button = <IconButton mini={true} onClick={this.handleGoToMaxElongation}
                                             iconClassName='material-icons'>play_arrow</IconButton>;

                        items.push(
                            <ListItem key="max-elongation" leftIcon={icon} rightIconButton={button}
                                      primaryText={dates.mjd2date(objectInfo.maxElongation.t).toDateString()}
                                      secondaryText={secondary}/>
                        );
                    }
                }

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
                                    <IconButton mini={true} onClick={this.handleHelp}
                                                iconClassName='material-icons' style={headerButtonStyle}>
                                        help_outline
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
