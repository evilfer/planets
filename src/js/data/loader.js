module.exports = function () {
    'use strict';

    var expand = function (data) {
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
        expand: expand
    };

}();
