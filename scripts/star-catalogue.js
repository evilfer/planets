var fs = require('fs'),

    obliq = Math.PI / 180 * (23 + 26/60 + 21.448 / 3600),

    eq2ecl = function (ra, dec) {
        var x1 = Math.cos(ra) * Math.cos(dec),
            y1 = Math.sin(ra) * Math.cos(dec),
            z1 = Math.sin(dec),


            x2 = x1,
            y2 = Math.cos(obliq) * y1 - Math.sin(obliq) * z1,
            z2 = Math.cos(obliq) * z1 - Math.sin(obliq) * y1,

            dec2 = Math.asin(z2),
            ra2 = Math.atan2(y2 / Math.cos(dec2), x2 / Math.cos(dec2));

        return [ra2.toPrecision(4), dec2.toPrecision(4)];

    },

    data = fs.readFileSync('./data/bsc5.dat').toString(),
    lines = data.split('\n'),
    stars = lines.filter(function (line) {
        return parseFloat(line.substr(102, 5).trim()) <= 6;
    }).map(function (line) {
        /*
        76- 77  I2     h       RAh      ?Hours RA, equinox J2000, epoch 2000.0 (1)
        78- 79  I2     min     RAm      ?Minutes RA, equinox J2000, epoch 2000.0 (1)
        80- 83  F4.1   s       RAs      ?Seconds RA, equinox J2000, epoch 2000.0 (1)
        84  A1     ---     DE-      ?Sign Dec, equinox J2000, epoch 2000.0 (1)
        85- 86  I2     deg     DEd      ?Degrees Dec, equinox J2000, epoch 2000.0 (1)
        87- 88  I2     arcmin  DEm      ?Minutes Dec, equinox J2000, epoch 2000.0 (1)
        89- 90  I2     arcsec  DEs      ?Seconds Dec, equinox J2000, epoch 2000.0 (1)
        */

        var ra = Math.PI / 180 * 15 * (parseInt(line.substr(75, 2)) +
                parseInt(line.substr(77, 2)) / 60 +
                parseFloat(line.substr(79,4)) / 3600),
            dec = Math.PI / 180 * (parseInt(line.substr(83, 3)) +
                parseInt(line.substr(86, 2)) / 60 +
                parseInt(line.substr(88,2)) / 3600),
            mag = parseFloat(line.substr(102, 5).trim()).toPrecision(2),

            coordenates = eq2ecl(ra, dec),

            result = [mag, coordenates[0], coordenates[1]];
            result = [mag, ra, dec];

        return result;
    });

fs.writeFileSync('./data/stars.json', JSON.stringify(stars));

console.log(stars.reduce(function (pc, cv) {
    return Math.min(pc, cv[0]);
}, 1000));
console.log(stars.reduce(function (pc, cv) {
    return Math.max(pc, cv[0]);
}, -1000));

console.log(stars.length);
