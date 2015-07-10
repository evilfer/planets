var hlp = require('../r'),
    expect = hlp.expect,
    orbit = hlp.req('maths/orbit'),
    vector = hlp.req('maths/vector');

describe('orbit', function () {

    beforeEach(function () {
        this.state = {
            r: [-10766.25, -3383.89, 9095.35],  // [km],
            v: [-0.9250, -5.1864, -2.1358]      // [km/s]
        };

        this.mu = 398600;  // Earth’s gravitational parameter [km^3/s^2]

        this.calculated = orbit.params(this.mu, this.state);
    });

    it('should calculate orbit', function () {
        var orbitParams = {
                h: 82000,                   // [km^2/s] Specific angular momentum
                i: 50 * Math.PI / 180,      // [rad] Inclination
                lan: 60 * Math.PI / 180,    // [rad] Longitude of the ascending node
                e: 0.2,                     // Eccentricity
                arpe: 90 * Math.PI / 180,   // [rad] Argument of perigee
                ta: 35 * Math.PI / 180      // [rad] True anomaly
            };



        for (var key in orbitParams) {
            if (orbitParams.hasOwnProperty(key)) {
                var op = orbitParams[key],
                    tolerance = Math.abs(.001 * op),
                    cv = this.calculated[key];

                expect(Math.abs(cv - op) < tolerance).to.be.true;
            }
        }
    });

    it('should match r', function () {
        var pos = orbit.pos(this.calculated, this.calculated.ta, false);
        expect(vector.mod([pos.x, pos.y, 0])).to.equal(vector.mod(this.state.r));
    });


});
