var hlp = require('../r'),
    expect = hlp.expect,
    dates = hlp.req('maths/dates');

describe('dates', function () {
    var a = {
            date: {year: 1995, month: 9, day: 27, hour: 0, minute: 0, second: 0},
            mjd: 49987
        },
        b = {
            date: {year: 2004, month: 10, day: 10, hour: 12, minute: 0, second: 0},
            mjd: 53288.5
        },
        c = {
            date: {year: 2015, month: 7, day: 1, hour: 23, minute: 10, second: 7},
            mjd: 57204.96535880
        },
        d = {
            date: {year: 1995, month: 4, day: 3, hour: 4, minute: 59, second: 55},
            mjd: 49810.20827546
        },

        almostMjd = function (a, b) {
            return Math.abs(a - b) < 1e-7;
        },

        almostDate = function (a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    if (Math.abs(a[key] - b[key]) > Math.abs(b[key] * 1e-4)) {
                        return key + ' ' + b[key] + ' | ' + a[key];
                    }
                }
            }

            return false;
        };

    it('should convert to mjd', function () {
        expect(dates.date2mjd(a.date)).to.equal(a.mjd);
        expect(dates.date2mjd(b.date)).to.equal(b.mjd);
        expect(almostMjd(dates.date2mjd(c.date), c.mjd)).to.be.true;
        expect(almostMjd(dates.date2mjd(d.date), d.mjd)).to.be.true;
    });

    it('should convert to date', function () {
        expect(dates.mjd2date(a.mjd)).to.eql(a.date);
        expect(dates.mjd2date(b.mjd)).to.eql(b.date);
        expect(almostDate(dates.mjd2date(c.mjd), c.date)).to.be.false;
        expect(almostDate(dates.mjd2date(d.mjd), d.date)).to.be.false;
    });
});
