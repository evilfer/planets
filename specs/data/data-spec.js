var fs = require('fs'),

    hlp = require('../r'),
    expect = hlp.expect,
    parser = hlp.req('data/parser'),
    loader = hlp.req('data/loader');

describe('data implementation', function () {

    beforeEach(function (done) {
        var me = this;

        fs.readFile('./specs/data/fixture.txt', function (err, data) {
            if (err) {
                throw err;
            }
            me.data = data.toString();
            done();
        });
    });

    describe('parser', function () {

        it('should parse horizons response', function () {
            var expected = [
                    -1.038023121257381E+07, 2.355322700317043E+08, 5.179088944083527E+06,
                    -2.327911383722389E+01, 9.482408617874410E-01, 5.909973017279033E-01,
                    -1.239111104183550E+07, 2.356053073544306E+08, 5.229954114702433E+06,
                    -2.326874141877495E+01, 7.425035394533432E-01, 5.864314865192445E-01,
                    -1.440101992231130E+07, 2.356605861641689E+08, 5.280423323822185E+06,
                    -2.325663957709178E+01, 5.371662417607387E-01, 5.818316041639465E-01
                ],
                points = parser.parse(this.data);

            expect(points).to.eql(expected);
        });
    });

    describe('loader', function () {
        it('should expand data', function () {
            var points = parser.parse(this.data),
                expanded = loader.expand(points);

            expect(expanded.length).to.equal(3);

            expect(expanded[1]).to.eql({
                r: [-1.239111104183550E+07, 2.356053073544306E+08, 5.229954114702433E+06],
                v: [-2.326874141877495E+01, 7.425035394533432E-01, 5.864314865192445E-01]
            });
        });
    });
});
