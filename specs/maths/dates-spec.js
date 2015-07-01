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
        };

    it('should convert to mjd', function () {
        expect(dates.date2mjd(a.date)).to.equal(a.mjd);
        expect(dates.date2mjd(b.date)).to.equal(b.mjd);
    });

    it('should convert to date', function () {
        expect(dates.date2mjd(a.mjd)).to.equal(a.date);
        expect(dates.date2mjd(b.mjd)).to.equal(b.date);
    });
});
