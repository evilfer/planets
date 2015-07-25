var hlp = require('../r'),
    expect = hlp.expect,
    dates = hlp.req('maths/dates');

describe('dates', function () {
    var a = {
            date: new Date(1995, 8, 27, 0, 0, 0),
            mjd: 49987
        },
        b = {
            date: new Date(2004, 9, 10, 12, 0, 0),
            mjd: 53288.5
        },
        c = {
            date: new Date(2015, 6, 1, 23, 10, 7),
            mjd: 57204.96535880
        },
        d = {
            date: new Date(1995, 3,  3,  4,  59,  55),
            mjd: 49810.20827546
        },

        almostMjd = function (a, b) {
            return Math.abs(a - b) < b * 1e-6;
        },

        almostDate = function (a, b) {
            return Math.abs(a.getTime() - b.getTime()) > Math.abs(b.getTime() * 1e-4);
        };

    it('should convert to mjd', function () {
        expect(almostMjd(dates.date2mjd(a.date), a.mjd)).to.be.true;
        expect(almostMjd(dates.date2mjd(b.date), b.mjd)).to.be.true;
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
