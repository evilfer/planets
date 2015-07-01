module.exports = function () {
    'use strict';

    var date2mjd = function (date) {
            var a = date.month < 3 ? 1 : 0,
                y = date.year + 4800 - a,
                m = date.month + 12 * a - 3,
                jdn = date.day + Math.floor((153 * m + 2) / 5)
                    + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400)
                    - 32045,
                jd = jdn + (date.hour - 12) / 24 + date.minute / 1440 + date.second / 86400;

            return jd - 2400000.5;
        },

        mjd2date = function (mjd) {
            var jd = mjd + 2400000.5,
                j = Math.round(jd),
                hms = (jd - j) * 86400,
                ms = 43200 + hms,

                f = j + 1401 + Math.floor(3 * Math.floor((4 * j + 274277) / 146097) / 4) - 38,
                e = 4 * f + 3,
                g = Math.floor((e % 1461) / 4),
                h = 5 * g + 2,

                month = (Math.floor(h / 153) + 2) % 12 + 1;

            return {
                year: Math.floor(e / 1461) - 4716 + Math.floor((14 - month) / 12),
                month: month,
                day: Math.floor((h % 153) / 5) + 1,
                hour: 12 + Math.floor(hms / 3600),
                minute: Math.floor(ms / 60) % 60,
                second: ms % 60
            };

        };

    return {
        date2mjd: date2mjd,
        mjd2date: mjd2date
    };

}();
