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

    var React = require('react'),

        mui = require('material-ui'),
        Dialog = mui.Dialog,
        TextField = mui.TextField;


    return React.createClass({
        getInitialState: function () {
            return {
                value: "" + this.props.value
            };
        },

        floatValue: function () {
            return parseFloat(this.state.value) || 0;
        },

        valid: function () {
            var fvalue = this.floatValue();
            return fvalue >= -90 && fvalue <= 90;
        },

        handleChange: function (a) {
            var txt = a.target.value;
            if (txt.match(/^-?\d*(\.\d+)?$/)) {
                this.setState({value: a.target.value});
            }
        },

        handleOk: function () {
            if (this.valid()) {
                this.props.setValues({lat: this.floatValue()});
                this.refs.dlg.dismiss();
            }
        },

        show: function () {
            this.setState({value: "" + this.props.value});
            this.refs.dlg.show();
        },

        onShow: function () {
            this.refs.lat.focus();
        },

        render: function () {
            var actions = [
                    {text: 'Cancel'},
                    {text: 'Ok', onClick: this.handleOk}
                ],
                error = this.valid() ? false : 'Latitude must be between -90 and 90';

            return (
                <Dialog ref="dlg"
                        title="Set latitude"
                        actions={actions}
                        modal={true}
                        onShow={this.onShow}>

                    <p>Select your latitude. It will be used to calculate the duration
                        of days and nights, and the visibility of planets and the Moon.</p>

                    <p>Valid latitudes are between -90 and 90. Positive values are for
                        the Northern hemisphere, negative for Southern latitudes.</p>

                    <TextField ref="lat" value={this.state.value}
                               onChange={this.handleChange}
                               onEnterKeyDown={this.handleOk}
                               errorText={error}
                               floatingLabelText="Latitude"/>
                </Dialog>
            );
        }
    });

}();
