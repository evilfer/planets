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
        },
        expand = function (data) {
            var expanded = [];

            for (var i = 0; i < data.length; i += 6) {
                expanded.push({
                    r: data.slice(i, i + 3),
                    v: data.slice(i + 3, i + 6)
                });
            }

            return expanded;
        };

    return {
        parse: parse,
        expand: expand
    };

}();
