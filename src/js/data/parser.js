module.exports = function () {
    'use strict';

    var parse = function (txt) {
            var lines = txt.split('\r\n'),
                data = [],
                soe = false;

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];

                if (line === '$$SOE') {
                    soe = true;
                } else if (line === '$$EOE') {
                    break;
                } else if (soe && line.indexOf(' ') === 0) {
                    data.push(parseFloat(line.substring(2, 25).trim()));
                    data.push(parseFloat(line.substring(26, 48).trim()));
                    data.push(parseFloat(line.substring(49, 71).trim()));
                }
            }

            return data;
        };

    return {
        parse: parse
    };

}();
