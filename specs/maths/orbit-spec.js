var expect = require('chai').expect,
    r = require('../r'),

    orbit = r('maths/orbit');

describe('orbit', function () {

    it('should calculate orbit', function () {
        var orbitParam = {
                h: 82000,                   // [km^2/s] Specific angular momentum
                i: 50 * Math.PI / 180,      // [rad] Inclination
                lan: 60 * Math.PI / 180,    // [rad] Longitude of the ascending node
                e: 0.2,                     // Eccentricity
                arpe: 90 * Math.PI / 180,   // [rad] Argument of perigee
                ta: 35 * Math.PI / 180      // [rad] True anomaly
            },

            state = {
                r: [-10766.25, -3383.89, 9095.35],  // [km],
                v: [-0.9250, -5.1864, -2.1358]      // [km/s]
            },

            mu = 398600,  // Earth’s gravitational parameter [km^3/s^2]

            calculated = orbit.params(mu, state);

        expect(calculated).to.eql(orbitParam);
    });


});
