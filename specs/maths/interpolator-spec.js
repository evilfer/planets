var hlp = require('../r'),
    expect = hlp.expect,
    interpolator = hlp.req('maths/interpolator');

describe('interpolator', function () {

    beforeEach(function () {
        this.data = {
            t0: 100,
            gap: 10,
            points: [
                {r: [0, 0, 0], v: [1, 1, 1]},
                {r: [1, 1, 1], v: [0, 0, 0]},
                {r: [3, 3, 3], v: [1, 2, 3]}
            ]
        };
    });

    it('should reject time before start', function () {
        expect(interpolator.at(90, this.data)).to.eql(false);
    });

    it('should reject time after end', function () {
        expect(interpolator.at(200, this.data)).to.eql(false);
    });

    it('should interpolate', function () {
        expect(interpolator.at(100, this.data)).to.eql({r: [0, 0, 0], v: [1, 1, 1]});
        expect(interpolator.at(102, this.data)).to.eql({r: [0.2, 0.2, 0.2], v: [0.8, 0.8, 0.8]});
        expect(interpolator.at(110, this.data)).to.eql({r: [1, 1, 1], v: [0, 0, 0]});
        expect(interpolator.at(115, this.data)).to.eql({r: [2, 2, 2], v: [0.5, 1, 1.5]});
    });

});
