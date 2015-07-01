module.exports = function () {
    'use strict';

    var date2mjd = function (date) {
        var a = date.month < 3 ? 1 : 0,
            y = date.year + 4800 - a,
            m = date.month + 12 * a - 3,
            jdn = date.day + Math.floor((153 * m + 2) / 5)
                + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400)
                - 32045,
            jd = jdn + (date.hour - 12) / 24 + date.minute / 1440 + date.second / 86400,
            mjd = jd - 2400000.5;

        return mjd;
    };

    return {
        date2mjd: date2mjd
    }

}();
