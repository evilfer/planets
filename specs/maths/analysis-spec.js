var hlp = require('../r'),
    expect = hlp.expect,
    ephemerides = hlp.req('maths/ephemerides'),
    analysis = hlp.req('maths/analysis');

describe('analysis', function () {
    var t, eph;

    beforeEach(function () {
        t = 57233;
        eph = ephemerides.init();
        ephemerides.state(t, eph);
    });

    it('should compute distance', function () {
        var rd = 3.855522390555567E+08,
            d = Math.abs(analysis.distance('3', '4', eph) - rd) / rd;

        expect(d < 1e-4).to.be.true;
    });

    it('should calculate oposition', function () {
        expect(Math.abs(analysis.opposition('3', '7', t) - 57306.53125) < .75).to.be.true;
        expect(Math.abs(analysis.opposition('3', '8', t) - 57266.04861) < .75).to.be.true;
    });
});


